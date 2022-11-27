import React from 'react';
import PropTypes from "prop-types";
import '../styles/node-item.scss';

const propTypes = {
    node: PropTypes.object    
};
  
function NodeItem({node}) {
    return (
        <>
            <img src={'/img/'+ node.id +'.png'} className='node-item' alt='userphoto'></img>
            <div className="node-item">
                <div className="full-name">{node.name}</div>
                <div className="designation">{node.designation}</div>
                <div className="team"><i>{node.team}</i></div>
            </div>
        </>
    )
}

NodeItem.propTypes = propTypes;

export default NodeItem;