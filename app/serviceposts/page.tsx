'use client';
import Navbar from '@/components/navbar';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/footer';

interface TextData {
  text: string;
  styles: {
    bold: boolean;
    italics: boolean;
    underline: boolean;
    color: string;
    font: string;
    fontSize: string;
    alignment: string;
  };
}

interface ServideData {
  content: {
    title: TextData;
    venue: TextData;
    date: TextData;
    coverImage: string;
    description: TextData;
  };
  uuid: string;
}

const Page = () => {
  const [eventData, setEventData] = useState<ServideData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/services');

        if (!response.ok) {
          setEventData([])
          return
        }

        const text = await response.text();
        if (!text.trim()) {
          throw new Error("Empty response from API");
        }

        const data = JSON.parse(text);

        const parsedData = Array.isArray(data.message)
          ? data.message.map((post: any) => ({
            uuid: post.uuid,
            content: JSON.parse(post.content)
          }))
          : [];

        console.log("Fetched Event Data:", parsedData);
        setEventData(parsedData);

      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Upcoming <span className="text-green-600">Services</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for the exclusive services that we provide.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="relative h-16 w-16">
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-green-200"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : eventData.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {eventData.map((event, index) => (
              <motion.div 
                key={event.uuid} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.content.coverImage || "/api/placeholder/600/400"}
                    alt={event.content.title.text}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-start gap-2 mb-3">
                    <div className="flex items-center justify-center">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-600 ml-2">{event.content.date.text}</p>
                    </div>
                    <div className=" flex items-center">
                      <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm text-gray-600 ml-2">{event.content.venue.text}</p>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{event.content.title.text}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.content.description.text}
                  </p>
                  <a
                    href={`/serviceposts/${event.uuid}`}
                    className="inline-flex items-center font-medium text-green-600 hover:text-green-800 transition-colors"
                  >
                    Service Details
                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-24"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green-50 rounded-xl shadow-lg p-10 max-w-2xl mx-auto">
              <div className="text-5xl mb-6">⚙️</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
              <p className="text-lg text-gray-600">
                We're planning exciting services and opportunities to connect.
                Stay tuned for upcoming services!
              </p>
            </div>
          </motion.div>
        )}
      </div>
      
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
      <Footer/>
    </div>
  );
};

export default Page;