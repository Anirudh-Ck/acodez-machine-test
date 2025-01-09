import React, { useState } from "react";
import SideBar from "./common/SideBar";
import Header from "./common/Header";

function Layout({ children }) {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
      setSidebarVisible(!isSidebarVisible);
    };

  return (
    <div className="flex flex-col min-h-screen">
    <div className="fixed top-0 w-full z-50">
      <Header toggleSidebar={toggleSidebar} />
    </div>
    <div className="flex flex-1 pt-[48px]">
      <SideBar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <div className="flex-1 lg:ml-[14%] p-4">{children}</div>
    </div>
  </div>
  );
}

export default Layout;
