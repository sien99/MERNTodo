import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';


const Edit = (props) => {
    const [edit, setEdit] = useState({
        title: props.title,
        content: props.content,
        id: props.id
      });


    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setEdit((prevEdit) => {
          return {
            // overwrite value of each section 
            // by importing all value from prev, overwrite section that you make changes on
            ...prevEdit,
            [name]: value
          };
        });
        
    }  


    const submitEdit = ()=>{
        // if title and content remain unchanged, no need to update to server
        if( edit.title!==props.title || edit.content!==props.content){
            // save edited text in modal @ localhost 3000
            setEdit(()=>{
                return{
                    ...edit
                 }
            })
            // console.log(edit);
            props.onEdit(edit)
         }
    }

    const exitEdit = () => {
        setEdit(()=>{
          return{
              title: props.title,
              content: props.content
          }  
        })
    }

    return (
        <div className="editModal">
            {/* id can't start with number */}
            <div className="modal fade" id={"id"+props.id} tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" >Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" 
                            onClick={exitEdit}
                            >
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <h6 className="edit-title">Title:</h6>
                                <input 
                                className="editInput" name="title" 
                                type="text" value={edit.title} 
                                onChange={handleChange} 
                                />
                                <h6>Content:</h6>
                                <textarea 
                                className="editInput" name="content" 
                                cols="58" rows="10"
                                value={edit.content}
                                onChange={handleChange}
                                
                                >
                                
                                </textarea>
                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close</button> */}
                                <button 
                                type="button" className="btn btn-primary"
                                data-bs-dismiss="modal" 
                                onClick={submitEdit}
                                >
                                Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <button 
            className="editButton" 
            data-bs-toggle="modal" 
            data-bs-target={"#id"+props.id}
            >
                <EditIcon />
            </button>

        </div>
    )
}

export default Edit
