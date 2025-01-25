import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sweet from "sweetalert2";

const AllProjects = () => {
    // State to hold the projects data
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const API = 'https://jaspreetkarayatportfolio-backend.onrender.com';

    // Fetching projects data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.get(`${API}/api/projects`, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token,
                    },
                }
                );
                setProjects(response.data);
                setError("");
            } catch (err) {
                setError("Failed to load projects. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to truncate the description to a certain word limit
    const truncateDescription = (description, wordLimit = 15) => {
        const words = description.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : description;
    };

    // Handle Delete functionality with SweetAlert confirmation
    const handleDelete = async (id) => {
        sweet.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = JSON.parse(localStorage.getItem('token'));
                    await axios.delete(`${API}/api/projects/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: token,
                        },
                    }
                    );
                    setProjects((prev) => prev.filter((project) => project._id !== id));
                    sweet.fire({
                        title: "Deleted!",
                        text: "Your project has been deleted.",
                        icon: "success"
                    });
                } catch (err) {
                    console.error("Error deleting project:", err);
                    sweet.fire({
                        title: "Error!",
                        text: "Failed to delete the project. Please try again.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-32 pb-10">
            <div className="max-w-4xl mx-auto bg-white p-8 pt-0 rounded-lg shadow-lg">
                <div className="text-center lg:text-left mb-6 lg:flex lg:justify-between items-center">
                    <h1 className="text-3xl mt-2 font-bold text-gray-800">Projects</h1>
                    <Link to="/link/add-project">
                        <button
                            className="mt-3 pt-1 pb-1 pr-2 pl-2 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
                            aria-label="Add new project"
                        >
                            Add Project
                        </button>
                    </Link>
                </div>

                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : projects.length === 0 ? (
                    <p className="text-center text-red-600 py-4">Projects Not Available</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-lg">
                                    <th className="px-4 py-2 border">S.No</th>
                                    <th className="px-4 py-2 border">Project Name</th>
                                    <th className="px-4 py-2 border">Description</th>
                                    <th className="px-4 py-2 border">Link</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr key={project.id} className="bg-white text-md">
                                        <td className="px-4 py-2 border">{index + 1}</td>
                                        <td className="px-4 py-2 border">{project.title}</td>
                                        <td className="px-4 py-2 border">{truncateDescription(project.description)}</td>
                                        <td className="px-4 py-2 border">
                                            <a
                                                href={project.link}
                                                className="text-blue-600 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit ${project.title}`}
                                            >
                                                {project.link}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 border text-center">
                                            <Link to={`/link/update-project/${project._id}`}>
                                                <button
                                                    className="bg-yellow-400 text-white px-[10px] py-1 rounded-lg hover:bg-yellow-600 mt-1 mb-1"
                                                    aria-label={`Update ${project.title}`}
                                                >
                                                    Update
                                                </button>
                                            </Link>

                                            <button
                                                className="bg-red-500 text-white px-[12.5px] py-1 rounded-lg hover:bg-red-600 mt-1 mb-1"
                                                onClick={() => handleDelete(project._id)}
                                                aria-label={`Delete ${project.title}`}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProjects;
