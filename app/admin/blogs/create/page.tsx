"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  title: HeadingData;
  subheading: HeadingData;
  author: string;
  date: string;
  coverImage: string;
  content: (ParagraphData | ImageData)[];
}

const Page: React.FC = () => {
  const router = useRouter()
  const [blogData, setBlogData] = useState<BlogData>({
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
    subheading: {
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
    author: '',
    date: '',
    coverImage: '',
    content: [
      {
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
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    type?: 'title' | 'subheading'
  ) => {
    const { name, value } = e.target;
    if (type) {
      setBlogData((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          text: value,
        },
      }));
    } else if (name === 'content' && index !== undefined) {
      const newContent = [...blogData.content];
      if ('text' in newContent[index]) {
        (newContent[index] as ParagraphData).text = value;
      }
      setBlogData({ ...blogData, content: newContent });
    } else {
      setBlogData({ ...blogData, [name]: value });
    }
  };

  const toggleStyle = (
    style: keyof HeadingData['styles'],
    type: 'title' | 'subheading'
  ) => {
    setBlogData((prev) => ({
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
    style: keyof HeadingData['styles'],
    type: 'title' | 'subheading'
  ) => {
    const { value } = e.target;
    setBlogData((prev) => ({
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

  type BooleanStyleKeys = 'bold' | 'italics' | 'underline';

const toggleParagraphStyle = (index: number, style: BooleanStyleKeys) => {
  const newContent = [...blogData.content];

  if ('text' in newContent[index]) {
    const paragraph = newContent[index] as ParagraphData;
    paragraph.styles[style] = !paragraph.styles[style];
  }

  setBlogData({ ...blogData, content: newContent });
};

const handleParagraphStyleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  index: number,
  style: keyof ParagraphData['styles']
) => {
  const newContent = [...blogData.content];

  if ("text" in newContent[index]) {
    const paragraph = newContent[index] as ParagraphData;

    // TypeScript fix: Ensure the correct type is assigned based on existing property type
    if (typeof paragraph.styles[style] === "boolean") {
      (paragraph.styles as any)[style] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    } else {
      (paragraph.styles as any)[style] = e.target.value;
    }
  }

  setBlogData({ ...blogData, content: newContent });
};



  const addParagraph = () => {
    setBlogData((prev) => ({
      ...prev,
      content: [
        ...prev.content,
        {
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
      ],
    }));
  };

  const addImage = () => {
    setBlogData((prev) => ({
      ...prev,
      content: [...prev.content, { src: '' }],
    }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newContent = [...blogData.content];
        if ('src' in newContent[index]) {
          (newContent[index] as ImageData).src = base64String;
        }
        setBlogData({ ...blogData, content: newContent });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteContent = (index: number) => {
    setBlogData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBlogData((prev) => ({
          ...prev,
          coverImage: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setBlogData((prev) => ({
      ...prev,
      coverImage: '',
    }));
  };

  const getFormattedHeading = (headingData: HeadingData) => {
    let styleClasses = `${headingData.styles.fontSize} ${headingData.styles.alignment} break-words`;
    if (headingData.styles.bold) styleClasses += ' font-bold';
    if (headingData.styles.italics) styleClasses += ' italic';
    if (headingData.styles.underline) styleClasses += ' underline';

    return (
      <div
        className={`${styleClasses} mb-2`}
        style={{
          color: headingData.styles.color,
          fontFamily: headingData.styles.font,
        }}
      >
        {headingData.text}
      </div>
    );
  };

  const getFormattedContent = () => {
    return blogData.content.map((item, index) => {
      if ('text' in item) {
        let styleClasses = `${item.styles.fontSize} ${item.styles.alignment} break-words`;
        if (item.styles.bold) styleClasses += ' font-bold';
        if (item.styles.italics) styleClasses += ' italic';
        if (item.styles.underline) styleClasses += ' underline';

        return (
          <div
            key={index}
            className={`${styleClasses} mb-4`}
            style={{
              color: item.styles.color,
              fontFamily: item.styles.font,
            }}
          >
            {item.text}
          </div>
        );
      } else {
        return (
          <div key={index} className="mb-4">
            <img
              src={item.src || undefined}
              alt="Blog Content Image"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        );
      }
    });
  };

  const onSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify(blogData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.message === "Data saved successfully") {
        toast.success("Blog posted! You are currently being redirected...");
        setLoading(false)
        setTimeout(() => {
          router.push("/admin/blogs");
        }, 2000); 
        
        
      }
      if (result.message === "External server error") {
        setLoading(false)
        toast.error("Oh oh! Something went wrong. Try again");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false)
    }

    setLoading(false)

  }

  const [isLoading , setLoading] = useState(false)


  return (
    <div className="flex flex-col md:flex-row w-full h-auto p-4 bg-gray-100 space-y-6 md:space-y-0 text-gray-800">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md  md:mr-5">
        <h1 className="text-2xl font-semibold mb-4">Create Your Blog</h1>

        {/* Title Input and Styling */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            value={blogData.title.text}
            onChange={(e) => handleChange(e, undefined, 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Enter your blog title"
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toggleStyle('bold', 'title')}
              className={`px-3 py-1 border rounded-lg ${blogData.title.styles.bold ? 'bg-blue-500 text-white' : ''
                }`}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('italics', 'title')}
              className={`px-3 py-1 border rounded-lg ${blogData.title.styles.italics ? 'bg-blue-500 text-white' : ''
                }`}
            >
              Italics
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('underline', 'title')}
              className={`px-3 py-1 border rounded-lg ${blogData.title.styles.underline ? 'bg-blue-500 text-white' : ''
                }`}
            >
              Underline
            </button>
            <input
              type="color"
              value={blogData.title.styles.color}
              onChange={(e) => handleStyleChange(e, 'color', 'title')}
              className="h-10 w-10 border rounded-full"
            />
          </div>
          <select
            value={blogData.title.styles.font}
            onChange={(e) => handleStyleChange(e, 'font', 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
          <select
            value={blogData.title.styles.fontSize}
            onChange={(e) => handleStyleChange(e, 'fontSize', 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="text-lg">Normal</option>
            <option value="text-2xl">Large</option>
            <option value="text-3xl">Extra Large</option>
          </select>
          <select
            value={blogData.title.styles.alignment}
            onChange={(e) => handleStyleChange(e, 'alignment', 'title')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text-left">Left</option>
            <option value="text-center">Center</option>
            <option value="text-right">Right</option>
          </select>
        </div>

        {/* Subheading Input and Styling */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">Subheading</label>
          <input
            type="text"
            value={blogData.subheading.text}
            onChange={(e) => handleChange(e, undefined, 'subheading')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Enter your subheading"
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toggleStyle('bold', 'subheading')}
              className={`px-3 py-1 border rounded-lg ${blogData.subheading.styles.bold ? 'bg-blue-500 text-white' : ''
                }`}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('italics', 'subheading')}
              className={`px-3 py-1 border rounded-lg ${blogData.subheading.styles.italics ? 'bg-blue-500 text-white' : ''
                }`}
            >
              Italics
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('underline', 'subheading')}
              className={`px-3 py-1 border rounded-lg ${blogData.subheading.styles.underline ? 'bg-blue-500 text-white' : ''
                }`}
            >
              Underline
            </button>
            <input
              type="color"
              value={blogData.subheading.styles.color}
              onChange={(e) => handleStyleChange(e, 'color', 'subheading')}
              className="h-10 w-10 border rounded-full"
            />
          </div>
          <select
            value={blogData.subheading.styles.font}
            onChange={(e) => handleStyleChange(e, 'font', 'subheading')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
          <select
            value={blogData.subheading.styles.fontSize}
            onChange={(e) => handleStyleChange(e, 'fontSize', 'subheading')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="text-base">Normal</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>
          <select
            value={blogData.subheading.styles.alignment}
            onChange={(e) => handleStyleChange(e, 'alignment', 'subheading')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text-left">Left</option>
            <option value="text-center">Center</option>
            <option value="text-right">Right</option>
          </select>
        </div>

        {/* Author and Date Inputs */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Enter the author's name"
          />
          <label className="block text-lg font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={blogData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
        </div>

        {/* Cover Image Input */}
        <div className="mb-4 p-6 bg-zinc-50 rounded-md shadow-md">
          <label className="block text-lg font-medium mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          {blogData.coverImage && (
            <button
              onClick={removeImage}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Remove Image
            </button>
          )}
        </div>

        {/* Paragraph and Image Sections */}
        {blogData.content.map((item, index) => {
          if ('text' in item) {
            return (
              <div key={index} className="mb-6 bg-zinc-50 p-6 shadow-md rounded-md">
                <label className="block text-lg font-medium mb-2">Paragraph</label>
                <textarea
                  name="content"
                  value={item.text}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  rows={4}
                  placeholder={`Paragraph ${index + 1}`}
                ></textarea>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => toggleParagraphStyle(index, 'bold')}
                    className={`px-3 py-1 border rounded-lg ${item.styles.bold ? 'bg-blue-500 text-white' : ''
                      }`}
                  >
                    Bold
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleParagraphStyle(index, 'italics')}
                    className={`px-3 py-1 border rounded-lg ${item.styles.italics ? 'bg-blue-500 text-white' : ''
                      }`}
                  >
                    Italics
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleParagraphStyle(index, 'underline')}
                    className={`px-3 py-1 border rounded-lg ${item.styles.underline ? 'bg-blue-500 text-white' : ''
                      }`}
                  >
                    Underline
                  </button>
                  <input
                    type="color"
                    value={item.styles.color}
                    onChange={(e) => handleParagraphStyleChange(e, index, 'color')}
                    className="h-10 w-10 border rounded-full"
                  />
                </div>
                <select
                  value={item.styles.font}
                  onChange={(e) => handleParagraphStyleChange(e, index, 'font')}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                >
                  <option value="sans-serif">Sans-Serif</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                  <option value="cursive">Cursive</option>
                </select>
                <select
                  value={item.styles.fontSize}
                  onChange={(e) => handleParagraphStyleChange(e, index, 'fontSize')}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                >
                  <option value="text-sm">Small</option>
                  <option value="text-base">Normal</option>
                  <option value="text-lg">Large</option>
                  <option value="text-xl">Extra Large</option>
                </select>
                <select
                  value={item.styles.alignment}
                  onChange={(e) => handleParagraphStyleChange(e, index, 'alignment')}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text-left">Left</option>
                  <option value="text-center">Center</option>
                  <option value="text-right">Right</option>
                </select>
                <button
                  type="button"
                  onClick={() => deleteContent(index)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete Paragraph
                </button>
              </div>
            );
          } else {
            return (
              <div key={index} className="mb-4 bg-zinc-50 p-6 shadow-md rounded-md">
                <label className="block text-lg font-medium mb-2">Content Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                {item.src && (
                  <div className="relative mb-4">
                    <img
                      src={item.src || undefined}
                      alt="Content Image"
                      className="w-full h-auto rounded-lg object-cover"
                    />
                    <button
                      onClick={() => deleteContent(index)}
                      className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </div>
            );
          }
        })}

        <button
          type="button"
          onClick={addParagraph}
          className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Add Paragraph
        </button>
        <button
          type="button"
          onClick={addImage}
          className="mt-2 ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Add Image
        </button>
      </div>

      {/* Preview Pane */}
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md overflow-auto h-auto">
        <div className='flex justify-between items-center'>
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          {!isLoading?<Button onClick={onSubmit}>Post Blog</Button>:<Button disabled>Saving...</Button>}
        </div>
        <div className="border-t mt-2 pt-4">
          {getFormattedHeading(blogData.title)}
          {getFormattedHeading(blogData.subheading)}
          <div className="flex gap-4">
            <p className="text-sm mb-2 text-gray-400">{`${blogData.author}`}</p>
            <p className="text-sm mb-4 text-gray-400">{`${blogData.date}`}</p>
          </div>
          {blogData.coverImage && (
            <div className="relative mb-4">
              <img
                src={blogData.coverImage}
                alt="Cover"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}
          {getFormattedContent()}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
