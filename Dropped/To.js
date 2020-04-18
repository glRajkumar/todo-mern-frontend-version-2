import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {Primary, Delete} from '../Components/Button'
import ToDoInput from '../Components/ToDoInput'
import { AuthContext } from '../Contexts/AuthContextProvider'
import { General } from './customAxios'

function To(){
    const { token } = useContext(AuthContext)
    const [todos, setToDo] = useState([])
    const [id, setId] = useState('')
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const history = useHistory()
    console.log(token)
    const headers = {
        Authorization: "Bearer " + token
    }
    console.log(headers)
      
    useEffect(()=>{
        if(!id){
            getTodos()
         }
    }, [])
    
    const getTodos = async () =>{
            let res = await General("get", "/todo", {}, headers)
            console.log(res)
            setToDo(res)
    }
    
    const onEdit = (ti,tt, td) =>{
       setId(ti)
       setTitle(tt)
       setDescription(td)
    }

    const onDone = async (value) =>{
        let res = await General("put", "/tdo/rchive", {id: value}, headers)
        console.log(res)
        if(res){
            getTodos()
            console.log("i am false")    
        }
    }

    const onDelete = async (value) =>{
        // {data:{id: value}
        let res = await General("delete", "/todo", {id: value}, headers)
        console.log(res)
        getTodos()
        console.log("i am false")
    }

    const onSubmit = async () => {
        let res = await General("put", "/todo", {id, title, description}, headers)
        console.log(res)
        onEdit('','','')
    }

    const sig = async() =>{
        let res = await General("post", "/user/register",{ name : "tytyty", email : "tytyty@gmailm.ki", password : "tytytytytytyt" }, {})
        console.log(res)    
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h4 className="mt-2 mb-2">Todos
                    <Primary name="Create Todos" fn={()=>{ history.push("/createtodo")}} />
                    <Primary name="Archived Todos" fn={()=>{ history.push('/archived')}} />
                    </h4>
                </div>
            </div>

            <button onClick={sig}>Sigh</button>

            { id &&         
                <ToDoInput
                    Head="Edit ToDo"
                    title={title}
                    description={description}
                    titlefn={(e) =>{ setTitle(e.target.value) }}
                    desfn={(e) =>{ setDescription(e.target.value) }}
                    onSubmit={onSubmit}
                />
            }
            
            {!id && 
            <div className="row">
                <div className="col-md-4 offset-md-4">
                { todos.map((todo)=>(
                    <div key={todo._id} className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">{todo.title}</h5>
                            <p className="card-text">{todo.description}</p>
                            <Primary name="Edit" fn={()=>{onEdit(todo._id, todo.title, todo.description)}} />
                            <Primary name="Done" fn={()=>{onDone(todo._id)}} />
                            <Delete fn={()=>{onDelete(todo._id)}} />
                        </div>
                    </div>
                    ))
                }
                </div>
            </div>
            }
        </div>
    )          
}

export default To