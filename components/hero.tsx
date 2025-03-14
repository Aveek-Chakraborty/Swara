'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import footer from './footer';
import Footer from './footer';
import ImageCarousel from './Corousel';
import { Instagram, Linkedin, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';

// Types
type Instructor = {
  id: number;
  LIlink: string;
  Ilink: string;
  name: string;
  role: string;
  image: string;
  bio: string;
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const HeroSection = () => {
  // State for active testimonial and FAQ
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // Sample data
  const instructors: Instructor[] = [
    {
      id: 1,
      LIlink: "https://www.linkedin.com/in/s-varun-swaroop-07349b335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      Ilink:"https://www.instagram.com/svarunswaroop/profilecard/?igsh=Zjc4YnRxdmc5eHlw",
      name: "S Varun Swaroop",
      role: "Building an Inclusive Learning Space - SWARA | Alternative Educator | NIOS | ADHD",
      image: "/Varun.jpg",
      bio: "Varun is an experienced educator with over five years of expertise in supporting children with diverse learning needs, including ADHD, Autism, and Down Syndrome. Passionate about inclusive education, he specializes in tailored tutoring, engaging curriculum design with an NIOS focus, and confidence-building strategies. Beyond teaching, Varun is a skilled graphic designer and content creator, bringing creativity to every learning experience. Dedicated to making education accessible and empowering for all students, he thrives on fostering meaningful connections and innovative learning solutions."
    },
    {
      id: 2,
      LIlink: "https://www.linkedin.com/in/jhunudebnath24?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      Ilink: "https://www.instagram.com/_eternal._.flame_/",
      name: "Jhunu Debnath  ",
      role: "Marketing Executive | Artist | Art Therapy Practitioner",
      image: "/Junu.jpeg",
      bio: "Jhunu is a dynamic Marketing Executive, Artist, and Art Therapy Practitioner with a passion for blending creativity with impactful communication. As a Marketing Executive, she specializes in crafting compelling strategies that enhance brand visibility and engagement. Her artistic expertise fuels her ability to create visually captivating content, while her background in art therapy allows her to use creative expression as a tool for emotional well-being and personal growth. Committed to fostering meaningful connections, Jhunu integrates her diverse skill set to inspire, heal, and drive innovative initiatives across various platforms."
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rebecca Martinez",
      role: "Parent",
      content: "For the first time, my son feels understood at school. The teachers here don't just accommodate his ADHD—they celebrate his unique way of thinking and help him channel his energy in positive ways.",
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "David Thompson",
      role: "Former Student",
      content: "I graduated last year and am now thriving in college. The skills I learned here—especially how to work with my ADHD rather than against it—have been invaluable for my academic success.",
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Sophia Lee",
      role: "Parent",
      content: "The difference in my daughter's confidence after just one semester was remarkable. The individualized attention and understanding approach has transformed her relationship with learning.",
      image: "/api/placeholder/100/100"
    }
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How does your school accommodate students with ADHD?",
      answer: "Our classrooms feature flexible seating arrangements, movement breaks, and multisensory learning approaches. Teachers receive specialized training in ADHD-friendly instructional methods, and we offer executive functioning coaching and organizational support."
    },
    {
      id: 2,
      question: "What is the student-to-teacher ratio?",
      answer: "We maintain a low student-to-teacher ratio of 12:1, with additional support staff available. This ensures each student receives individualized attention and support tailored to their specific learning needs."
    },
    {
      id: 3,
      question: "Do you offer after-school programs?",
      answer: "Yes, we provide structured after-school activities including homework support, creative arts, sports, and special interest clubs designed to accommodate diverse learning styles and needs."
    },
    {
      id: 4,
      question: "How do you handle behavioral challenges?",
      answer: "We use a positive behavioral support framework focused on understanding triggers and teaching self-regulation skills. Our approach emphasizes collaboration between students, teachers, and families to develop effective strategies."
    },
    {
      id: 5,
      question: "What specialized training do your teachers receive?",
      answer: "All our educators complete comprehensive training in inclusive education practices, neurodiversity, differentiated instruction, and specific learning accommodations. They participate in ongoing professional development to stay current with best practices."
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Toggle FAQ
  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-24">
          <div className="flex mt-11 flex-row flex-wrap items-center justify-between">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-600 font-medium text-lg">Welcome to Our School</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-2 mb-6">
                Education Tailored for <span className="text-blue-600">Every Child</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-xl">
                Empowering diverse learners through inclusive education, tailored for every child's unique journey.
                We specialize in supporting students with ADHD and other learning differences.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Visit
                </motion.button>
                <motion.button
                  className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium shadow-sm transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ImageCarousel />

            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -z-10 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <path fill="#3B82F6" d="M37.5,-52.1C48.4,-44.4,56.8,-32.5,62.8,-18.4C68.7,-4.3,72.2,12,67.1,24.8C62,37.7,48.4,47.2,34.7,52.6C21,58,7.1,59.2,-8.8,60.1C-24.7,60.9,-42.6,61.5,-51.6,52.7C-60.7,43.9,-60.9,25.8,-62.1,8.4C-63.2,-9,-65.3,-25.6,-58.9,-38C-52.4,-50.4,-37.5,-58.6,-23.3,-64.4C-9,-70.3,4.4,-73.9,16.2,-69.5C28,-65.1,38.2,-52.8,42.8,-45.8L45,-36.5L46.5,-23L50.4,-2.4L45.4,8.7Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 opacity-10">
          <svg width="300" height="300" viewBox="0 0 200 200">
            <path fill="#3B82F6" d="M40.8,-65.8C54.8,-58.8,69.2,-51.1,75.5,-39C81.8,-26.8,80,-10.2,76.2,4.8C72.3,19.7,66.5,33,57.6,44.3C48.7,55.7,36.8,65.2,23.2,70.9C9.5,76.6,-5.9,78.7,-20.9,75.6C-35.9,72.5,-50.6,64.4,-60.9,52.3C-71.2,40.2,-77.1,24.2,-79.2,7.8C-81.3,-8.7,-79.7,-25.5,-72.1,-38.7C-64.5,-51.9,-51,-61.5,-37.5,-68.6C-24,-75.6,-10.5,-80.2,1.5,-82.6C13.5,-85,27,-81.2,40.8,-72.1L40.7,-65.9L40.8,-65.8Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our approach combines evidence-based strategies with personalized attention to help every student succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Learning Plans",
                description: "Each student receives a customized educational plan designed to meet their specific learning needs and build on their strengths.",
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                  </svg>
                )
              },
              {
                title: "ADHD-Friendly Environment",
                description: "Our classrooms are designed with the needs of students with ADHD in mind, featuring flexible seating, movement opportunities, and minimal distractions.",
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd"></path>
                  </svg>
                )
              },
              {
                title: "Specialized Staff",
                description: "Our educators are extensively trained in supporting students with diverse learning needs, including ADHD, dyslexia, and other learning differences.",
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                )
              },
              {
                title: "Small Class Sizes",
                description: "With a maximum of 12 students per class, we ensure that each child receives the individual attention they need to thrive.",
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                  </svg>
                )
              },
              {
                title: "Executive Function Support",
                description: "We teach organization, time management, and study skills that help students manage their ADHD symptoms and succeed academically.",
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                )
              },
              {
                title: "Strength-Based Approach",
                description: "We focus on identifying and nurturing each student's unique strengths and interests, building confidence and motivation.",
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path>
                  </svg>
                )
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect with Community Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Connect with Our Community</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our supportive network of parents, educators, and professionals dedicated to helping students with ADHD and diverse learning needs succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Parent Support Group",
                description: "Connect with other parents facing similar challenges and share experiences and strategies.",
                icon: "👨‍👩‍👧‍👦",
                link: "Learn More"
              },
              {
                title: "Educational Workshops",
                description: "Attend regular workshops on topics related to ADHD, executive functioning, and supporting your child's education.",
                icon: "🎓",
                link: "View Schedule"
              },
              {
                title: "Volunteer Opportunities",
                description: "Contribute your skills and time to enhance our school community and support our students.",
                icon: "🤝",
                link: "Get Involved"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    {card.link} →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Families Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from parents and students about their experiences at our school.
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-all duration-500 ease-in-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: `-${activeTestimonial * 100}%` }}
                transition={{ duration: 0.5 }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="max-w-3xl mx-auto m-4 bg-white rounded-xl shadow-lg p-8 md:p-10">
                      <div className="flex items-center mb-6">
                        <div className="flex-shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={56}
                            height={56}
                            className="rounded-full"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-xl font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg italic">"{testimonial.content}"</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${activeTestimonial === index ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Instructors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Instructors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of educators specializes in supporting students with diverse learning needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {instructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative h-64">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <div className='flex gap-3 items-center'>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{instructor.name}</h3>
                  <p >
                    <Link href={instructor.LIlink}><button className='text-blue-600 cursor-pointer'><Linkedin /></button></Link>
                  </p>
                  <p >
                    <Link href={instructor.Ilink}><button className='text-pink-600 cursor-pointer'><Instagram/></button></Link>
                  </p>
                  </div>
                  <p className="text-blue-600 mb-3">{instructor.role}</p>
                  <p className="text-gray-600">{instructor.bio}</p>

                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our approach and programs.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                className="mb-4 border-b border-gray-200 pb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${activeFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                {activeFAQ === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-gray-600"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
          <svg className="absolute bottom-0 right-0" width="400" height="400" viewBox="0 0 200 200">
            <path fill="rgba(255,255,255,0.1)" d="M40,120 C70,140 100,80 140,100 C180,120 180,180 120,160 C60,140 10,100 40,120 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Get in <span className="relative inline-block">
                Touch
                <span className="absolute bottom-0 left-1 w-full h-2 bg-blue-300 opacity-50 rounded"></span>
              </span>
            </h2>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto">
              We'd love to hear from you. Contact us to learn more about our programs or to schedule a visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-blue-500 p-3">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center">Location</h3>
              <p className="text-blue-100 text-center mt-2">123 Education Lane, Anytown, USA 12345</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-blue-500 p-3">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center">Phone</h3>
              <p className="text-blue-100 text-center mt-2">(555) 123-4567</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-blue-500 p-3">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center">Email</h3>
              <p className="text-blue-100 text-center mt-2">info@inclusiveschool.edu</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-blue-500 p-3">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center">Hours</h3>
              <p className="text-blue-100 text-center mt-2">Monday - Friday: 8:00 AM - 4:00 PM</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Have questions or want to schedule a visit? We're here to help you every step of the way.
            </p>

            <motion.a
              href="/contact"
              className="inline-block bg-white text-blue-700 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center">
                Contact Us
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </motion.a>

            <div className="mt-12 flex justify-center space-x-6">
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HeroSection;