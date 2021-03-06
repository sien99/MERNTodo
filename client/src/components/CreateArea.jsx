import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { useAuth } from "../contexts/AuthContext";

function CreateArea(props) {
  const { currentUser } = useAuth();
  const [note, setNote] = useState({
    title: "",
    content: "",
    userId: currentUser.uid
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      userId: currentUser.uid
    });
    event.preventDefault();
  }

  // Note edit effects
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          style={{ display: !isTyping && "none" }}
        />

        <textarea
          name="content"
          onChange={handleChange}
          onClick={() => setIsTyping(true)}
          value={note.content}
          placeholder={!isTyping? `Welcome ${currentUser.displayName||"Mr. Anonymous"}! Take a note here...`:"Take a note..."}
          rows={isTyping ? 3 : 1}
        />
        <Zoom in={isTyping}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
