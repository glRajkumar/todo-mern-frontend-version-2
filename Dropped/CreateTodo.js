import React, {useState, useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import ToDoInput from './ToDoInput'
import { AuthContext } from '../Contexts/AuthContextProvider'

function CreateTodo(){
    const { token } = useContext(AuthContext)    
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const history = useHistory()
    const config = {
        headers : {
            Authorization: "Bearer " + token
        }
    } 
    
    const onSubmit = async() => {
        try {
            let res = await axios.post("/todo", { title, description }, config)
            console.log(res)
            history.push("/todolist")
        } catch (error) {
            console.log(error)
        }
    }

    return(
      <ToDoInput
       Head="Create ToDo"
       title={title}
       description={description}
       titlefn={(e) =>{ setTitle(e.target.value) }}
       desfn={(e) =>{ setDescription(e.target.value) }}
       onSubmit={onSubmit}
      />
    )
}

export default CreateTodo