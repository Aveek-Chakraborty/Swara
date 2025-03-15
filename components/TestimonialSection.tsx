import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

 

  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent of 8th Grader",
      content: "The personalized attention my daughter receives has transformed her confidence in academics. The teachers truly understand how to work with her ADHD and build on her strengths.",
      stars:2
    },
    {
      name: "Michael Thompson",
      role: "Parent of 5th Grader",
      content: "We've tried several schools before finding this one. The difference is night and day. My son is excited about learning for the first time, and the support for executive functioning challenges is exceptional.",
      stars:5
    },
    {
      name: "Emily Rodriguez",
      role: "Former Student",
      content: "As someone who struggled with attention issues throughout my education, I can say this school changed my life. The strategies I learned here carried me through high school and college successfully.",
      stars:3
    }
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 font-medium text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What Our <span className="text-orange-400">Families</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from parents and students about their transformative experiences at our school.
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-orange-100 transition-colors hidden md:block text-orange-500"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-orange-100 transition-colors hidden md:block text-orange-500"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <div className="overflow-hidden">
            <motion.div
              className="flex transition-all duration-500 ease-in-out"
              animate={{ x: `-${activeTestimonial * 100}%` }}
              transition={{ duration: 0.5 }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div 
                    className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border-l-8 border-green-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="p-8 md:p-10">
                      <div className="flex items-center mb-6">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-xl font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-xl font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-green-600">{testimonial.role}</p>
                        </div>
                        <div className="ml-auto">
                          <svg className="w-10 h-10 text-orange-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 p-6 rounded-xl mb-6">
                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic">
                          "{testimonial.content}"
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex">
                          {[...Array(testimonial.stars)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <span className="h-1 w-24 bg-gradient-to-r from-green-500 to-orange-500 rounded-full"></span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-10 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-12 h-2 rounded-full transition-colors ${
                  activeTestimonial === index 
                    ? 'bg-gradient-to-r from-green-500 to-orange-500' 
                    : 'bg-gray-200'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;