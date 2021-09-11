import React, { useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  // const [note, setNote] = useState({
  //   title: "",
  //   content: ""
  // });
  
  const updateNote = async()=>{
    try{
    const response = await fetch("http://localhost:5000/todos");
    const jsonData = await response.json();
    
    setNotes(jsonData);
    
    // console.log(jsonData);
    
    }catch(err){
    console.error(err.message);
    }
  }
  
  useEffect(() => {
    updateNote() //must add () parenthesis as it may not exec without
  },[])        
 //add [] at second input of useEffect, so that useEffect 
 //will only update when 


  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    //add new note into atlas db
    const data = {newNote} ; //must {dataToFetch} , wrap?
    fetch("http://localhost:5000/todos",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data) //must match headers
    });
    window.location="/";
    // console.log(notes);
  }

  const deleteNote= async(id)=> {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });

    //delete selected item in database
    const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
      method: "DELETE"
    });
    console.log(deleteTodo)

  }
  
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        console.log(noteItem._id)
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
