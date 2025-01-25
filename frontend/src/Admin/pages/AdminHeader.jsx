import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const AdminHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            // Check if the click was outside the menu or the hamburger button
            if (!e.target.closest('#mobile-menu') && !e.target.closest('#hamburger-button')) {
                setIsMobileMenuOpen(false);
            }
        };
        // Add event listener to detect click outside
        document.addEventListener('mousedown', handleClickOutside);
        // Clean up the event listener when the component is removed
        // return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <>
            {/* Header Section */}
            <header className="bg-gradient-to-r bg-gray-800 text-white py-6 px-6 md:px-10 flex justify-between items-center fixed top-0 w-full z-50 border-b-[1px] border-slate-700">
                {/* Logo */}
                <h1 className="text-2xl font-bold">Jaspreet Karayat</h1>

                {/* Desktop Navigation */}
                <div className="flex items-center space-x-8">
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/" className="relative after:absolute after:left-0 after:bottom-0 after:h-[1.2px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">Home</Link>
                        <Link to="/projects" className="relative after:absolute after:left-0 after:bottom-0 after:h-[1.2px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">Projects</Link>
                        <Link to="/resume" className="relative after:absolute after:left-0 after:bottom-0 after:h-[1.2px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">Resume</Link>
                        <Link to="/contact" className="relative after:absolute after:left-0 after:bottom-0 after:h-[1.2px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">Contact</Link>
                    </nav>

                    {/* Social Media Icons (Hidden on medium screen and visible on large screen) */}
                    <div className="hidden md:hidden lg:flex space-x-4">
                        <a href="mailto:jasreetkarayat5@gmail.com" aria-label="Email" className="hover:text-gray-300">
                            <FaEnvelope size={24} />
                        </a>
                        <a href="https://www.instagram.com/jaspreet_karayat/" aria-label="Instagram" className="hover:text-gray-300">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/jaspreet-karayat-361b80309/" aria-label="LinkedIn" className="hover:text-gray-300">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://github.com/Jaspreet-Karayat" aria-label="GitHub" className="hover:text-gray-300">
                            <FaGithub size={24} />
                        </a>
                    </div>
                </div>

                {/* Hamburger Menu for Mobile */}
                <button
                    id="hamburger-button"
                    className="md:hidden text-2xl"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    &#9776;
                </button>
            </header>



            {/* Mobile Menu Section */}
            {isMobileMenuOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40">
                    <nav id="mobile-menu" className="absolute top-16 left-0 w-full bg-gray-800 text-white py-6 px-6 flex flex-col items-center justify-center space-y-6">
                        <Link
                            to="/"
                            className="relative after:absolute after:left-0 after:bottom-0 after:h-[1.2px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                            onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
                        >
                            Home
                        </Link>
                        <Link
                            to="/projects"
                            className="relative after:absolute after:left-0 after:bottom-0 after:h-[1.2px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                            onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
                        >
                            Projects
                        </Link>
                        <Link
                            to="/resume"
                            className="relative after:absolute after:left-0 after:bottom-0 after:h-[1.2px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                            onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
                        >
                            Resume
                        </Link>
                        <Link
                            to="/contact"
                            className="relative after:absolute after:left-0 after:bottom-0 after:h-[1.2px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                            onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
                        >
                            Contact
                        </Link>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mt-6">
                            <a
                                href="mailto:jasreetkarayat5@gmail.com"
                                aria-label="Email"
                                className="hover:text-gray-300"
                                onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
                            >
                                <FaEnvelope size={24} />
                            </a>
                            <a
                                href="https://www.instagram.com/jaspreet_karayat/"
                                aria-label="Instagram"
                                className="hover:text-gray-300"
                                onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
                            >
                                <FaInstagram size={24} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/jaspreet-karayat-361b80309/"
                                aria-label="LinkedIn"
                                className="hover:text-gray-300"
                                onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href="https://github.com/Jaspreet-Karayat"
                                aria-label="GitHub"
                                className="hover:text-gray-300"
                                onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
                            >
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
};

export default AdminHeader;
