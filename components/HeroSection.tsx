import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ImageCarousel from './Corousel';

const EducationHero = () => {
  // Animation variants for consistent animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-10 transform rotate-12">
        <svg width="500" height="500" viewBox="0 0 200 200">
          <path fill="#22c55e" d="M37.5,-52.1C48.4,-44.4,56.8,-32.5,62.8,-18.4C68.7,-4.3,72.2,12,67.1,24.8C62,37.7,48.4,47.2,34.7,52.6C21,58,7.1,59.2,-8.8,60.1C-24.7,60.9,-42.6,61.5,-51.6,52.7C-60.7,43.9,-60.9,25.8,-62.1,8.4C-63.2,-9,-65.3,-25.6,-58.9,-38C-52.4,-50.4,-37.5,-58.6,-23.3,-64.4C-9,-70.3,4.4,-73.9,16.2,-69.5C28,-65.1,38.2,-52.8,42.8,-45.8L45,-36.5L46.5,-23L50.4,-2.4L45.4,8.7Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 opacity-10 transform -rotate-12">
        <svg width="400" height="400" viewBox="0 0 200 200">
          <path fill="#fb923c" d="M40.8,-65.8C54.8,-58.8,69.2,-51.1,75.5,-39C81.8,-26.8,80,-10.2,76.2,4.8C72.3,19.7,66.5,33,57.6,44.3C48.7,55.7,36.8,65.2,23.2,70.9C9.5,76.6,-5.9,78.7,-20.9,75.6C-35.9,72.5,-50.6,64.4,-60.9,52.3C-71.2,40.2,-77.1,24.2,-79.2,7.8C-81.3,-8.7,-79.7,-25.5,-72.1,-38.7C-64.5,-51.9,-51,-61.5,-37.5,-68.6C-24,-75.6,-10.5,-80.2,1.5,-82.6C13.5,-85,27,-81.2,40.8,-72.1L40.7,-65.9L40.8,-65.8Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left content area */}
          <motion.div
            className="md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-500 font-medium text-sm mb-4">
                Welcome to Our Space
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Education Tailored for <br />
                <span className="text-green-600 relative">
                  Every Child
                  <span className="absolute bottom-2 left-0 w-full h-1 bg-green-200 -z-10"></span>
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                Empowering diverse learners through inclusive education, tailored for 
                every child's unique journey. We specialize in supporting students 
                with ADHD and other learning differences.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link href="/contact">
                  <motion.button
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Schedule a Visit
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </Link>
                <motion.button
                  className="bg-white text-orange-500 border-2 border-orange-400 px-8 py-4 rounded-xl font-medium shadow-sm transition-all hover:bg-orange-50"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          {/* Right image area */}
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-orange-400/20 mix-blend-multiply z-10"></div>
              <ImageCarousel />
              
              {/* Floating stats card */}
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg z-20 max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Success Rate</p>
                    <p className="text-lg font-bold text-gray-900">95% Growth</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Features row */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
              title: "Personalized Learning",
              description: "Tailored education plans designed around each student's needs and strengths."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: "Expert Educators",
              description: "Specialized teachers trained in supporting diverse learning styles."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              ),
              title: "Inclusive Environment",
              description: "A supportive community that celebrates neurodiversity and individual growth."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationHero;