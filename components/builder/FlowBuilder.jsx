"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  MiniMap,
} from "reactflow";
import { useDrop } from "react-dnd";

import "reactflow/dist/style.css";
import Navbar from "../Navbar";
import toast from "react-hot-toast";

const ItemTypes = {
  MESSAGE: "message",
  PLUS: "plus",
};

const FlowBuilder = ({
  setSelectedNode,
  nodes,
  setNodes,
  onNodesChange,
  nodeTypes,
}) => {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [messageCount, setMessageCount] = useState(1);

  const containerRef = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return; // Ensure offset is defined

      const containerBounds = containerRef.current.getBoundingClientRect();
      const id = `${item.type}-${new Date().getTime()}`; // Unique ID based on timestamp
      let newNode;
      let label;

      switch (item.type) {
        case ItemTypes.MESSAGE:
          label = `New Message Node`;

          newNode = {
            id,
            position: {
              x: offset.x - containerBounds.left - 700,
              y: offset.y - containerBounds.top - 300,
            },
            data: { label },
            name: "message",
            type: "custom",
          };
          setMessageCount((count) => count + 1);
          break;
        default:
          break;
      }

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes, nodes.length, messageCount]
  );

  const handleClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: Object.values(ItemTypes),
    drop: (item, monitor) => onDrop(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleSave = () => {
    const flowError =
      nodes.filter((node) => !edges.some((edge) => edge.target === node.id))
        .length > 1;
    if (flowError) {
      toast.error("Cannot save Flow");
    } else {
      toast.success("Flow saved successfully");
      localStorage.setItem("nodes", JSON.stringify(nodes));
      localStorage.setItem("edges", JSON.stringify(edges));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("nodes")) {
      setNodes(JSON.parse(localStorage.getItem("nodes")));
    }
    if (localStorage.getItem("edges")) {
      setEdges(JSON.parse(localStorage.getItem("edges")));
    }
  }, []);

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }} ref={drop}>
        <div style={{ width: "100%", height: "100%" }} ref={containerRef}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={handleClick}
            fitView
          >
            <Controls />
            <MiniMap nodeColor={() => "blue"} />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
          <Navbar handleSubmit={handleSave} />
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
