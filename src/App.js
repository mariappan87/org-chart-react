import React, { useState, useEffect } from "react";
import Chart from './components/Chart';
import SideBar from "./components/SideBar";
import { createTree } from './services/TreeService';
import './styles/app.scss';

function App() {
  const [ds, setDS] = useState(null);
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const loader = document.querySelector('.loader');
    
    async function fetchData() {
      const response = await fetch('https://run.mocky.io/v3/c90538da-4279-41df-a781-2f47914ae034');
      const rawData = await response.json();
      setTreeData(createTree(rawData))
      setDS(rawData);
      
      //Hide loader
      loader.classList.add('loader-hide');
    };

    fetchData();

  }, []);

  return ds ? (
    <>
      <SideBar datasource={ds}></SideBar>
      <Chart datasource={treeData} draggable={true}></Chart>
    </>      
  ) : null;
}

export default App;