import React, {useState, useMemo} from "react";
import TeamData, {filterUsers} from '../store';
import NodeItem from "./NodeItem";
import '../styles/side-bar.scss';

function SideBar() {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    let filteredUsers = useMemo(() => filterUsers(searchTerm), [searchTerm]);

    const options = Object.keys(TeamData).map(team => <option key={team} value={team}>{team}</option>);

    filteredUsers = TeamData[selectedTeam] || filteredUsers;
    
    let nodeItems = filteredUsers.map(item => <div className='oc-node' key={item.id} ><NodeItem node={item}></NodeItem></div>);
    
    const searchUsers = (event) => {
        setSelectedTeam('');
        setSearchTerm(event.target.value);
    };
    
    const filterTeamUsers = (event) => {
        setSearchTerm('');
        setSelectedTeam(event.target.value);
    };

    return (
        <section className='side-bar'>
            <section className='filters'>
                <input type='text' className='filter-item' value={searchTerm} onChange={searchUsers}placeholder="Search" />
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