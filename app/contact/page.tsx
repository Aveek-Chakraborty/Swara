'use client'

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import React, { useState, ChangeEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

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
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
            <Navbar />
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -z-10 opacity-10 overflow-hidden">
                <svg width="400" height="400" viewBox="0 0 200 200">
                    <path fill="#3B82F6" d="M37.5,-52.1C48.4,-44.4,56.8,-32.5,62.8,-18.4C68.7,-4.3,72.2,12,67.1,24.8C62,37.7,48.4,47.2,34.7,52.6C21,58,7.1,59.2,-8.8,60.1C-24.7,60.9,-42.6,61.5,-51.6,52.7C-60.7,43.9,-60.9,25.8,-62.1,8.4C-63.2,-9,-65.3,-25.6,-58.9,-38C-52.4,-50.4,-37.5,-58.6,-23.3,-64.4C-9,-70.3,4.4,-73.9,16.2,-69.5C28,-65.1,38.2,-52.8,42.8,-45.8L45,-36.5L46.5,-23L50.4,-2.4L45.4,8.7Z" transform="translate(100 100)" />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 -z-10 opacity-10 overflow-hidden">
                <svg width="300" height="300" viewBox="0 0 200 200">
                    <path fill="#3B82F6" d="M40.8,-65.8C54.8,-58.8,69.2,-51.1,75.5,-39C81.8,-26.8,80,-10.2,76.2,4.8C72.3,19.7,66.5,33,57.6,44.3C48.7,55.7,36.8,65.2,23.2,70.9C9.5,76.6,-5.9,78.7,-20.9,75.6C-35.9,72.5,-50.6,64.4,-60.9,52.3C-71.2,40.2,-77.1,24.2,-79.2,7.8C-81.3,-8.7,-79.7,-25.5,-72.1,-38.7C-64.5,-51.9,-51,-61.5,-37.5,-68.6C-24,-75.6,-10.5,-80.2,1.5,-82.6C13.5,-85,27,-81.2,40.8,-72.1L40.7,-65.9L40.8,-65.8Z" transform="translate(100 100)" />
                </svg>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                    <div className="p-8 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8">Share your thoughts with us</h1>
                            
                            <div className="space-y-6">
                                <motion.div 
                                    className="mb-4"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                >
                                    <label htmlFor="name" className="text-sm font-medium text-blue-700 block mb-2">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-blue-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                        placeholder="Your name"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                </motion.div>
                                
                                <motion.div 
                                    className="mb-4"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                >
                                    <label htmlFor="email" className="text-sm font-medium text-blue-700 block mb-2">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-blue-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                </motion.div>
                                
                                <motion.div 
                                    className="mb-4"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                >
                                    <label htmlFor="mobile" className="text-sm font-medium text-blue-700 block mb-2">Mobile:</label>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 border ${errors.mobile ? 'border-red-500' : 'border-blue-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                        placeholder="Your phone number"
                                    />
                                    {errors.mobile && <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>}
                                </motion.div>
                                
                                <motion.div 
                                    className="mb-6"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 }}
                                >
                                    <label htmlFor="message" className="text-sm font-medium text-blue-700 block mb-2">Message:</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-blue-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                        rows={6}
                                        placeholder="Type your message here..."
                                    />
                                    {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                                </motion.div>
                                
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.7 }}
                                >
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className={`w-full ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02]`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                                                <span>Sending...</span>
                                            </div>
                                        ) : 'Send Message'}
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                    
                    <div className="bg-blue-50 px-8 py-6 border-t border-blue-100">
                        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-blue-600">
                            <div className="mb-4 md:mb-0">We'll respond to your message as soon as possible</div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Your information is secure with us</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <ToastContainer position="bottom-right" />
            <Footer />
        </div>
    );
};

export default ContactForm;