import React, { useState } from 'react';
import axios from 'axios';
import Sweet from "sweetalert2";
import Loader from '../../../Components/Loader';

const CVUpdate = () => {
    const [fileUrl, setFileUrl] = useState(''); // To store the file URL
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
        },
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
        },
    });

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {};
        if (!fileUrl) newErrors.fileUrl = 'File URL is required';
        setErrors(newErrors);

        // If there are errors, prevent form submission
        if (Object.keys(newErrors).length > 0) return;

        // Set loading state
        setToggle(true);

        try {
            const token = JSON.parse(localStorage.getItem('token')); // Fetch token from localStorage
            const response = await axios.post(
                'http://localhost:3030/api/CV/update',
                { fileUrl },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token, 
                    },
                }
            );

            if (response.data) {
                ToastGood.fire({
                    icon: "success",
                    title: "CV updated successfully.",
                });
                // Reset form fields
                setFileUrl('');
            } else {
                ToastBad.fire({
                    icon: "error",
                    title: "Something went wrong.",
                });
            }
        } catch (err) {
            ToastBad.fire({
                icon: "error",
                title: "An error occurred while updating the CV.",
            });
        } finally {
            setToggle(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-32 pb-12">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                    Update CV
                </h1>
                <form onSubmit={handleSubmit} className="w-full space-y-6">

                    {/* File URL */}
                    <div className="form-group">
                        <label htmlFor="fileUrl" className="block text-lg font-medium mb-2">
                            File URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="fileUrl"
                            value={fileUrl}
                            onChange={(e) => setFileUrl(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.fileUrl && <div className="text-red-500 text-sm mt-1">{errors.fileUrl}</div>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        disabled={toggle}
                    >
                        {toggle ? <Loader /> : 'Update CV'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CVUpdate;
