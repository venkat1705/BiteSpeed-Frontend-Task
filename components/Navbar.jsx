import React from "react";

const Navbar = ({ handleSubmit }) => {
  return (
    <nav class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md border-2 border-gray-200 rounded-full w-[500px] p-2 z-50 px-4">
      <div className="flex items-center justify-between">
        <h1 className="antialiased tracking-wide font-semibold">Bite Speed</h1>
        <button
          onClick={handleSubmit}
          className="border-2 border-gray-400 h-10 w-[140px] rounded-[8px] hover:border-purple-400"
        >
          Save Changes
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
