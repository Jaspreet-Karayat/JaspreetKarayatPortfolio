import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sweet from 'sweetalert2';

const AllSkills = () => {
    // State to hold the skills data
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetching skills data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.get('http://localhost:3030/api/skills', {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token,
                    },
                }
                );
                setSkills(response.data);
                setError('');
            } catch (err) {
                setError('Failed to load skills. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to truncate description to a given word limit
    const truncateDescription = (description, wordLimit = 10) => {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    };

    // Handle Delete functionality with SweetAlert confirmation
    const handleDelete = async (id) => {
        sweet.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = JSON.parse(localStorage.getItem('token'));
                    await axios.delete(`http://localhost:3030/api/skills/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: token,
                        },
                    }
                    );
                    setSkills((prev) => prev.filter((skill) => skill._id !== id));
                    sweet.fire('Deleted!', 'The skill has been deleted.', 'success');
                } catch (err) {
                    console.error('Error deleting skill:', err);
                    sweet.fire('Error!', 'Failed to delete the skill. Please try again.', 'error');
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-32 pb-12">
            <div className="max-w-4xl mx-auto bg-white p-8 pt-0 rounded-lg shadow-lg">
                <div className="text-center lg:text-left mb-6 lg:flex lg:justify-between items-center">
                    <h1 className="text-3xl mt-2 font-bold text-gray-800">Skills</h1>
                    <Link to="/link/add-skills">
                        <button
                            className="mt-3 pt-1 pb-1 pr-2 pl-2 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
                            aria-label="Add new skill"
                        >
                            Add Skill
                        </button>
                    </Link>
                </div>
                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : skills.length === 0 ? (
                    <p className="text-center text-red-600 py-4">No Skills Found</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-lg">
                                    <th className="px-4 py-2 border">S.No</th>
                                    <th className="px-4 py-2 border">Skill Name</th>
                                    <th className="px-4 py-2 border">Description</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skills.map((skill, index) => (
                                    <tr key={skill._id} className="bg-white text-md">
                                        <td className="px-4 py-2 border">{index + 1}</td> {/* Serial Number */}
                                        <td className="px-4 py-2 border">{skill.skillName}</td> {/* Skill Name */}
                                        <td className="px-4 py-2 border">{truncateDescription(skill.description)}</td> {/* Truncated Description */}
                                        <td className="px-4 py-3 border text-center">
                                            <button
                                                className="bg-red-500 text-white px-[12.5px] py-1 rounded-lg hover:bg-red-600 mt-1 mb-1"
                                                onClick={() => handleDelete(skill._id)}
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

export default AllSkills;
