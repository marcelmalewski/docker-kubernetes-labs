import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function ImportantNotes() {
   const [newImportantNote, setNewImportantNote] = useState('');
   const navigate = useNavigate();
   const [importantNotes, setImportantNotes] = useState([{id: 1, content: 'Note 1 content'}, {id: 2, content: 'Note 2 content'}, {id: 3, content: 'Note 3 content'}]);

   const addNewImportantNote = () => {
   const data = {
      newImportantNote: newImportantNote
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

         <h1>Your Important Notes: </h1>

         <div>
            {importantNotes.map(importantNote =>
               <div key={importantNote.id}>{importantNote.content}</div>
            )}
         </div>
         <br/>

         <form onSubmit={addNewImportantNote}>
         <div>
               <label htmlFor="newImportantNote">new important note: </label>
               <input
               id="newImportantNote"
               type="text"
               value={newImportantNote}
               onChange={(e) => setNewImportantNote(e.target.value)}
               />
         </div>
         <button type="submit">add new important note</button>
         </form>
      </div>
   )
}

export default ImportantNotes