import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import FormUi from './FormUi'
import Loading from './Loading'

const Signup = () =>{
    let nameRef = useRef('')
    let emailRef = useRef('')
    let passRef = useRef('')
    const [ logfail, setLogfail ] = useState(false)
    const history = useHistory()
    const [ loading, setLoading ] = useState(false)

    useEffect(()=>{nameRef.current.focus()}, [])

    const onSubmit = async (event) =>{
        event.preventDefault();
        let name = nameRef.current.value
        let email = emailRef.current.value
        let password = passRef.current.value

        try {
            if(name !== '' && email !== "" && password !== ""){
                setLoading(true)
                await axios.post("/user/register",{ name, email, password })
                history.push("/login")
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            setLogfail(true)
        }
    }

    return !loading ? (
        <>
        <FormUi
         title="Sigh Up"
         isNameNeed={true} 
         nameRef={nameRef} 
         emailRef={emailRef} 
         passRef={passRef} 
         logfail={logfail} 
         onSubmit={onSubmit} 
        />
        <div className="row m-2">
            <div className="col-md-4 offset-md-4 ">
                <h5>Already have an account, <Link to="/login">Log In</Link></h5>
            </div>
        </div>
        </>
    ) : (<Loading />)
}

export default Signup