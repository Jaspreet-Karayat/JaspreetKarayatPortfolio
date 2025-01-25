import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Sweet from 'sweetalert2';
import Loader from '../Components/Loader';

const ResetPassword = () => {
    const { userId, token } = useParams();
    const [password, setPassword] = useState("");
    const [comPassword, setComPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

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

    const validateForm = () => {
        const newErrors = {};

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }
        if (!comPassword) {
            newErrors.comPassword = "Confirm Password is required";
        } else if (password !== comPassword) {
            newErrors.comPassword = "Confirm Password must be the same as Password";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setToggle(true);  // Start loading spinner
                const API = 'https://jaspreetkarayatportfolio-backend.onrender.com'
                const response = await axios.post(`${API}/api/reset/resetPassword`,
                    { userId, token, password },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    });

                if (response.status === 200) {
                    ToastGood.fire({
                        icon: "success",
                        title: "Password updated successfully."
                    });
                    navigate('/login');
                } else {
                    ToastBad.fire({
                        icon: "error",
                        title: 'Error in resetting password.'
                    });
                }
            } catch (error) {
                console.error(error);
                ToastBad.fire({
                    icon: "error",
                    title: "Failed to reset password. Please try again later."
                });
            } finally {
                setToggle(false);
            }
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white min-h-screen flex items-center justify-center px-8 py-32">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
            >
                <h4 className="mb-4 text-2xl font-semibold">Reset Password</h4>

                <div className="form-group">
                    <label htmlFor="password" className="block text-lg font-medium mb-2">
                        New Password <span>*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="block text-lg font-medium mb-2">
                        Confirm Password <span>*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm your password"
                        value={comPassword}
                        onChange={(e) => setComPassword(e.target.value)}
                    />
                    {errors.comPassword && <div className="text-red-500 text-sm mt-1">{errors.comPassword}</div>}
                </div>

                <button type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    disabled={toggle}
                >
                    {toggle ? <Loader /> : "Reset"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;  // Ensure this is at the bottom
