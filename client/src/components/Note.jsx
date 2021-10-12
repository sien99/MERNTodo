import React from "react";
import Edit from "./Edit";
import DeleteIcon from "@material-ui/icons/Delete";


const Note= (props) => {

  const handleDelete = () => {
    //pass back props.id to App using props.onDelete
    props.onDelete(props.id);
  }

  const onEdit = (edit) =>{
    props.onEdit(edit)
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button className="buttonDef" onClick={handleDelete}>
        <DeleteIcon />
      </button>
      
      <Edit 
      title={props.title} 
      content={props.content}
      id={props.id}
      onEdit={onEdit}
      />
      
      

    </div>
  );
}

export default Note;
