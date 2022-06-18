import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from './pages/Menu';
import Notes from './pages/Notes';
// import ImportantNotes from './pages/ImportantNotes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<Menu />} />
           <Route exact path="/notes" element={<Notes />} />
           {/* <Route exact path="/important-notes" element={<ImportantNotes />} /> */}
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
