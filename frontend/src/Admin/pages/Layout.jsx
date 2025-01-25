import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <AdminHeader />

            <div className="flex h-screen">

                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                <div className={`flex-grow overflow-y-auto transition-all duration-700 
                    ${isSidebarOpen ? "ml-[233px]" : "ml-0"}`
                }>

                    {!isSidebarOpen && (
                        <button
                            onClick={toggleSidebar}
                            className="absolute top-24 left-2 bg-slate-50 text-black px-2 rounded-xl z-20"
                        >
                            <span className="text-2xl">
                                🢒
                            </span>
                        </button>
                    )}

                    <Outlet />

                </div>
            </div>
        </>
    );
};

export default Layout;
