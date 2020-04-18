import React from 'react'
import {Submit} from './Button'

const ToDoInput = (props) =>(
<>
    <div className="row m-2">
        <div className="col-md-4 offset-md-4 ">
            <h4 className="text-center">{props.Head}</h4>
        </div>
    </div>

    <div className="row">                                 
    <div className="col-md-4 offset-md-4 col-sm-12">
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
                className="form-control"
                type="text"
                defaultValue={props.title} 
                onChange={props.titlefn}
                />
        </div>
        <div className="form-group">
            <label htmlFor="Description">Description </label>
            <textarea 
                className="form-control"
                type="text"
                defaultValue={props.description}
                onChange={props.desfn}
                ></textarea>
        </div>
        <Submit fn={props.onSubmit} />
    </div>
    </div>
</>
)    

export default ToDoInput