import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="flex">
        {/* Sidebar component */}
        <Sidebar />

        {/* Content area with margin for spacing from Sidebar */}
        <div className="w-full ml-16 md:ml-56 bg-gray-300 min-h-screen p-6">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
