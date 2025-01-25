import React from "react";

const Footer = () => {
    return (
        <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-5">
            <div className="my-2 border-t-[1px] border-slate-700 w-9/10 mx-auto text-center text-sm pt-6">
                &copy; {new Date().getFullYear()} Jaspreet Karayat. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;
