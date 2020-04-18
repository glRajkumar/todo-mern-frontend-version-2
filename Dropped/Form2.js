import React, {useState} from 'react'
// import axios from 'axios'
// import {useHistory} from 'react-router-dom'
import { useNvalid, useEvalid, usePvalid } from '../CustomHooks/useValidation'
import Input from './Input'

const Form = (props) =>{
    const [ logfail, setLogfail ] = useState(false)
    // const history = useHistory()

    const onSubmit = (event) =>{
        event.preventDefault();

        try{
            props.functions()
        }catch{
            setLogfail(true)
        }
        
        // axios.post("/user/register",{ name, email, password })
        // .then((res)=>{
        //     history.push("/login")
        // }).catch((err)=>{
        //     setLogfail(true)
        //     console.log(err)
        // })    
    }

    return(
        <>
        <div className="row">
            <div className="col-md-4 offset-md-4 ">
                <h4 className="text-center"> {props.title} </h4>
            </div>
        </div>
        
        <div className="row">
            { logfail &&
                <div className="col-md-4 offset-md-4 ">
                    <div className="alert alert-danger" role="alert">
                    Invalid {props.title} credentials
                    </div>
                </div>
            }   
        </div>
        <div className="row">            
            <div className="col-md-4 offset-md-4 col-sm-12">
              <div>
                { props.isNameNeed && <Input label="Name" name="name" type={useNvalid} /> }
                <Input label="Email" name="email" type={useEvalid} />
                <Input label="Password" name="password" type={usePvalid} />

                <button className="btn btn-outline-primary" onClick={onSubmit}>Submit</button>
              </div>
            </div>
        </div>
        </>
    )
}

export default Form

//it takes lots of work than thought
{/* <Form title="Sign Up" isNameNeed={true} /> */}
