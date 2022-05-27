import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import axios from "axios"

function App() {
  const [messageFromBackend, setMessageFromBackend] = useState("");

  useEffect(() => {
    axios.get('http://host.docker.internal:30400/')
      .then(response => {
        console.log(response.data)
        setMessageFromBackend(response.data)
      })
      .catch(err => console.log(err))
  },[]);

  return (
    <div>Message bffrak: {messageFromBackend}</div>
  );
}

export default App;
