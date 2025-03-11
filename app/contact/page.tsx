'use client'

import Navbar from '@/components/navbar';
import React, { useState, ChangeEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    name: string;
    email: string;
    mobile: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
        if (!formData.message) newErrors.message = 'Message is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            setLoading(true);
            try {
                const response = await fetch("/api/messages", {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
                if (result.message === "Message sent successfully") {
                    toast.success("Message sent successfully!");
                    setLoading(false);
                } else if (result.message === "External server error") {
                    setLoading(false);
                    toast.error("Oh oh! Something went wrong. Try again");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                setLoading(false);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div>
            <Navbar/>
            
            <div className='grid place-items-center bg-gradient-to-bl min-h-screen h-auto from-[#a8e6cf]  to-[#fafafa]'>
                
                <div className="w-7xl p-8 md:p-40">
                <div className="mt-16 text-3xl text-green-800 md:text-5xl mb-5">Share your thoughts with us</div>
                    <div className="mb-4">
                        <label htmlFor="name" className="text-sm font-medium text-green-700 mb-1">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-green-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-sm font-medium text-green-700 mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-green-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobile" className=" text-sm font-medium text-green-700 mb-1">Mobile:</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border ${errors.mobile ? 'border-red-500' : 'border-green-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        />
                        {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className=" text-sm font-medium text-green-700 mb-1">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border ${errors.message ? 'border-red-500' : 'border-green-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                            rows={8}
                        />
                        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full ${loading ? 'bg-green-400' : 'bg-green-600'} text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors`}
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ContactForm;
