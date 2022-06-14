// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// //process.env.BACKEND_URL
// function Notes() {
//    const [newNoteContent, setNewNoteContent] = useState('');
//    const navigate = useNavigate();
//    const [notes, setNotes] = useState([]);

//    const addNewNote = () => {
//     const newNote = {
//       content: newNoteContent
//     }
  
//   //localhost:5000
//   axios.post(`http://${process.env.BACKEND_URL}/notes`, newNote)
//     .then(() => {
//       alert("Success added new note");
//     })
//   }

//   const deleteNote = (id) => {
//     axios.delete(`http://${process.env.BACKEND_URL}/notes/${id}`)
//     .then(() => {
//       alert("Success deleted")
//       setNotes(notes.filter(note => note._id !== id))
//     });
//   }

//   const goToMenu = () => {
//     navigate("/");
//   }

//   useEffect(() => {
//     axios.get('http://localhost:5000/notes')
//     .then((response) => {
//        setNotes(response.data.notes)
//     })
//   }, [navigate])


//   return (
//     <div>
//       <button onClick={goToMenu}>Back to Menu</button>
//       <br/>
//       <br/>

//       <h1>Your Notes: </h1>

//       <div>
//          {notes.map(note =>
//               <div 
//                 key={note._id}>{note.content}
//                 <button onClick={() => deleteNote(note._id)}>Delete</button>
//                 <br/>
//                 <br/>
//               </div>
//          )}
//       </div>
//       <br/>

//       <form onSubmit={addNewNote}>
//         <div>
//             <label htmlFor="newNote">new note: </label>
//             <input
//               id="newNote"
//               type="text"
//               value={newNoteContent}
//               onChange={(e) => setNewNoteContent(e.target.value)}
//             />
//         </div>
//         <button type="submit">add new note</button>
//       </form>
//     </div>
//   )
// }

// export default Notes