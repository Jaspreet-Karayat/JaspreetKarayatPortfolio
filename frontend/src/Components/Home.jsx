import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const API = 'https://jaspreetkarayatportfolio-backend.onrender.com'
                const response = await axios.get(`${API}/api/home/getDataHome`);
                setUser(response.data || {});
            } catch (error) {
                setUser({});
            }
        };

        fetchUser();
    }, []);

    const { header = "Loading...", content = "", introSection = "Loading...", image = "" } = user;

    return (
        <>
            <Header />
            <div
                id="home"
                className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white min-h-screen flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-32"
            >
                {/* Profile Image */}
                <div className="w-64 h-64 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg mb-8 md:mb-0 order-1 md:order-2">
                    {image ? (
                        <img
                            src={image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white">
                            No Image
                        </div>
                    )}
                </div>

                {/* Header and Content */}
                <div className="text-center max-w-xl space-y-6 order-2 md:order-1">
                    <h1 className="text-2xl md:text-6xl font-bold font-noto">{header}</h1>
                    <p className="text-center text-lg md:text-xl font-nunito">{content}</p>
                </div>
            </div>

            {/* Intro Section */}
            <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white home-sm-p2 px-8 md:px-20 flex flex-col items-center">
                <h1 className="text-xl md:text-2xl lg:text-3xl uppercase tracking-wide text-center mb-8 font-bold font-noto">
                    Intro
                </h1>
                <p className="text-base md:text-lg lg:text-xl max-w-3xl text-justify leading-relaxed font-nunito">
                    {introSection}
                </p>
            </div>

            <Footer />
        </>
    );
};

export default Home;
