import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { dragNodeService } from "../services/DragDropService";
import NodeItem from "./NodeItem";

const propTypes = {
    datasource: PropTypes.object,
    draggable: PropTypes.bool,
    changeHierarchy: PropTypes.func
  };
  
const defaultProps = {
    draggable: false
};
const ChartNode = ({ datasource, draggable, changeHierarchy }) => {
    const [allowedDrop, setAllowedDrop] = useState(false);
    const node = useRef();
    const nodeClass = [
        "oc-node",
        allowedDrop ? "allowedDrop" : "",
    ].join(" ");

    useEffect(() => {
      const subscriber = dragNodeService.getDragInfo().subscribe(draggedInfo => {
        if (draggedInfo) {
          setAllowedDrop(
            !document
              .querySelector("#" + draggedInfo.draggedNodeId)
              .closest("li")
              .querySelector("#" + node.current.id)
              ? true
              : false
          );
        } else {
          setAllowedDrop(false);
        }
      });
      return () => {
        subscriber.unsubscribe();
      }
    }, []);
  
    const filterAllowedDropNodes = id => {
      dragNodeService.sendDragInfo(id);
    };
  
    const dragstartHandler = event => {
      const copyDS = { ...datasource };
      delete copyDS.relationship;
      event.dataTransfer.setData("text/plain", JSON.stringify(copyDS));
      filterAllowedDropNodes(node.current.id);
    };
  
    const dragoverHandler = event => {
      // prevent default to allow drop
      event.preventDefault();
    };

    const dragendHandler = () => {
      // reset background of all potential drop targets
      dragNodeService.clearDragInfo();
    };

    const dropHandler = event => {
      if (!event.currentTarget.classList.contains("allowedDrop")) {
        return;
      }
      dragNodeService.clearDragInfo();
      changeHierarchy(
        JSON.parse(event.dataTransfer.getData("text/plain")),
        event.currentTarget.id
      );
    };
    
  return (
      <li className="oc-hierarchy">
        <div
          className={nodeClass}
          ref={node}
          id={datasource.id}
          draggable={draggable ? "true" : undefined}
          onDragStart={dragstartHandler}
          onDragOver={dragoverHandler}
          onDragEnd={dragendHandler}
          onDrop={dropHandler}
        >
          <NodeItem node={datasource}></NodeItem>                
        </div>
        {datasource.children && datasource.children.length > 0 && (
        <ul>
            {datasource.children.map(node => (
            <ChartNode
                datasource={node}
                id={node.id}
                key={node.id}
                draggable={draggable}
                changeHierarchy={changeHierarchy}
            />
            ))}
        </ul>
        )}
    </li>
  )
};

ChartNode.propTypes = propTypes;
ChartNode.defaultProps = defaultProps;

export default ChartNode;