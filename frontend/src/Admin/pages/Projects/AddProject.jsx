import React, { useState } from 'react';
import axios from 'axios';
import Sweet from 'sweetalert2';
import Loader from '../../../Components/Loader';

const AddProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [errors, setErrors] = useState({});
    const [toggle, setToggle] = useState(false);


    const ToastGood = Sweet.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Sweet.stopTimer;
            toast.onmouseleave = Sweet.resumeTimer;
        }
    });

    const ToastBad = Sweet.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Sweet.stopTimer;
            toast.onmouseleave = Sweet.resumeTimer;
        }
    });



    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!title) newErrors.title = 'Project Name is required';
        if (!description) newErrors.description = 'Description is required';
        if (!link) newErrors.link = 'Link is required';
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            console.log("Validation errors:", newErrors);
            return;
        }

        setToggle(true);
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const API = 'https://jaspreetkarayatportfolio-backend.onrender.com';
            const response = await axios.post(`${API}/api/projects/add`,
                { title, description, link },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token,
                    },
                }
            );

            if (response) {
                ToastGood.fire({
                    icon: "success",
                    title: "Project Add successfully."
                });
                setTitle('');
                setDescription('');
                setLink('');
                setErrors({});
            } else {
                ToastBad.fire({
                    icon: "error",
                    title: "Something went wrong."
                });
            }
        } catch (err) {
            ToastBad.fire({
                icon: "error",
                title: "An error occurred while adding the project."
            });
        }
        finally {
            setToggle(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 pt-28 pb-8">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Add Project
                </h1>
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <div className="form-group">
                        <label htmlFor="title" className="block text-lg font-medium mb-2">
                            Project Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && (
                            <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="block text-lg font-medium mb-2">
                            Description <span>*</span>
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && (
                            <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="link" className="block text-lg font-medium mb-2">
                            Link <span>*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                            id="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                        {errors.link && (
                            <div className="text-red-500 text-sm mt-1">{errors.link}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        disabled={toggle}
                    >
                        {toggle ? <Loader /> : 'Add Project'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
