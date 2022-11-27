import React, { useState } from "react";
import _ from 'lodash';
import NodeItem from "./NodeItem";
import '../styles/side-bar.scss';

function SideBar({ datasource }) {

    const [selectedTeam, setSelectedTeam] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(datasource);
    const teamdata = _.groupBy(datasource, 'team');

    const filterUsers = (searchTerm) => {
        if (searchTerm.length === 0) {
          return datasource;
        }
        return datasource.filter(obj => Object.values(obj).some(val => {            
            return typeof val === 'string' &&
                    val.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0;
        }));
    };

    const options = Object.keys(teamdata).map(team => <option key={team} value={team}>{team}</option>);

    const filteredUsers = teamdata[selectedTeam] || filteredItems;
    
    let nodeItems = filteredUsers.map(item => <div className='oc-node' key={item.id} ><NodeItem node={item}></NodeItem></div>);
    
    const searchUsers = (event) => {
        setSelectedTeam('');
        setSearchTerm(event.target.value);
        setFilteredItems(filterUsers(event.target.value));
    };
    
    const filterTeamUsers = (event) => {
        setSearchTerm('');
        setSelectedTeam(event.target.value);
    };

    return (
        <section className='side-bar'>
            <section className='filters'>
                <input type='text' className='filter-item' value={searchTerm} onChange={searchUsers} placeholder="Search" />
                <select className='filter-item' value={selectedTeam} onChange={filterTeamUsers}>
                    <option value=''>---Select---</option>
                    {options}
                </select>
            </section>
            <section className='filter-results'>
                {(nodeItems.length) ?  nodeItems : <p> No Items Found </p>}
            </section>
        </section>
    );
}
  
export default SideBar;