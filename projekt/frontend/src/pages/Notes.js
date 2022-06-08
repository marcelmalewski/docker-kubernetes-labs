import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Notes() {
   const [newNote, setNewNote] = useState('');
   const navigate = useNavigate();
   const [notes, setNotes] = useState([{id: 1, content: 'Note 1 content', important: false}, {id: 2, content: 'Note 2 content', important: false}]);

   const addNewNote = () => {
   const data = {
      newNote: newNote
   }
   
   // axios.post('/api/notes', data)
   // .then(() => {
   //    alert("Success")
   // })
   }

   const goToMenu = () => {
      navigate("/");
   }

  return (
    <div>
      <button onClick={goToMenu}>Back to Menu</button>
      <br/>
      <br/>

      <h1>Your Notes: </h1>

      <div>
         {notes
            .filter(note => !note.important)
            .map(note =>
               <div key={note.id}>{note.content}</div>
         )}
      </div>
      <br/>

      <form onSubmit={addNewNote}>
        <div>
            <label htmlFor="newNote">new note: </label>
            <input
              id="newNote"
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
        </div>
        <button type="submit">add new note</button>
      </form>
    </div>
  )
}

export default Notes