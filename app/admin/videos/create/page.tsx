"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

interface VideoData {
  videoId: string;
  title: TextData;
  description: TextData;
}

const Page: React.FC = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [validVideoId, setValidVideoId] = useState("");
  const [videoData, setVideoData] = useState<VideoData>({
    videoId: '',
    title: {
      text: '',
      styles: {
        bold: false,
        italics: false,
        underline: false,
        color: '#000000',
        font: 'sans-serif',
        fontSize: 'text-2xl',
        alignment: 'text-left',
      },
    },
    description: {
      text: '',
      styles: {
        bold: false,
        italics: false,
        underline: false,
        color: '#000000',
        font: 'sans-serif',
        fontSize: 'text-base',
        alignment: 'text-left',
      },
    }
    
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: 'title' | 'description'
  ) => {
    const { value } = e.target;
    setVideoData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        text: value,
      },
    }));
  };

  const toggleStyle = (
    style: keyof TextData['styles'],
    type: 'title' | 'description'
  ) => {
    setVideoData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        styles: {
          ...prev[type].styles,
          [style]: !prev[type].styles[style],
        },
      },
    }));
  };

  const handleStyleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    style: keyof TextData['styles'],
    type: 'title' | 'description'
  ) => {
    const { value } = e.target;
    setVideoData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        styles: {
          ...prev[type].styles,
          [style]: value,
        },
      },
    }));
  };

  const handleVideoIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVideoId(value);
    
    // Extract and validate video ID on change
    const extractedId = extractYouTubeId(value);
    if (extractedId) {
      setVideoData(prev => ({
        ...prev,
        videoId: extractedId
      }));
      setValidVideoId(extractedId);
      toast.success("Video details retrieved successfully");
    } else if (value && value.trim() !== '') {
      // Only show error if there's actually input that failed validation
      toast.error("Could not extract a valid YouTube video ID");
    }
  };


  // Extract YouTube video ID from various URL formats
  const extractYouTubeId = (url: string): string | null => {
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/user\/.+\/\w{11})([^&\s]+)/,
      /youtube\.com\/watch.*v=([^&\s]+)/,
      /youtu\.be\/([^&\s]+)/,
      /youtube\.com\/embed\/([^&\s]+)/,
      /youtube\.com\/v\/([^&\s]+)/
    ];

    // Try each pattern
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // If no patterns match but the input looks like an ID (11 chars, valid chars)
    if (/^[A-Za-z0-9_-]{11}$/.test(url)) {
      return url;
    }

    return null;
  };


  // Effect to validate and set video ID when it changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoId) {
        const extractedId = extractYouTubeId(videoId);
        if (extractedId) {
          setValidVideoId(extractedId);
        }
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [videoId]);

  const getFormattedText = (textData: TextData) => {
    let styleClasses = `${textData.styles.fontSize} ${textData.styles.alignment} break-words`;
    if (textData.styles.bold) styleClasses += ' font-bold';
    if (textData.styles.italics) styleClasses += ' italic';
    if (textData.styles.underline) styleClasses += ' underline';

    return (
      <div
        className={`${styleClasses} mb-2`}
        style={{
          color: textData.styles.color,
          fontFamily: textData.styles.font,
        }}
      >
        {textData.text}
      </div>
    );
  };

  const onSubmit = async () => {
    if (!validVideoId) {
      toast.error("Please enter a valid YouTube video ID");
      return;
    }
    
    if (!videoData.title.text) {
      toast.error("Please enter a title for the video");
      return;
    }
    
    setLoading(true);
    
    try {
      // Following the events component approach, sending the entire videoData object
      // along with the link as a separate field
      const response = await fetch("/api/videos", {
        method: "POST",
        body: JSON.stringify({ videoData}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result.message)
      if (result.message === "Video added successfully") {
        toast.success("Video added successfully! Redirecting...");
        setLoading(false);
        setTimeout(() => {
          router.push("/admin/videos");
        }, 2000);
      } else {
        setLoading(false);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-auto p-4 bg-gray-100 space-y-6 md:space-y-0">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md md:mr-5">
        <h1 className="text-2xl font-semibold mb-4">Add New Video</h1>

        {/* Video Link Section */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">YouTube Video Link/ID</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={videoId}
              onChange={handleVideoIdChange}
              className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter YouTube video ID or URL"
            />
            
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Example: dQw4w9WgXcQ or https://www.youtube.com/watch?v=dQw4w9WgXcQ
          </p>
        </div>

        {/* Title Section */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">Video Title</label>
          <input
            type="text"
            value={videoData.title.text}
            onChange={(e) => handleChange(e, 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Enter video title"
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toggleStyle('bold', 'title')}
              className={`px-3 py-1 border rounded-lg ${videoData.title.styles.bold ? 'bg-blue-500 text-white' : ''}`}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('italics', 'title')}
              className={`px-3 py-1 border rounded-lg ${videoData.title.styles.italics ? 'bg-blue-500 text-white' : ''}`}
            >
              Italics
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('underline', 'title')}
              className={`px-3 py-1 border rounded-lg ${videoData.title.styles.underline ? 'bg-blue-500 text-white' : ''}`}
            >
              Underline
            </button>
            <input
              type="color"
              value={videoData.title.styles.color}
              onChange={(e) => handleStyleChange(e, 'color', 'title')}
              className="h-10 w-10 border rounded-full"
            />
          </div>
          <select
            value={videoData.title.styles.font}
            onChange={(e) => handleStyleChange(e, 'font', 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
          <select
            value={videoData.title.styles.fontSize}
            onChange={(e) => handleStyleChange(e, 'fontSize', 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="text-lg">Normal</option>
            <option value="text-2xl">Large</option>
            <option value="text-3xl">Extra Large</option>
          </select>
          <select
            value={videoData.title.styles.alignment}
            onChange={(e) => handleStyleChange(e, 'alignment', 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text-left">Left</option>
            <option value="text-center">Center</option>
            <option value="text-right">Right</option>
          </select>
        </div>

        {/* Description Section */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            value={videoData.description.text}
            onChange={(e) => handleChange(e, 'description')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 min-h-32"
            placeholder="Enter video description"
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toggleStyle('bold', 'description')}
              className={`px-3 py-1 border rounded-lg ${videoData.description.styles.bold ? 'bg-blue-500 text-white' : ''}`}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('italics', 'description')}
              className={`px-3 py-1 border rounded-lg ${videoData.description.styles.italics ? 'bg-blue-500 text-white' : ''}`}
            >
              Italics
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('underline', 'description')}
              className={`px-3 py-1 border rounded-lg ${videoData.description.styles.underline ? 'bg-blue-500 text-white' : ''}`}
            >
              Underline
            </button>
            <input
              type="color"
              value={videoData.description.styles.color}
              onChange={(e) => handleStyleChange(e, 'color', 'description')}
              className="h-10 w-10 border rounded-full"
            />
          </div>
          <select
            value={videoData.description.styles.font}
            onChange={(e) => handleStyleChange(e, 'font', 'description')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
          <select
            value={videoData.description.styles.fontSize}
            onChange={(e) => handleStyleChange(e, 'fontSize', 'description')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="text-base">Normal</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>
          <select
            value={videoData.description.styles.alignment}
            onChange={(e) => handleStyleChange(e, 'alignment', 'description')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text-left">Left</option>
            <option value="text-center">Center</option>
            <option value="text-right">Right</option>
          </select>
        </div>
      </div>

      {/* Preview Pane */}
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md overflow-auto h-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          {!isLoading ? 
            <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700">Add Video</Button> : 
            <Button disabled className="bg-blue-300">Saving...</Button>
          }
        </div>
        <div className="border-t mt-2 pt-4">
          {validVideoId ? (
            <div className="mb-4 w-full">
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src={`https://www.youtube.com/embed/${validVideoId}`}
                  title="YouTube video player"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="mb-4 w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No video selected</p>
            </div>
          )}
          {getFormattedText(videoData.title)}
          {getFormattedText(videoData.description)}
          
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Page;