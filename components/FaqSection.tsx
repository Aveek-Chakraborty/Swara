import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const FAQSection: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Do you offer one-on-one mentoring or customized learning plans?",
      answer: "Yes, we offer personalized mentoring and customized learning plans tailored to individual needs and goals."
    },
    {
      id: 2,
      question: "Are your sessions online, offline, or both?",
      answer: "We offer both online and offline sessions, depending on the service. Please refer to our services section for more details. "
    },
    {
      id: 3,
      question: "Do you offer trial sessions or discovery workshops before committing to a program?",
      answer: "Yes, we offer trial sessions and discovery workshops. Contact us for more information and to schedule a session."
    },
    {
      id: 4,
      question: "Does SWARA offer support for neurodivergent learners or those with learning difficulties?",
      answer: " Yes, we provide support for neurodivergent learners and those with learning difficulties, ensuring an inclusive and understanding learning environment."
    },
    {
      id: 5,
      question: "How do I stay updated on upcoming programs, workshops, or events at SWARA?",
      answer: "To stay updated on our upcoming programs, workshops, and events, follow us on our social media platforms for the latest information and announcements."
    }
  ];

  return (
    <section className=" py-16 md:py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 font-medium text-sm mb-4">
            Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked <span className='text-orange-400'>Questions</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our approach and programs.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="mb-6 border border-orange-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: faq.id * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full text-left p-5 bg-white hover:bg-orange-50 transition-colors duration-200"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={activeFAQ === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-orange-200 text-orange-500 transition-transform duration-300 ${activeFAQ === faq.id ? 'rotate-180 bg-orange-100' : ''}`}>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {activeFAQ === faq.id && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border-t border-orange-100"
                  >
                    <p className="p-5 text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;