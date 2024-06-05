"use client";
import React, { useCallback, useState } from "react";
import FlowBuilder from "./FlowBuilder";
import Toolbar from "./Toolbar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SettingsPanel from "./SettingsPanel";
import { useNodesState } from "reactflow";
import CustomNode from "./CustomNode";
import Navbar from "../Navbar";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "default-1",
    position: { x: 0, y: 0 },
    name: "message",
    type: "custom",
    data: { label: "This is the default message" },
  },
];

const Builder = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  // The function hanldechange will trigger when we click on the node
  // Here we are using the useCallback hook to memoize the function and prevent unnecessary re-renders

  const handleChange = useCallback(
    (label) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label } }
            : node
        )
      );
      setSelectedNode((node) => ({ ...node, data: { ...node.data, label } }));
    },
    [selectedNode]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-9">
        <div className="col-span-7">
          {/* flow builder */}
          <FlowBuilder
            setSelectedNode={setSelectedNode}
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            initialNodes={initialNodes}
            nodeTypes={nodeTypes}
            selectedNode={selectedNode}
          />
        </div>
        <div className="border-l bg-gray-100 col-span-2 sticky left-0 ">
          {/* toolbar */}
          {selectedNode ? (
            <p>
              <SettingsPanel
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                onChange={handleChange}
              />
            </p>
          ) : (
            <Toolbar />
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default Builder;
