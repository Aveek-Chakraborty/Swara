"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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

interface ServiceData {
  title: TextData;
  venue: TextData;
  date: TextData;
  description: TextData;
  coverImage: string;
}

const Page: React.FC = () => {
  const router = useRouter();
  const [link, setLink] = useState("")
  const [eventData, setEventData] = useState<ServiceData>({
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
    venue: {
      text: '',
      styles: {
        bold: false,
        italics: false,
        underline: false,
        color: '#555555',
        font: 'sans-serif',
        fontSize: 'text-xl',
        alignment: 'text-left',
      },
    },
    date: {
      text: '',
      styles: {
        bold: false,
        italics: false,
        underline: false,
        color: '#888888',
        font: 'sans-serif',
        fontSize: 'text-base',
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
    },
    coverImage: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: 'title' | 'venue' | 'date' | 'description'
  ) => {
    const { value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        text: value,
      },
    }));
  };

  const toggleStyle = (
    style: keyof TextData['styles'],
    type: 'title' | 'venue' | 'date' | 'description'
  ) => {
    setEventData((prev) => ({
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
    type: 'title' | 'venue' | 'date' | 'description'
  ) => {
    const { value } = e.target;
    setEventData((prev) => ({
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setEventData((prev) => ({
          ...prev,
          coverImage: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setEventData((prev) => ({
      ...prev,
      coverImage: '',
    }));
  };

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
    setLoading(true);
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        body: JSON.stringify({eventData , link}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.message === "Event scheduled successfully") {
        toast.success("Event scheduled! Redirecting...");
        setLoading(false);
        setTimeout(() => {
          router.push("/admin/services");
        }, 2000);
      } else {
        setLoading(false);
        toast.error("Oh oh! Something went wrong. Try again");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const [isLoading, setLoading] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full h-auto p-4 bg-gray-100 space-y-6 md:space-y-0">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md md:mr-5">
        <h1 className="text-2xl font-semibold mb-4">Add your Service</h1>

        {/* Title Section */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            value={eventData.title.text}
            onChange={(e) => handleChange(e, 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Enter event title"
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toggleStyle('bold', 'title')}
              className={`px-3 py-1 border rounded-lg ${eventData.title.styles.bold ? 'bg-blue-500 text-white' : ''}`}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('italics', 'title')}
              className={`px-3 py-1 border rounded-lg ${eventData.title.styles.italics ? 'bg-blue-500 text-white' : ''}`}
            >
              Italics
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('underline', 'title')}
              className={`px-3 py-1 border rounded-lg ${eventData.title.styles.underline ? 'bg-blue-500 text-white' : ''}`}
            >
              Underline
            </button>
            <input
              type="color"
              value={eventData.title.styles.color}
              onChange={(e) => handleStyleChange(e, 'color', 'title')}
              className="h-10 w-10 border rounded-full"
            />
          </div>
          <select
            value={eventData.title.styles.font}
            onChange={(e) => handleStyleChange(e, 'font', 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
          <select
            value={eventData.title.styles.fontSize}
            onChange={(e) => handleStyleChange(e, 'fontSize', 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="text-lg">Normal</option>
            <option value="text-2xl">Large</option>
            <option value="text-3xl">Extra Large</option>
          </select>
          <select
            value={eventData.title.styles.alignment}
            onChange={(e) => handleStyleChange(e, 'alignment', 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text-left">Left</option>
            <option value="text-center">Center</option>
            <option value="text-right">Right</option>
          </select>
        </div>

        {/* Link */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
        <label className="block text-lg font-medium mb-2">Registration Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Enter Link"
          />
        </div>

        {/* Cover Image Section */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          {eventData.coverImage && (
            <button
              onClick={removeImage}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Remove Image
            </button>
          )}
        </div>

        {/* Venue Section */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">Venue</label>
          <input
            type="text"
            value={eventData.venue.text}
            onChange={(e) => handleChange(e, 'venue')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Enter event venue"
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toggleStyle('bold', 'venue')}
              className={`px-3 py-1 border rounded-lg ${eventData.venue.styles.bold ? 'bg-blue-500 text-white' : ''}`}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('italics', 'venue')}
              className={`px-3 py-1 border rounded-lg ${eventData.venue.styles.italics ? 'bg-blue-500 text-white' : ''}`}
            >
              Italics
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('underline', 'venue')}
              className={`px-3 py-1 border rounded-lg ${eventData.venue.styles.underline ? 'bg-blue-500 text-white' : ''}`}
            >
              Underline
            </button>
            <input
              type="color"
              value={eventData.venue.styles.color}
              onChange={(e) => handleStyleChange(e, 'color', 'venue')}
              className="h-10 w-10 border rounded-full"
            />
          </div>
          <select
            value={eventData.venue.styles.font}
            onChange={(e) => handleStyleChange(e, 'font', 'venue')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
          <select
            value={eventData.venue.styles.fontSize}
            onChange={(e) => handleStyleChange(e, 'fontSize', 'venue')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="text-base">Normal</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>
          <select
            value={eventData.venue.styles.alignment}
            onChange={(e) => handleStyleChange(e, 'alignment', 'venue')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text-left">Left</option>
            <option value="text-center">Center</option>
            <option value="text-right">Right</option>
          </select>
        </div>

        {/* Date Section */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">Date and Time</label>
          <input
            type="text"
            value={eventData.date.text}
            onChange={(e) => handleChange(e, 'date')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Enter event date and time"
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toggleStyle('bold', 'date')}
              className={`px-3 py-1 border rounded-lg ${eventData.date.styles.bold ? 'bg-blue-500 text-white' : ''}`}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('italics', 'date')}
              className={`px-3 py-1 border rounded-lg ${eventData.date.styles.italics ? 'bg-blue-500 text-white' : ''}`}
            >
              Italics
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('underline', 'date')}
              className={`px-3 py-1 border rounded-lg ${eventData.date.styles.underline ? 'bg-blue-500 text-white' : ''}`}
            >
              Underline
            </button>
            <input
              type="color"
              value={eventData.date.styles.color}
              onChange={(e) => handleStyleChange(e, 'color', 'date')}
              className="h-10 w-10 border rounded-full"
            />
          </div>
          <select
            value={eventData.date.styles.font}
            onChange={(e) => handleStyleChange(e, 'font', 'date')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
          <select
            value={eventData.date.styles.fontSize}
            onChange={(e) => handleStyleChange(e, 'fontSize', 'date')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="text-base">Normal</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>
          <select
            value={eventData.date.styles.alignment}
            onChange={(e) => handleStyleChange(e, 'alignment', 'date')}
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
            value={eventData.description.text}
            onChange={(e) => handleChange(e, 'description')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Enter event description"
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toggleStyle('bold', 'description')}
              className={`px-3 py-1 border rounded-lg ${eventData.description.styles.bold ? 'bg-blue-500 text-white' : ''}`}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('italics', 'description')}
              className={`px-3 py-1 border rounded-lg ${eventData.description.styles.italics ? 'bg-blue-500 text-white' : ''}`}
            >
              Italics
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('underline', 'description')}
              className={`px-3 py-1 border rounded-lg ${eventData.description.styles.underline ? 'bg-blue-500 text-white' : ''}`}
            >
              Underline
            </button>
            <input
              type="color"
              value={eventData.description.styles.color}
              onChange={(e) => handleStyleChange(e, 'color', 'description')}
              className="h-10 w-10 border rounded-full"
            />
          </div>
          <select
            value={eventData.description.styles.font}
            onChange={(e) => handleStyleChange(e, 'font', 'description')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
          <select
            value={eventData.description.styles.fontSize}
            onChange={(e) => handleStyleChange(e, 'fontSize', 'description')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="text-base">Normal</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>
          <select
            value={eventData.description.styles.alignment}
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
          {!isLoading ? <Button onClick={onSubmit}>Post Service</Button> : <Button disabled>Saving...</Button>}
        </div>
        <div className="border-t mt-2 pt-4">
          {getFormattedText(eventData.title)}
          {eventData.coverImage && (
            <div className="relative mb-4">
              <img
                src={eventData.coverImage}
                alt="Cover"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}
          {getFormattedText(eventData.venue)}
          {getFormattedText(eventData.date)}
          {getFormattedText(eventData.description)}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
