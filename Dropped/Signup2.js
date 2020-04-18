import React, {useState, useRef} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import { useNvalid, useEvalid, usePvalid } from '../CustomHooks/useValidation'

const Signup = () =>{
    let nameRef = useRef('')
    let emailRef = useRef('')
    let passRef = useRef('')
    const [ logfail, setLogfail ] = useState(false)
    const history = useHistory()

    const onSubmit = (event) =>{
        event.preventDefault();
        let name = nameRef.current.value
        let email = emailRef.current.value
        let password = passRef.current.value

        axios.post("/user/register",{ name, email, password })
        .then((res)=>{
            history.push("/login")
        }).catch((err)=>{
            setLogfail(true)
            console.log(err)
        })    
    
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
              <Input label="Name" ref={nameRef} name="name" type={useNvalid} /> 
                <Input label="Email" ref={emailRef} name="email" type={useEvalid} />
                <Input label="Password" ref={passRef} name="password" type={usePvalid} />

                <Button color="btn btn-outline-primary" name="Submit" fn={onSubmit} />
              </div>
            </div>
        </div>
        </div>
    )
}

export default Signup