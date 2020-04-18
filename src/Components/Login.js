import React, {useState, useContext, useRef, useEffect} from 'react'
import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContextProvider'
import FormUi from './FormUi'
import Loading from './Loading'

const Login = () => {
    const { updateEmail, updateToken } = useContext(AuthContext)
    const [ logfail, setLogfail ] = useState(false)
    let emailRef = useRef('')
    let passRef = useRef('')
    const history = useHistory()
    const [ loading, setLoading ] = useState(false)

    useEffect(()=>{emailRef.current.focus()}, [])

    const onSubmit = async (e) =>{
        e.preventDefault();        
        let email = emailRef.current.value
        let password = passRef.current.value

        try {
            if(email !== "" && password !== ""){
                setLoading(true)
                const res = await axios.post("/user/login",{ email, password })
                const data = await res.data
                updateToken(data) 
                updateEmail(email)
                history.push("/todolist")                    
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
         title="Log In" 
         isNameNeed={false} 
         emailRef={emailRef} 
         passRef={passRef} 
         logfail={logfail} 
         onSubmit={onSubmit} 
        />
        <div className="row m-2">
            <div className="col-md-4 offset-md-4 ">
                <h5>New to here, <Link to="/signup">Sigh Up</Link></h5>
            </div>
        </div>
        </>
    ) : (<Loading />)
}

export default Login