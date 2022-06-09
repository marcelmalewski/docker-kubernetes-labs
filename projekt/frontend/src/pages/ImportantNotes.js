import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function ImportantNotes() {
   const [newImportantNoteContent, setNewImportantNoteContent] = useState('');
   const navigate = useNavigate();
   const [importantNotes, setImportantNotes] = useState([]);

   const addNewImportantNote = () => {
      const newImportantNote = {
         content: newImportantNoteContent
      }
      
      axios.post('http://localhost:5000/important-notes', newImportantNote)
      .then(() => {
         alert("Success")
      })
   }

   const deleteImportantNote = (id) => {
      axios.delete(`http://localhost:5000/important-notes/${id}`)
      .then(() => {
         alert("Success deleted")
         setImportantNotes(importantNotes.filter(importantNote => importantNote._id !== id))
      });
   }

   const goToMenu = () => {
      navigate("/");
   }

   useEffect(() => {
      axios.get('http://localhost:5000/important-notes')
      .then((response) => {
         setImportantNotes(response.data.importantNotes)
      })
    }, [navigate])

   return (
      <div>
         <button onClick={goToMenu}>Back to Menu</button>
         <br/>
         <br/>

         <h1>Your Important Notes: </h1>

         <div>
            {importantNotes.map(importantNote =>
               <div
                  key={importantNote._id}>{importantNote.content}
                  <button onClick={() => deleteImportantNote(importantNote._id)}>Delete</button>
                  <br/>
                  <br/>
               </div>
            )}
         </div>
         <br/>

         <form onSubmit={addNewImportantNote}>
         <div>
               <label htmlFor="newImportantNote">new important note: </label>
               <input
               id="newImportantNote"
               type="text"
               value={newImportantNoteContent}
               onChange={(e) => setNewImportantNoteContent(e.target.value)}
               />
         </div>
         <button type="submit">add new important note</button>
         </form>
      </div>
   )
}

export default ImportantNotes