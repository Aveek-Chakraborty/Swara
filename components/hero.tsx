'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from './footer';
import ImageCarousel from './Corousel';
import Link from 'next/link';
import CommunitySection from './CommunitySection';
import TestimonialsSection from './TestimonialSection';
import InstructorsSection from './InstructorSection';
import WhyChooseUsSection from './WhyChooseUsSection';
import ContactSection from './ContactSection';
import FAQSection from './FaqSection';



const HeroSection = () => {

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white overflow-hidden">
        {/* Decorative elements with improved positioning and styling */}
        <div className="absolute top-0 right-0 -z-10 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <svg width="600" height="600" viewBox="0 0 200 200">
            <path fill="#22c55e" d="M37.5,-52.1C48.4,-44.4,56.8,-32.5,62.8,-18.4C68.7,-4.3,72.2,12,67.1,24.8C62,37.7,48.4,47.2,34.7,52.6C21,58,7.1,59.2,-8.8,60.1C-24.7,60.9,-42.6,61.5,-51.6,52.7C-60.7,43.9,-60.9,25.8,-62.1,8.4C-63.2,-9,-65.3,-25.6,-58.9,-38C-52.4,-50.4,-37.5,-58.6,-23.3,-64.4C-9,-70.3,4.4,-73.9,16.2,-69.5C28,-65.1,38.2,-52.8,42.8,-45.8L45,-36.5L46.5,-23L50.4,-2.4L45.4,8.7Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 opacity-10 transform -translate-x-1/4 translate-y-1/4">
          <svg width="500" height="500" viewBox="0 0 200 200">
            <path fill="#fb923c" d="M40.8,-65.8C54.8,-58.8,69.2,-51.1,75.5,-39C81.8,-26.8,80,-10.2,76.2,4.8C72.3,19.7,66.5,33,57.6,44.3C48.7,55.7,36.8,65.2,23.2,70.9C9.5,76.6,-5.9,78.7,-20.9,75.6C-35.9,72.5,-50.6,64.4,-60.9,52.3C-71.2,40.2,-77.1,24.2,-79.2,7.8C-81.3,-8.7,-79.7,-25.5,-72.1,-38.7C-64.5,-51.9,-51,-61.5,-37.5,-68.6C-24,-75.6,-10.5,-80.2,1.5,-82.6C13.5,-85,27,-81.2,40.8,-72.1L40.7,-65.9L40.8,-65.8Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-28">
          <div className="flex mt-8 flex-row flex-wrap items-center justify-between">
            {/* Left Content Column */}
            <motion.div
              className="md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-1 md:mb-2 px-4 py-1 bg-orange-100 rounded-full">
                <span className="text-orange-500 font-semibold text-sm tracking-wide">Welcome to <span className="text-gray-800 font-medium">Swara</span></span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                Education Tailored for <span className="text-green-600 relative">
                  Every Child
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-green-100 -z-10 transform -rotate-1"></span>
                </span>
              </h1>

              <p className="text-lg text-gray-700 mb-8 max-w-xl leading-relaxed">
                Empowering diverse learners through inclusive education, tailored for every child's unique journey. We specialize in supporting students with ADHD and other learning differences.
              </p>

              <div className="flex gap-4">
                <Link href={'/contact'}>
                  <motion.button
                    className="bg-green-600 hover:bg-green-700 text-white px-8  py-1 md:py-3 rounded-lg font-medium shadow-lg transition-all flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule a Visit
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </Link>

                <Link href={'/about'}>
                <motion.button
                  className="bg-white text-orange-500 border-2 border-orange-400 px-8 md:py-3 rounded-lg font-medium shadow-sm transition-all flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Image Carousel */}
            <motion.div
              className="w-full md:w-1/2 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl">
                <ImageCarousel />
                <div className="absolute -bottom-6 -right-3 md:-right-4 bg-orange-400 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
                  A Space for All
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Connect with Community Section */}
      <CommunitySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Meet Our Instructors Section */}
      <InstructorsSection />

      {/* FAQ Section */}
      <FAQSection/>

      {/* Get in Touch Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HeroSection;