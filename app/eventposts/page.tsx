'use client';
import Navbar from '@/components/navbar';
import React, { useState, useEffect } from 'react';

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

interface EventData {
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
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/events');


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

        console.log("Fetched Blog Data:", parsedData);
        setEventData(parsedData);

      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-gradient-to-bl min-h-screen from-[#a8e6cf] to-[#fafafa]'>
      <Navbar />
      
      <div className="container mx-auto p-4">
        <div className='mt-24 text-2xl md:text-3xl font-bold'>Discover all our upcoming events here</div>
        {loading ? (
          <div className="text-center flex justify-center items-center mb-10 mt-10 text-6xl animate-spin py-56"><div className='loader border-t-2 border-b-2 border-gray-500 w-12 h-12 rounded-full animate-spin'></div></div>
        ) : eventData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-5">
            {eventData.map((event) => (
              <div key={event.uuid} className="border rounded-lg shadow-lg p-4 flex flex-col bg-white justify-between">
                <div>
                  <img
                    src={event.content.coverImage || undefined}
                    alt="Event Cover"
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-2xl font-semibold">{event.content.title.text}</h2>
                  <p className="text-sm text-gray-600 mt-1">{event.content.date.text}</p>
                  <p className="text-sm text-gray-600">{event.content.venue.text}</p>
                  <p className="text-gray-700 mt-4">
                    {event.content.description.text.length > 50
                      ? `${event.content.description.text.slice(0, 50)}...`
                      : event.content.description.text}
                  </p>
                </div>
                <a
                  href={`/eventposts/${event.uuid}`}
                  className="text-blue-600 mt-2 hover:underline inline-block"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center md:mt-60 mt-32 md:text-6xl bg-green-200 p-10 rounded-3xl shadow-lg text-3xl">Coming soon! Stay tuned for upcoming Events</div>
        )}
      </div>
    
    </div>
  );
};

export default Page;
