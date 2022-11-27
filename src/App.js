import React, {useState, useEffect}  from "react";
import Chart from './components/Chart';
import SideBar from "./components/SideBar";
import { createTree } from './services/TreeService';
import './styles/app.scss';

function App() {
  const [ds, setDS] = useState({});
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3001/db.json');
      const data = await response.json()
      setDS(createTree(data));
    };
    fetchData();
  }, []);
  return (
    <>
      <SideBar></SideBar>
      <Chart datasource={ds} draggable={true}></Chart>
    </>      
  );
}

export default App;
/*Create a repository on GitHub (<your-username>/<your-repo>)
Create a db.json file
Visit https://my-json-server.typicode.com/<your-username>/<your-repo> to access your server*/