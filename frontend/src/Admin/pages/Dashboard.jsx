import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState('Loading...');

    useEffect(() => {
        // Function to fetch user data
        const fetchUserData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.get('http://localhost:3030/api/dashboard/getData', {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: token,
                    },
                });
                setUser(response.data.name);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser('Admin');
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 pt-64">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Welcome, {user}
                </h1>
                <p className="text-lg text-gray-600 text-center">
                    We're glad to have you back. Here you can update your Portfolio.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
