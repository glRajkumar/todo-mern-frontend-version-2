import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { Primary, Delete} from './Button'
import { AuthContext } from '../Contexts/AuthContextProvider'

function Archived(){
    const { token } = useContext(AuthContext)    
    const [todos, setToDo] = useState([])
    const history = useHistory()
    const headers = {
        Authorization: "Bearer " + token
    }

    useEffect(()=>{
        getArchTodos()
    }, [])

    const getArchTodos = async() =>{
        try {
            let res = await axios.get("/todo/finished",{headers})
            let data = await res.data
            setToDo(data)                
        } catch (error) {
            console.log(error)
        }
    }

    const onDelete = async(value) =>{
        try {
            let res = await axios.delete("/todo",{data:{id: value},headers})
            console.log(res)
            getArchTodos()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
    <div className="row">
        <Primary name="Back to Todos" fn={()=>{history.push('/todolist')}} />
    </div>
    <div className="row">
        <div className="col-md-4 offset-md-4">
            { todos.map((todo)=>(
                <div key={todo._id} className="card mb-2">
                    <div className="card-body">
                        <h5 className="card-title">{todo.title}</h5>
                        <p className="card-text">{todo.description}</p>
                        <Delete fn={()=>{onDelete(todo._id)}} />
                    </div>
                </div>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default Archived