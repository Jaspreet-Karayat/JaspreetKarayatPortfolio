import React, { useState } from "react";
import axios from "axios";
import Sweet from "sweetalert2";
import Loader from "../../../Components/Loader";

const AddWorkExperience = () => {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
        if (!title) newErrors.title = "Job title is required";
        if (!company) newErrors.company = "Company name is required";
        if (!description) newErrors.description = "Description is required";
        setErrors(newErrors);

        // If there are errors, prevent form submission
        if (Object.keys(newErrors).length > 0) return;

        // Prepare data for submission
        const formData = { title, company, description, startDate, endDate };

        // Set loading state and send data to the backend
        setToggle(true);

        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.post(
                "http://localhost:3030/api/experience/add",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                    },
                }
            );

            if (response) {
                ToastGood.fire({
                    icon: "success",
                    title: "Experience added successfully.",
                });
                // Reset form fields
                setTitle("");
                setCompany("");
                setDescription("");
                setStartDate("");
                setEndDate("");
            } else {
                ToastBad.fire({
                    icon: "error",
                    title: "Something went wrong.",
                });
            }
        } catch (err) {
            ToastBad.fire({
                icon: "error",
                title: "An error occurred while adding the experience.",
            });
        } finally {
            setToggle(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-32 pb-12">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">
                    Add Work Experience
                </h1>
                <form onSubmit={handleSubmit} className="w-full space-y-6">

                    {/* Job Title */}
                    <div className="form-group">
                        <label htmlFor="title" className="block text-lg font-medium mb-2">
                            Job Title <span>*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>

                    {/* Company */}
                    <div className="form-group">
                        <label htmlFor="company" className="block text-lg font-medium mb-2">
                            Company <span>*</span>
                        </label>
                        <input
                            type="text"
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.company && <div className="text-red-500 text-sm mt-1">{errors.company}</div>}
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label htmlFor="description" className="block text-lg font-medium mb-2">
                            Description <span>*</span>
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                            rows="4"
                        />
                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                    </div>

                    {/* Start Date */}
                    <div className="form-group">
                        <label htmlFor="startDate" className="block text-lg font-medium mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* End Date */}
                    <div className="form-group">
                        <label htmlFor="endDate" className="block text-lg font-medium mb-2">
                            End Date (or Present)
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        disabled={toggle}
                    >
                        {toggle ? <Loader /> : "Add Work Experience"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddWorkExperience;
