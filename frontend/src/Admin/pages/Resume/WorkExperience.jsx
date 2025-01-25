import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sweet from 'sweetalert2';

const AllWorkExperience = () => {
    // State to hold the work experiences data
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetching experiences data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.get('http://localhost:3030/api/experience', {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token,
                    },
                });
                setExperiences(response.data);
                setError('');
            } catch (err) {
                setError('Failed to load experiences. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to format the date
    const formatDate = (date) => {
        if (!date) return 'Not Provided'; // Handling empty or invalid dates
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    // Function to truncate the description to a certain word limit
    const truncateDescription = (description, wordLimit = 10) => {
        const words = description.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : description;
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
                    await axios.delete(`http://localhost:3030/api/experience/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: token,
                        },
                    });
                    setExperiences((prev) => prev.filter((experience) => experience._id !== id));
                    sweet.fire('Deleted!', 'Your experience has been deleted.', 'success');
                } catch (err) {
                    console.error('Error deleting experience:', err);
                    sweet.fire('Error!', 'Failed to delete the experience. Please try again.', 'error');
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-32 pb-14">
            <div className="max-w-4xl mx-auto bg-white p-8 pt-0 rounded-lg shadow-lg">
                <div className="text-center lg:text-left mb-6 lg:flex lg:justify-between items-center">
                    <h1 className="text-3xl mt-2 font-bold text-gray-800">Work Experience</h1>
                    <Link to="/link/add-workExperience">
                        <button
                            className="mt-3 pt-1 pb-1 pr-2 pl-2 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
                            aria-label="Add new work experience"
                        >
                            Add Experience
                        </button>
                    </Link>
                </div>

                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : experiences.length === 0 ? (
                    <p className="text-center text-red-600 py-4">No Experiences Found</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-lg">
                                    <th className="px-4 py-2 border">S.No</th>
                                    <th className="px-4 py-2 border">Job Title</th>
                                    <th className="px-4 py-2 border">Company Name</th>
                                    <th className="px-4 py-2 border">Description</th>
                                    <th className="px-4 py-2 border">Start Date</th>
                                    <th className="px-4 py-2 border">End Date</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {experiences.map((experience, index) => (
                                    <tr key={experience._id} className="bg-white text-md">
                                        <td className="px-4 py-2 border">{index + 1}</td>
                                        <td className="px-4 py-2 border">{experience.title}</td>
                                        <td className="px-4 py-2 border">{experience.company}</td>
                                        <td className="px-4 py-2 border">{truncateDescription(experience.description)}</td>
                                        <td className="px-4 py-2 border">{formatDate(experience.startDate)}</td>
                                        <td className="px-4 py-2 border">
                                            {experience.endDate === 'Present' ? 'Present' : formatDate(experience.endDate)}
                                        </td>
                                        <td className="px-4 py-3 border text-center">
                                            <button
                                                className="bg-red-500 text-white px-[12.5px] py-1 rounded-lg hover:bg-red-600 mt-1 mb-1"
                                                onClick={() => handleDelete(experience._id)}
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

export default AllWorkExperience;
