import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {Primary, Delete} from './Button'
import ToDoInput from './ToDoInput'
import { AuthContext } from '../Contexts/AuthContextProvider'
import Loading from './Loading'

function ToDoList(){
    const [ loading, setLoading ] = useState(true)
    const { headers } = useContext(AuthContext)
    const [todos, setToDo] = useState([])
    const [id, setId] = useState('')
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const history = useHistory()
    let source = axios.CancelToken.source()

    useEffect(()=>{
        const fetch = async() =>{
            try {
                if(!id){
                    getTodos()
                 }
            } catch (error) {
                if(axios.isCancel(error)){
                    console.log("caught cancel request")
                }else{
                    console.log("something else error")
                    console.log(error)
                }
            }    
        }
        fetch()

        return ()=>{
            console.log("unmounting")
            source.cancel()
        }
    }, [id])
    
    useEffect(()=>{
        let mounted = true
        if(mounted) getArchTodos()
   
        return ()=> mounted = false
        
    }, [])

    const getTodos = async () =>{
        try {
            let res = await axios.get("/todo",{headers},{cancelToken: source.token})
            let data = await res.data
            setToDo(data)
            setLoading(false)
        } catch (error) {
            if(axios.isCancel(error)){
                console.log("caught cancel request")
            }else{
                console.log(error)
            }
        }    
}
    
    const onEdit = (ti,tt, td) =>{
       setId(ti)
       setTitle(tt)
       setDescription(td)
    }

    const onDone = async (value) =>{
        try {
            setLoading(true)
            await axios.put("/todo/archive", {id: value},{headers})
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const onDelete = async (value) =>{
        try {
            setLoading(true)
            await axios.delete("/todo",{data:{id: value},headers})
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async () => {
        try {
            await axios.put("/todo", {id, title, description},{headers})
            onEdit('','','')
        } catch (error) {
            console.log(error)
        }
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

            { !id && 
            <>
                {loading ? <Loading /> 
                : (
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
                )}            
            </> 
            }
        </div>
    )          
}

export default ToDoList