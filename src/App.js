import React, { useState, useEffect } from "react";
import Chart from './components/Chart';
import SideBar from "./components/SideBar";
import { createTree, createSubTree } from './services/TreeService';
import { getOrganizationData } from './services/MockService';
import './styles/app.scss';

function App() {
  const [ds, setDS] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const updateTree = (teamData) => {
    const treeData = teamData ? createSubTree(teamData): createTree(ds);
    setTreeData(treeData);
  }

  useEffect(() => {
    const loader = document.querySelector('.loader');
    
    async function fetchData() {
      const rawData = await getOrganizationData();
      setTreeData(createTree(rawData));
      setDS(rawData);
      
      //Hide loader
      loader.classList.add('loader-hide');
    };

    fetchData();    

  }, []);
  

  return ds ? (
    <>
      <SideBar datasource={ds} updateTreeByTeam = {updateTree}></SideBar>
      <Chart datasource={treeData} draggable={true}></Chart>
    </>
  ) : null;
}

export default App;