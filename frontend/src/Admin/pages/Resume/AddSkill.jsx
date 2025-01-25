import React, { useState } from 'react';
import axios from 'axios';
import Sweet from "sweetalert2";
import Loader from '../../../Components/Loader';

const AddSkill = () => {
    const [skillName, setSkillName] = useState('');
    const [description, setDescription] = useState('');
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
        if (!skillName) newErrors.skillName = 'Skill name is required';
        if (!description) newErrors.description = 'Description is required';
        setErrors(newErrors);

        // If there are errors, prevent form submission
        if (Object.keys(newErrors).length > 0) return;

        // Set loading state and simulate successful submission
        setToggle(true);

        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const response = await axios.post('http://localhost:3030/api/skills/add', { skillName, description }, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                },
            });

            if (response) {
                ToastGood.fire({
                    icon: "success",
                    title: "Skill added successfully.",
                });
                // Reset form fields
                setSkillName('');
                setDescription('');
            } else {
                ToastBad.fire({
                    icon: "error",
                    title: "Something went wrong.",
                });
            }
        } catch (err) {
            ToastBad.fire({
                icon: "error",
                title: "An error occurred while adding the skill.",
            });
        } finally {
            setToggle(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-32 pb-12">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                    Add Skill
                </h1>
                <form onSubmit={handleSubmit} className="w-full space-y-6">

                    {/* Skill Name */}
                    <div className="form-group">
                        <label htmlFor="skillName" className="block text-lg font-medium mb-2">
                            Skill Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            id="skillName"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.skillName && <div className="text-red-500 text-sm mt-1">{errors.skillName}</div>}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        disabled={toggle}
                    >
                        {toggle ? <Loader /> : 'Add Skill'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddSkill;
