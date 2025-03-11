'use client';
import Navbar from '@/components/navbar';
import React, { useState, useEffect } from 'react';


interface ParagraphData {
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

interface ImageData {
  src: string;
}

interface HeadingData {
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

interface BlogData {
  content: {
    title: HeadingData;
    subheading: HeadingData;
    author: string;
    date: string;
    coverImage: string;
    paragraphs: (ParagraphData | ImageData)[];
  };
  uuid: string;
}

const Page = () => {
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs');


        if (!response.ok) {
          setBlogData([])
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
        setBlogData(parsedData);

      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-gradient-to-bl min-h-screen from-[#a8e6cf]  to-[#fafafa]'>
      <Navbar />
      <div className="container mx-auto p-4 ">
        <div className='mt-24 text-2xl md:text-3xl font-bold'>Discover all our blogs here</div>
        {loading ? (
          <div className="text-center flex justify-center items-center mb-10 mt-10 text-6xl animate-spin py-56"><div className='loader border-t-2 border-b-2 border-gray-500 w-12 h-12 rounded-full animate-spin'></div></div>
        ) : blogData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-5 z-50 ">
            {blogData.map((post) => (
              <div key={post.uuid} className="border rounded-lg shadow-lg p-4 flex flex-col bg-zinc-50 justify-between">
                <div>
                  <img
                    src={post.content.coverImage || undefined}
                    alt="Cover"
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-2xl font-semibold">{post.content.title.text}</h2>
                  <p className="text-sm text-gray-600">
                    {post.content.author} - {post.content.date}
                  </p>
                  <p className="text-gray-700 mt-4">
                    {post.content.subheading.text.length > 50
                      ? `${post.content.subheading.text.slice(0, 50)}...`
                      : post.content.subheading.text}
                  </p>
                </div>
                <a
                  href={`/blogposts/${post.uuid}`}
                  className="text-blue-600 mt-2 hover:underline inline-block"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center md:mt-60 mt-32 md:text-6xl bg-green-200 w-auto p-10 rounded-3xl shadow-lg text-3xl">Coming soon! Stay tuned for upcoming Blogs</div>
        )}
      </div>
      
    </div>
  );
};

export default Page;
