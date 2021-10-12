import React, { useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useAuth } from "../contexts/AuthContext";

function TodoApp() {
  const [notes, setNotes] = useState([]);
  const { currentUser } = useAuth();
  const [isEdit, setIsEdit] = useState(true)
  // const [note, setNote] = useState({
  //   title: "",
  //   content: ""
  // });
  
//! Retrive data from atlas
//* GET
  const updateNote = async() => { 
    try{

    const response = await fetch("http://localhost:5000/todos");
    const jsonData = await response.json();
    console.log(isEdit);
    if(isEdit){
      setNotes(jsonData);
      setIsEdit(false);
    }
    // console.log(jsonData);
    
    }catch(err){
    console.error(err.message);
    }
  }
  
  useEffect(() => {
    updateNote() //must add () parenthesis as it may not exec without
  },[notes,isEdit])        
 //add [] at second input of useEffect, so that useEffect 
 //will only update when 

//! Manipulate data on atlas

//* POST
  const addNote = (newNote) => {

    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    })
    setIsEdit(true)
    //add new note into atlas db
    const data = {newNote} ; //must {dataToFetch} , wrap?
      fetch("http://localhost:5000/todos",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data) //must match headers
    })
    
    
      
    // window.location="/todo-app"
    // console.log(notes);
  }

//* PUT
  const editNote = (edit) => {
    // console.log(edit);
    try {
      const data = {edit} ; //must {dataToFetch} , wrap?
      setIsEdit(true);
      fetch(`http://localhost:5000/todos/${edit.id}`,{
       method: "PUT",
       headers: {"Content-Type":"application/json"},
       body: JSON.stringify(data) //must match headers
      });  
    } catch (error) {
      console.error(error);
    }


    
  }

//* DELETE
  //id is retrieve from Note.jsx onDelete
  const deleteNote = (id) => {
    // to update notes immediately, without retrieve data from db
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });

    // delete selected item in database atlas online
    console.log(id);
    fetch(`http://localhost:5000/todos/${id}`,{
      method: "DELETE"
    });
    // console.log(deleteTodo)

  }
  
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {/* Extract data from notes array */}
      <div className="notesContainer">
        {notes.map((noteItem, index) => {
          // console.log(noteItem)
          if(noteItem.userId===currentUser.uid){
          return (

            <Note
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}  
              onDelete={deleteNote}
              onEdit={editNote}
            />          
          )} 
          })}
      </div>
      <Footer />
    </div>
  );
}

export default TodoApp;
