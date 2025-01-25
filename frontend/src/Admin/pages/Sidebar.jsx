import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const navigate = useNavigate();

    const toggleResume = () => setIsResumeOpen(!isResumeOpen);

    const handleLogout = async () => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className={`transition-all duration-300 fixed top-10 left-0 h-full bg-gray-800 text-white p-5 z-10 border-r-[1px] border-slate-700 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`} >

            {/* Sidebar Toggle Button */}
            {
                <button
                    onClick={toggleSidebar}
                    className="absolute top-14 right-5 bg-gray-700 text-white px-2 rounded-xl"
                >
                    <span className="text-2xl">
                        {isSidebarOpen ? "🢐" : "🢒"}
                    </span>
                </button>
            }


            <ul className="list-none p-0 m-0">
                <li className="mb-4 pt-20">
                    <NavLink
                        to="/link"
                        end
                        className={({ isActive }) =>
                            `block py-3 px-4 text-xl rounded-md ${isActive ? "bg-blue-800 hover:bg-blue-900" : "hover:bg-gray-600"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>


                <li className="mb-4">
                    <NavLink
                        to="/link/update-home"
                        className={({ isActive }) =>
                            `block py-3 px-4 text-xl rounded-md ${isActive ? "bg-blue-800 hover:bg-blue-900" : "hover:bg-gray-600"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                </li>


                <li className="mb-4">
                    <NavLink
                        to="/link/all-projects"
                        className={({ isActive }) =>
                            `block py-3 px-4 text-xl rounded-md ${isActive ? "bg-blue-800 hover:bg-blue-900" : "hover:bg-gray-600"
                            }`
                        }
                    >
                        Projects
                    </NavLink>
                </li>


                <li className="mb-4">
                    <div
                        onClick={toggleResume}
                        className="flex justify-between items-center cursor-pointer py-3 px-4 text-xl rounded-md hover:bg-gray-600"
                    >
                        <span>Resume</span>
                        <span className="text-sm">{isResumeOpen ? "⮙" : "⮛"}</span>
                    </div>
                    {isResumeOpen && (
                        <ul className="pl-5 mt-2">
                            <li className="mb-2">
                                <NavLink
                                    to="/link/update-CV"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 text-lg rounded-md ${isActive ? "bg-blue-800 hover:bg-blue-900" : "hover:bg-gray-600"
                                        }`
                                    }
                                >
                                    Update Resume
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink
                                    to="/link/all-workExperience"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 text-lg rounded-md ${isActive ? "bg-blue-800 hover:bg-blue-900" : "hover:bg-gray-600"
                                        }`
                                    }
                                >
                                    Work Experience
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink
                                    to="/link/all-skills"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 text-lg rounded-md ${isActive ? "bg-blue-800 hover:bg-blue-900" : "hover:bg-gray-600"
                                        }`
                                    }
                                >
                                    Skills
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>





                <li className="mb-4 mt-16 mx-[55.8px]">
                    <button
                        className="bg-blue-700 py-2 px-3 rounded-lg shadow-lg text-center text-lg lg:text-lg hover:bg-blue-900"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>
            </ul>

        </div>
    );
};

export default Sidebar;
