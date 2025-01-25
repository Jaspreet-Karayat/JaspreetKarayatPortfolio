import React from 'react';

const PNF = () => {
    return (
        <div className="min-h-screen bg-gray-100 pt-64">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Page Not Found
                </h1>
                <p className="text-lg text-gray-600 text-center">
                    <a
                        href="/link"
                        className="text-blue-500 underline hover:text-blue-700 hover:underline-offset-2"
                    >
                        Back to Dashboard
                    </a>
                </p>
            </div>
        </div>
    );
};

export default PNF;
