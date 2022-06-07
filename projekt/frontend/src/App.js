import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);

  const addNewNote = () => {
    const data = {
       newNote: newNote
    }
    
    // axios.post('/api/notes', data)
    // .then(() => {
    //    alert("Success")
    // })
 }


  return (
    <div className="App">
      <h1>Your Notepad</h1>
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

      <br/>
      <br/>
      <div>Your Notes: </div>

    </div>
  );
}

export default App;
