"use client";
import { MessageSquareTextIcon } from "lucide-react";
import { useDrag } from "react-dnd";

import React from "react";

const ItemTypes = {
  MESSAGE: "message",
};

const Toolbar = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.MESSAGE,
    item: { type: ItemTypes.MESSAGE },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div>
      <div className="border-b">
        <p className="antialiased tracking-wide text-[24px] font-bold text-slate-700 p-3">
          Toolbar
        </p>
      </div>
      <div className="p-3 grid grid-cols-2 gap-3">
        <div
          ref={drag}
          className={`flex items-center justify-center flex-col gap-1 w-full h-[80px] border-2 rounded-[8px] border-purple-400 cursor-pointer hover:border-indigo-400 ${
            isDragging ? "opacity-50" : ""
          }`}
        >
          <MessageSquareTextIcon />
          <p className="antialiased tracking-wide">Message</p>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
