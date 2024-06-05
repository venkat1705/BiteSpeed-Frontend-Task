import { MessageSquareTextIcon } from "lucide-react";
import Image from "next/image";
import React, { memo } from "react";
import { Handle, Position } from "reactflow";

function CustomNode({ data }) {
  return (
    <div className="shadow-md bg-white rounded-[6px] border border-gray-300 w-[200px] hover:border-purple-400 h-full">
      <div className="flex items-center justify-between bg-[#b0eee5] rounded-t-[5px] px-3 py-1">
        <div className="flex items-center gap-1">
          <MessageSquareTextIcon size={12} />
          <p className="antialiased tracking-wide text-[12px] font-semibold">
            Send Message
          </p>
        </div>
        <div>
          <Image src="/whatsappicon.svg" width={20} height={20} />
        </div>
      </div>

      <div className="px-3 py-1.5">
        <p className="text-[12px] w-[180px] truncate">{data.label}</p>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
}

export default memo(CustomNode);
