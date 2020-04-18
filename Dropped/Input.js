import React from 'react'
import useInput from '../CustomHooks/useInput'
import { useNvalid, useEvalid, usePvalid } from '../CustomHooks/useValidation'

const Input = (props) =>{
    const getfn = () =>{
        switch(props.type){
            case "Name" : useNvalid
            case "Email" : useEvalid
            case "Password" : usePvalid
        }
    }

    const [ value, onChange, msg, err ] = useInput('', getfn)

    return(
        <>
        <div className="form-group">
            <label> {props.label} </label>
            <input
            className="form-control"
            type="text"
            value={value}
            onChange={onChange}
            />
        </div>
        { 
        err && <div className="alert alert-danger" role="alert"> {msg} </div>                        
        }
    </>
    )
}

export default Input