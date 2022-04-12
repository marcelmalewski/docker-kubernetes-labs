import './App.css';
import {useState, useEffect} from "react";
import axios from "axios"

const App = () => {
  const [messageFromBackend, setMessageFromBackend] = useState("");

  useEffect(() => {
    axios.get('/api/')
      .then(response => {
        console.log(response.data)
        setMessageFromBackend(response.data)
      })
      .catch(err => console.log(err))
  },[]);

  return (
    <div>{messageFromBackend}</div>
  );
}

export default App;
