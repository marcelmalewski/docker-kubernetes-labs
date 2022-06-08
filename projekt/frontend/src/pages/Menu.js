import React from 'react'
import { useNavigate } from "react-router-dom";

function Menu() {
   const navigate = useNavigate();

   const goToNotes = () => {
      navigate("/notes");
   }

   const goToImportantNotes = () => {
      navigate("/important-notes");
   }

   return (
      <div>
         <h1>Menu</h1>

         <button onClick={goToNotes}>Notes</button>
         <br/>

         <button onClick={goToImportantNotes}>Important Notes</button>
         <br/>

      </div>
   )
}

export default Menu