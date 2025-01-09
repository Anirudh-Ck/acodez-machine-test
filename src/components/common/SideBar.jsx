import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function SideBar({ isSidebarVisible, toggleSidebar }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div
      className={`fixed top-12 left-0 bg-white h-screen w-[70%] lg:w-[14%] border-r z-30 transition-transform duration-300 
    ${
      isSidebarVisible ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0`}
    >
      {/* Mobile Close Button */}
      <button className="text-gray-500 lg:hidden p-4" onClick={toggleSidebar}>
        Close
      </button>
      <div className="p-2">
        <div className="p-4">
          <img
            src="https://via.placeholder.com/100x40?text=Logoipsum"
            alt="Logo"
            className="w-32 mx-auto md:mx-0"
          />
        </div>

        <div className="p-4 space-y-1">
          <div
            className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={toggleDropdown}
          >
            <div className="flex items-center space-x-6">
              <span className="text-gray-500">★</span>
              <span className="text-gray-700 text-sm">List item</span>
            </div>
            <span className="text-gray-500 ">
              {isDropdownVisible ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </div>

          {isDropdownVisible && (
            <div className="pl-8 space-y-1">
              <div className="flex items-center space-x-6 cursor-pointer hover:bg-gray-100 pl-2 pt-1 rounded">
                <span className="text-gray-500">★</span>
                <span className="text-gray-700 text-xs">List item</span>
              </div>
              <div className="flex items-center space-x-6 cursor-pointer hover:bg-gray-100 pl-2 pt-1 rounded">
                <span className="text-gray-500">★</span>
                <span className="text-gray-700 text-xs">List item</span>
              </div>
              <div className="flex items-center space-x-6 cursor-pointer hover:bg-gray-100 pl-2 pt-1 rounded">
                <span className="text-gray-500">★</span>
                <span className="text-gray-700 text-xs">List item</span>
              </div>
              <div className="flex items-center space-x-6 cursor-pointer hover:bg-gray-100 pl-2 pt-1 rounded">
                <span className="text-gray-500">★</span>
                <span className="text-gray-700 text-xs">List item</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
