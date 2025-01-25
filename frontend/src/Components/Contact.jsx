import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import Sweet from 'sweetalert2';
import Loader from './Loader';
import Header from "./Header";
import Footer from "./Footer";


const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
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

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};
        // Name validation
        if (!name) {
            newErrors.name = "Name is required";
        }

        // Email validation
        if (!email) {
            newErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email address is invalid";
        }

        // Message validation
        if (!message) {
            newErrors.message = "Tell me about yourself.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const contact = async () => {
        setToggle(true);
        try {
            const API = 'https://jaspreetkarayatportfolio-backend.onrender.com'
            const result = await axios.post(`${API}/api/contact/contactEmail`,
                { name, email, message, },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            if (result.status === 200) {
                ToastGood.fire({
                    icon: "success",
                    title: "Mail Send successfully"
                });
                setName("");
                setEmail("");
                setMessage("");
            }
            else {
                ToastBad.fire({
                    icon: "error",
                    title: "Check your internet connection"
                });
            }
        } catch (err) {
            console.error(err);
            ToastBad.fire({
                icon: "error",
                title: "Failed to send the message. Please try again later."
            });
        } finally {
            setToggle(false);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            contact();
        }
    };


    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-20 px-6 pt-24 font-sans">
                <h1 className="text-3xl p-5 font-bold text-center">Contact Me</h1>
                <p className="text-md flex justify-center mb-6 text-center items-center">
                    Have any questions? Fill out the form and I’ll get you a response soon!
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
                >
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-lg">Name<span>*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-lg">Email<span>*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-lg">Message<span>*</span></label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        {errors.message && <div className="text-red-500 text-sm">{errors.message}</div>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        disabled={toggle}
                    >
                        {toggle ? <Loader /> : "Submit"}
                    </button>

                </form>

                <div className="mt-20 text-center">
                    <p className="text-2xl text-white ">&</p>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-2xl flex justify-center items-center space-x-2">
                        <FaEnvelope className="text-xl md:text-2xl" />
                        <span>Email</span>
                    </p>
                    <p className="text-lg text-blue-500">jaspreetkarayat5@gmail.com</p>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Contact;
