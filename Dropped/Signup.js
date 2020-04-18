import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import useInput from '../CustomHooks/useInput'
import { useNvalid, useEvalid, usePvalid } from '../CustomHooks/useValidation'

const Signup = () =>{
    const [name, onNameChange, nmsg, nameErr] = useInput('', useNvalid)
    const [email, onEmailChange, emsg, emailErr] = useInput('', useEvalid)
    const [password, onPassChange, pmsg, passErr] = useInput('', usePvalid)  
    const [ logfail, setLogfail ] = useState(false)
    const history = useHistory()

    const onSubmit = (event) =>{
        event.preventDefault();
        
        if(nmsg === '' && emsg === '' && pmsg === ''){
            axios.post("/user/register",{ name, email, password })
            .then((res)=>{
                history.push("/login")
            }).catch((err)=>{
                setLogfail(true)
                console.log(err)
            })    
        }
    }

    return(
        <div>
        <div className="row">
            <div className="col-md-4 offset-md-4 ">
                <h4 className="text-center">Sign Up</h4>
            </div>
        </div>
        <div className="row">
            { logfail &&
                <div className="col-md-4 offset-md-4 ">
                    <div className="alert alert-danger" role="alert">
                    Invalid Signup credentials
                    </div>
                </div>
            }   
        </div>
        <div className="row">            
            <div className="col-md-4 offset-md-4 col-sm-12">
              <div>
                <div className="form-group">
                    <label>Name </label>
                    <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={onNameChange}
                    />
                </div>
                { 
                nameErr && <div className="alert alert-danger" role="alert"> {nmsg} </div>                        
                }

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

export default Signup