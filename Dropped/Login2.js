import React, {useState, useContext, useRef} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContextProvider'
import { useEvalid, usePvalid } from '../CustomHooks/useValidation'
import Input from './Input'
import Button from './Button'

const Login = () => {
    const { updateEmail, updateToken } = useContext(AuthContext)
    const [ logfail, setLogfail ] = useState(false)
    let emailRef = useRef('')
    let passRef = useRef('')
    const history = useHistory()

    const onSubmit = (e) =>{
        e.preventDefault();        
        let email = emailRef.current.value
        let password = passRef.current.value

        axios.post("/user/login",{ email ,password })
        .then((res)=>{
            updateToken(res.data) 
            updateEmail(email)
            history.push("/todolist")
        }).catch((err)=>{
            setLogfail(true)
        })    
        
    }

    return(
        <>
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
                <Input label="Email" ref={emailRef} name="email" type={useEvalid} />
                <Input label="Password" ref={passRef} name="password" type={usePvalid} />

                <Button color="btn btn-outline-primary" name="Submit" fn={onSubmit} />
                </div>
            </div>
        </div>
        </>
    )
}

export default Login