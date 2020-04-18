import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { Primary, Delete} from './Button'
import { AuthContext } from '../Contexts/AuthContextProvider'
import Loading from './Loading'

function Archived(){
    const [ loading, setLoading ] = useState(true)
    const { headers } = useContext(AuthContext)    
    const [todos, setToDo] = useState([])
    const history = useHistory()
    
    useEffect(()=>{
        let mounted = true
        if(mounted) getArchTodos()
   
        return ()=> mounted = false
        
    }, [])

    const getArchTodos = async() =>{
        try {
            let res = await axios.get("/todo/finished",{headers})
            let data = await res.data
            setToDo(data)
            setLoading(false)                
        } catch (error) {
            console.log(error)
        }
    }

    const onDelete = async(value) =>{
        try {
            setLoading(true)
            await axios.delete("/todo",{data:{id: value},headers})
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

    {loading ? (<Loading />) :
        (<div className="row">
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
        </div>)
    }
    </>
  )
}

export default Archived