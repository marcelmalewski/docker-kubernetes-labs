import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import axios from "axios"

function App() {
  const [messageFromBackend, setMessageFromBackend] = useState("");

  // useEffect(() => {
  //   //jakos inaczej bo clusterIp
  //   axios.get('http://localhost:4000/')
  //     .then(response => {
  //       console.log(response.data)
  //       setMessageFromBackend(response.data)
  //     })
  //     .catch(err => console.log(err))
  // },[]);

  return (
    <div>Message bffrak: yes</div>
  );
}

export default App;
