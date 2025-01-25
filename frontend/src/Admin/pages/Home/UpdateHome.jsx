import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sweet from 'sweetalert2';
import Loader from '../../../Components/Loader';

const HomePage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [header, setHeader] = useState('No Header');
    const [paragraph, setParagraph] = useState('No Content');
    const [introSection, setIntroSection] = useState('No Intro Content');
    const [previewUrl, setPreviewUrl] = useState('');
    const [errors, setErrors] = useState({});
    const [imageErrors, setImageErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const API = 'https://jaspreetkarayatportfolio-backend.onrender.com';

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

    const handleImageSubmit = () => {
        const newImageErrors = {};
        if (!selectedImage) newImageErrors.image = 'Please select an image first.';
        setImageErrors(newImageErrors);
        return Object.keys(newImageErrors).length === 0;
    };

    const handleHomeSubmit = () => {
        const newErrors = {};
        if (!header) newErrors.header = 'Header is required';
        if (!paragraph) newErrors.paragraph = 'Paragraph is required';
        if (!introSection) newErrors.introSection = 'Intro Section is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.get(`${API}/api/home/previewHome`, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token,
                    },
                });
                const data = response.data;
                setPreviewUrl(data.image || '');
                setHeader(data.header || 'No Header');
                setParagraph(data.content || 'No Content');
                setIntroSection(data.introSection || 'No Intro Content');
            } catch (err) {
                console.error('Error fetching home data:', err);
            }
        };
        fetchHomeData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isHomeDataValid = handleHomeSubmit();
        const isImageValid = handleImageSubmit();

        if (isHomeDataValid && isImageValid) {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('header', header);
            formData.append('content', paragraph);
            formData.append('introSection', introSection);
            if (selectedImage) formData.append('image', selectedImage);

            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.post(`${API}/api/home/updateHome`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: token,
                    },
                });

                setIsSubmitting(false);

                if (response.status === 200) {
                    ToastGood.fire({
                        icon: "success",
                        title: "Home updated successfully"
                    });
                    setHeader('');
                    setParagraph('');
                    setIntroSection('');
                    setSelectedImage(null);
                    setPreviewUrl('');
                } else {
                    ToastBad.fire({
                        icon: "error",
                        title: "Check your internet connection"
                    });
                }
            } catch (err) {
                setIsSubmitting(false);
                ToastBad.fire({
                    icon: "error",
                    title: "There was an error updating the data."
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-36 pb-14">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg space-y-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Update Home</h1>

                {/* Image Preview */}
                <div className="text-center">
                    {previewUrl && previewUrl.startsWith('http') ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="mx-auto  rounded-full w-32 h-32 object-cover"
                        />
                    ) : (
                        <div className="w-32 h-32 bg-gray-500 rounded-full flex items-center justify-center text-white mx-auto">
                            No Image
                        </div>
                    )}
                </div>

                {/* File Input for Image Selection */}
                <div className="form-group">
                    <label htmlFor="image" className="block text-lg font-medium mb-2">
                        Select an image <span>*</span>
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setSelectedImage(file);
                                setPreviewUrl(URL.createObjectURL(file));
                                setImageErrors({});
                            }
                        }}
                    />
                    {imageErrors.image && <div className="text-red-500 text-sm mt-1">{imageErrors.image}</div>}
                </div>

                {/* Home Data Form */}
                <div>
                    <div className="w-full space-y-6">
                        {/* Header Field */}
                        <div className="form-group">
                            <label htmlFor="header" className="block text-lg font-medium mb-2">
                                Header Content <span>*</span>
                            </label>
                            <input
                                type="text"
                                id="header"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={header}
                                onChange={(e) => setHeader(e.target.value)}
                            />
                            {errors.header && <div className="text-red-500 text-sm mt-1">{errors.header}</div>}
                        </div>

                        {/* Paragraph Field */}
                        <div className="form-group">
                            <label htmlFor="paragraph" className="block text-lg font-medium mb-2">
                                Paragraph Content <span>*</span>
                            </label>
                            <textarea
                                id="paragraph"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={paragraph}
                                onChange={(e) => setParagraph(e.target.value)}
                            />
                            {errors.paragraph && <div className="text-red-500 text-sm mt-1">{errors.paragraph}</div>}
                        </div>

                        {/* IntroSection Field */}
                        <div className="form-group">
                            <label htmlFor="introSection" className="block text-lg font-medium mb-2">
                                Intro Section Content <span>*</span>
                            </label>
                            <textarea
                                id="introSection"
                                className="w-full h-40 px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={introSection}
                                onChange={(e) => setIntroSection(e.target.value)}
                            />
                            {errors.introSection && <div className="text-red-500 text-sm mt-1">{errors.introSection}</div>}
                        </div>
                    </div>
                </div>

                {/* Single Update Button */}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <Loader /> : 'Update'}
                </button>
            </div>
        </div>
    );
};

export default HomePage;
