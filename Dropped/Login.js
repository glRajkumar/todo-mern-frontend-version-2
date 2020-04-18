import React, {useState, useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContextProvider'
import useInput from '../CustomHooks/useInput'
import { useEvalid, usePvalid } from '../CustomHooks/useValidation'

const Login = () => {
    const { updateEmail, updateToken } = useContext(AuthContext)
    const [ logfail, setLogfail ] = useState(false)
    const [email, onEmailChange, emsg, emailErr] = useInput('', useEvalid)
    const [password, onPassChange, pmsg, passErr] = useInput('', usePvalid)  
    const history = useHistory()

    const onSubmit = (e) =>{
        e.preventDefault();        
        if(emsg === '' && pmsg === ''){
            axios.post("/user/login",{ email ,password })
            .then((res)=>{
                updateToken(res.data) 
                updateEmail(email)
                history.push("/todolist")
            }).catch((err)=>{
                setLogfail(true)
            })    
        }
    }

    return(
        <div>
        <div className="row">
            <div className="col-md-4 offset-md-4 ">
                <h4 className="text-center">Log in</h4>
            </div>
        </div>
        <div className="row">
            { logfail &&
                <div className="col-md-4 offset-md-4 ">
                    <div className="alert alert-danger" role="alert">
                    Invalid login credentials
                    </div>
                </div>
            }   
        </div>
        <div className="row">            
            <div className="col-md-4 offset-md-4 col-sm-12">
              <div>

              <div className="form-group">
                    <label>Email </label>
                    <input
                    className="form-control"
                    type="text"
                    value={email}
                    onChange={onEmailChange}
                    />
                </div>
                { 
                emailErr && <div className="alert alert-danger" role="alert"> {emsg} </div>                        
                }

                <div className="form-group">
                    <label>Password </label>
                    <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={onPassChange}
                    />
                </div>
                { 
                passErr && <div className="alert alert-danger" role="alert"> {pmsg} </div>                        
                }

                <button className="btn btn-outline-primary" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login