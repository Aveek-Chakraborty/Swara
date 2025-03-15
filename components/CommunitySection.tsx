import React from 'react';
import { motion } from 'framer-motion';

const CommunitySection = () => {
  const communityCards = [
    {
      title: "Parent Support Group",
      description: "Connect with other parents facing similar challenges and share experiences and strategies.",
      icon: "👨‍👩‍👧‍👦",
      link: "Learn More",
      bgColor: "bg-green-50"
    },
    {
      title: "Educational Workshops",
      description: "Attend regular workshops on topics related to ADHD, executive functioning, and supporting your child's education.",
      icon: "🎓",
      link: "View Schedule",
      bgColor: "bg-gray-50"
    },
    {
      title: "Volunteer Opportunities",
      description: "Contribute your skills and time to enhance our school community and support our students.",
      icon: "🤝",
      link: "Get Involved",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Connect with Our <span className="text-green-600">Community</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our supportive network of parents, educators, and professionals dedicated to helping students with ADHD and diverse learning needs succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {communityCards.map((card, index) => (
            <motion.div
              key={index}
              className={`${card.bgColor} rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="p-8">
                <div className="text-5xl mb-6 bg-white h-16 w-16 rounded-full flex items-center justify-center shadow-sm mx-auto">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                  {card.title}
                </h3>
                <p className="text-gray-700 mb-6 text-center leading-relaxed">
                  {card.description}
                </p>
                <div className="text-center">
                  <a 
                    href="#" 
                    className="inline-flex items-center px-5 py-3 bg-white rounded-full text-green-600 font-medium hover:bg-green-600 hover:text-white transition-colors duration-300 shadow-sm"
                  >
                    {card.link}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        
      </div>
    </section>
  );
};

export default CommunitySection;