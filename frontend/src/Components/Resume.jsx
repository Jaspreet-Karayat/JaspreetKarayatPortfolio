import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Resume = () => {
    const [cvUrl, setCvUrl] = useState(null);
    const [isEducationOpen, setIsEducationOpen] = useState(false);
    const [isWorkExperienceOpen, setIsWorkExperienceOpen] = useState(false);
    const [isSkillsOpen, setIsSkillsOpen] = useState(false);
    const [experiences, setExperiences] = useState([]);
    const [skill, setSkill] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Work Experiences and CV URL
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cvResponse, experiencesResponse, skillsResponse] = await Promise.all([
                    axios.get("http://localhost:3030/api/cv/getData"),
                    axios.get("http://localhost:3030/api/experience/getData"),
                    axios.get("http://localhost:3030/api/skills/getData")
                ]);

                setCvUrl(cvResponse.data.cvUrl);
                setExperiences(experiencesResponse.data);
                setSkill(skillsResponse.data);
                setError("");
            } catch (error) {
                console.error("Error fetching data:", error.response || error.message || error);
                setError("Failed to load data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (date) => {
        if (!date) return "Fresher";
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-6 px-6 md:px-20 pt-24 font-sans">
                <h1 className="text-3xl pt-5 font-bold mb-12 text-center">My Resume</h1>

                {/* Education Section */}
                <section>
                    <button
                        className="w-full text-left flex justify-between items-center bg-gray-800 px-6 py-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none"
                        onClick={() => setIsEducationOpen(!isEducationOpen)}
                    >
                        <h2 className="text-2xl font-semibold">Education</h2>
                        <span className="text-xl">
                            {isEducationOpen ? "⮙" : "⮛"}
                        </span>
                    </button>

                    {isEducationOpen && (
                        <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold">
                                    Sri Guru Gobind Singh College, Sector 26, Chandigarh <span className="text-lg">(PANJAB UNIVERSITY)</span>
                                </h3>
                                <p className="text-gray-300">
                                    Bachelor of Computer Applications (BCA), <span className="text-sm text-gray-300">May 2024</span>
                                </p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold">
                                    G.M.S.S.S Sector 23-A, Chandigarh <span className="text-lg">(CBSE BOARD)</span>
                                </h3>
                                <p className="text-gray-300">
                                    InterMediate (Electronics & Electrical Technology), <span className="text-sm text-gray-300">June 2021</span>
                                </p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold">
                                    G.M.S.S.S Sector 10-A, Chandigarh <span className="text-lg">(CBSE BOARD)</span>
                                </h3>
                                <p className="text-gray-300">
                                    High School,  <span className="text-sm text-gray-300">June 2019</span>
                                </p>
                            </div>
                        </div>
                    )}
                </section>

                {/* Work Experience Section */}
                <section className="mt-8">
                    <button
                        className="w-full text-left flex justify-between items-center bg-gray-800 px-6 py-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none"
                        onClick={() => setIsWorkExperienceOpen(!isWorkExperienceOpen)}
                    >
                        <h2 className="text-2xl font-semibold">Work Experience</h2>
                        <span className="text-xl">
                            {isWorkExperienceOpen ? "⮙" : "⮛"}
                        </span>
                    </button>

                    {isWorkExperienceOpen && (
                        <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow-md">
                            {loading ? (
                                <p className="text-gray-300">Loading...</p>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : experiences.length > 0 ? (
                                experiences.map((experience, index) => (
                                    <div className="mb-6" key={index}>
                                        <h3 className="text-xl font-semibold">Job - {experience.title}</h3>
                                        <h4 className="text-lg font-semibold">Company - {experience.company} </h4>
                                        <p className="text-gray-300">Description - {experience.description}</p>
                                        <p className="text-gray-300">{formatDate(experience.startDate)} to {formatDate(experience.endDate)}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-300">No work experiences found.</p>
                            )}
                        </div>
                    )}
                </section>

                {/* Skills Section */}
                <section className="mt-8">
                    <button
                        className="w-full text-left flex justify-between items-center bg-gray-800 px-6 py-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none"
                        onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                    >
                        <h2 className="text-2xl font-semibold">Skills</h2>
                        <span className="text-xl">
                            {isSkillsOpen ? "⮙" : "⮛"}
                        </span>
                    </button>

                    {isSkillsOpen && (
                        <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow-md">
                            {loading ? (
                                <p className="text-gray-300">Loading skills...</p>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : skill.length > 0 ? (
                                <ul className="list-disc pl-6">
                                    {skill.map((item) => (
                                        <li key={item._id}>
                                            <h3 className="text-xl font-semibold">{item.skillName}</h3> <h4 className="text-lg text-gray-300"> {item.description}</h4>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-300">No skills found.</p>
                            )}
                        </div>
                    )}
                </section>




                {/* Resume Link Section */}
                <div className="flex flex-col items-center mt-12">
                    <h1 className="text-2xl font-bold mb-2">Resume</h1>
                    {cvUrl ? (
                        <p className="text-lg">
                            Full CV and Information can be found{" "}
                            <a
                                href={cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline"
                            >
                                here.
                            </a>
                        </p>
                    ) : (
                        <p>Loading your CV...</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Resume;
