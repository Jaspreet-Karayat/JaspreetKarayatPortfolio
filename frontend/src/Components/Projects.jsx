import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:3030/api/projects/getDataProjects");
                setProjects(response.data);
                setError("");
            } catch (err) {
                setError("Failed to load projects.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white pt-24 px-6 md:px-20 font-sans">
                <h2 className="text-3xl p-5 font-bold mb-6 text-center">My Projects</h2>
                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-400">{error}</p>
                ) : projects.length === 0 ? (
                    // Display a message in the center when no projects are available
                    <div className="flex items-center justify-center h-[50vh]">
                        <p className="text-red-500 text-xl font-semibold">No Projects Available</p>
                    </div>
                ) : (
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <div
                                key={project._id}
                                className="bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 transform transition-all"
                            >
                                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-300 mb-4">{project.description}</p>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                                >
                                    Visit Website
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Projects;
