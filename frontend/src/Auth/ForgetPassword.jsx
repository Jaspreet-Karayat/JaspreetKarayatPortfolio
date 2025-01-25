import React, { useEffect, useState } from "react";
import axios from "axios";
import Sweet from 'sweetalert2';
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
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
        if (!email) {
            newErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email address is invalid";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const userLogin = async () => {
        setToggle(true);
        try {
            const API = 'https://jaspreetkarayatportfolio-backend.onrender.com'
            let result = await axios.post(`${API}/api/reset/forgetPassword`,
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


            if (result.status === 200) {
                ToastGood.fire({
                    icon: "success",
                    title: "Reset Password link sent to your email."
                });
                navigate('/login');
            } else {
                ToastBad.fire({
                    icon: "error",
                    title: 'User not found.'
                });
            }
        } catch (err) {
            console.error(err);
            ToastBad.fire({
                icon: "error",
                title: "Something went wrong, please try again."
            });
        } finally {
            setToggle(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            userLogin();
        }
    };

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/link');
        }
    }, [navigate]);

    return (
        <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white min-h-screen flex items-center justify-center px-8 py-32">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
            >
                <h4 className="mb-4 text-2xl font-semibold">Forget Password</h4>

                <div className="form-group">
                    <label htmlFor="email" className="block text-lg font-medium mb-2">
                        Email address <span>*</span>
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    disabled={toggle}
                >
                    {toggle ? <Loader /> : "Send"}
                </button>
            </form>
        </div>
    );
};

export default ForgetPassword;
