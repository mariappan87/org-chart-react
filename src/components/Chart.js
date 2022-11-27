import React, { useState } from "react";
import PropTypes from "prop-types";
import JSONDigger from "json-digger";
import ChartNode from './ChartNode';
import '../styles/chart.scss';

const propTypes = {
    datasource: PropTypes.object.isRequired,
    draggable: PropTypes.bool
};
const defaultProps = {   
    draggable: false  
};

const Chart = ({ datasource, draggable }) => {
  const [ds, setDS] = useState(datasource);
  const attachRel = (data, flags) => {
      data.relationship =
        flags + (data.children && data.children.length > 0 ? 1 : 0);
      if (data.children) {
        data.children.forEach(function(item) {
          attachRel(item, "1" + (data.children.length > 1 ? 1 : 0));
        });
      }
      return data;
  };
        
  const dsDigger = new JSONDigger(datasource, "id", "children");
  const changeHierarchy = async (draggedItemData, dropTargetId) => {
    await dsDigger.removeNode(draggedItemData.id);
    await dsDigger.addChildren(dropTargetId, draggedItemData);
    setDS({ ...dsDigger.ds });
  };

  return (
    <div className = 'orgchart'>
      <ul>
        <ChartNode
            datasource={attachRel(ds, "00")}
            draggable={draggable}
            changeHierarchy={changeHierarchy}
        />
      </ul>
    </div>
    );
}

Chart.propTypes = propTypes;
Chart.defaultProps = defaultProps;

export default Chart;