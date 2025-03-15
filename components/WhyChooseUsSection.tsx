import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUsSection = () => {
  const features = [
    {
      title: "Personalized Learning Plans",
      description: "Each student receives a customized educational plan designed to meet their specific learning needs and build on their strengths.",
      icon: (
        <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
        </svg>
      ),
      color: "orange"
    },
    {
      title: "ADHD-Friendly Environment",
      description: "Our classrooms are designed with the needs of students with ADHD in mind, featuring flexible seating, movement opportunities, and minimal distractions.",
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd"></path>
        </svg>
      ),
      color: "green"
    },
    {
      title: "Specialized Staff",
      description: "Our educators are extensively trained in supporting students with diverse learning needs, including ADHD, dyslexia, and other learning differences.",
      icon: (
        <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
        </svg>
      ),
      color: "orange"
    },
    {
      title: "Small Class Sizes",
      description: "With a maximum of 12 students per class, we ensure that each child receives the individual attention they need to thrive.",
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
        </svg>
      ),
      color: "green"
    },
    {
      title: "Executive Function Support",
      description: "We teach organization, time management, and study skills that help students manage their ADHD symptoms and succeed academically.",
      icon: (
        <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
        </svg>
      ),
      color: "orange"
    },
    {
      title: "Strength-Based Approach",
      description: "We focus on identifying and nurturing each student's unique strengths and interests, building confidence and motivation.",
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path>
        </svg>
      ),
      color: "green"
    }
  ];

  return (
    <section className="pt-24 bg-gradient-to-b from-white-50 to-orange-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* <span className="text-orange-400 font-medium text-lg mb-2 block">OUR APPROACH</span> */}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose <span className="text-orange-400">Us</span>?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our approach combines evidence-based strategies with personalized attention to help every student succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`relative h-32 bg-${feature.color}-50 flex items-center justify-center`}>
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-50 opacity-60`} />
                <div className="relative z-10">
                  {feature.icon}
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <h3 className={`text-xl font-bold text-gray-900 mb-3 text-${feature.color}-700`}>{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;