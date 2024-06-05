import { ArrowLeftIcon } from "lucide-react";
import React from "react";

const SettingsPanel = ({ selectedNode, setSelectedNode, onChange }) => {
  const handleBack = () => {
    if (selectedNode?.data?.label === "") {
      alert("Message cannot be blank");
      return;
    }
    setSelectedNode(null);
  };
  return (
    <div>
      <div className="border-b">
        <p className="antialiased tracking-wide text-[24px] font-bold text-slate-700 p-3">
          Settings Panel
        </p>
      </div>

      <div className="p-3 border-b">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full hover:text-blue-400 cursor-pointer"
            onClick={handleBack}
          >
            <ArrowLeftIcon size={18} />
          </div>
          <p className="capitalize text-center">{selectedNode?.name}</p>
        </div>
      </div>

      <div className="p-3">
        <textarea
          className="w-full p-3 border-2 border-gray-200 rounded-[8px]"
          rows={4}
          placeholder="Enter your message here"
          value={selectedNode?.data?.label}
          onChange={(e) => onChange(e.target.value, "label")}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
