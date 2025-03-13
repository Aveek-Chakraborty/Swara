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

interface VideoData {
    uuid: string;
    videoId: string;
    title: TextData;
    description: TextData;
}

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

const VideoPage = () => {
    const [videos, setVideos] = useState<VideoData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/videos');

                if (!response.ok) {
                    setVideos([]);
                    return;
                }

                const text = await response.text();
                if (!text.trim()) {
                    throw new Error("Empty response from API");
                }

                const data = JSON.parse(text);

                const parsedData = Array.isArray(data.message)
                    ? data.message.map((video: any) => {
                        const content = JSON.parse(video.content);
                        return {
                            uuid: video.uuid,
                            videoId: content.videoData.videoId,
                            title: content.videoData.title,
                            description: content.videoData.description,
                        };
                    })
                    : [];

                console.log("Fetched Video Data:", parsedData);
                setVideos(parsedData);
            } catch (error) {
                console.error("Error fetching videos:", error);
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
                <div className='mt-24 text-2xl md:text-3xl font-bold'>Explore All Our Videos</div>

                {loading ? (
                    <div className="text-center flex justify-center items-center mb-10 mt-10 text-6xl animate-spin py-56">
                        <div className='loader border-t-2 border-b-2 border-gray-500 w-12 h-12 rounded-full animate-spin'></div>
                    </div>
                ) : videos.length > 0 ? (
                    <div className="flex flex-col  gap-10 md:gap-14 mt-10">

                        {videos.map((video) => (
                            <div key={video.uuid} className="bg-white  shadow-md rounded-lg md:items-center flex flex-col md:flex-row">
                                {/* Left Side - Video */}
                                <div className="md:w-3/5">
                                    <iframe
                                        className="w-full min-h-[250px] rounded-tr-md rounded-tl-md md:min-h-[600px] md:rounded-tr-none md:rounded-tl-md md:rounded-bl-md" // Increased height
                                        src={`https://www.youtube.com/embed/${video.videoId}`}
                                        title={video.title.text}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>

                                <div className="md:w-2/5 w-full p-6 md:p-10 flex flex-col justify-center min-h-[300px] text-left">
                                    {/* Title - Larger & Bold */}
                                    <div className="text-xl md:text-2xl font-bold overflow-hidden text-ellipsis">
                                        {getFormattedText(video.title)}
                                    </div>

                                    {/* Description - Scrollable if long */}
                                    <div className="mt-2 max-h-[300px] overflow-y-auto pr-2">
                                        {getFormattedText(video.description)}
                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center md:mt-60 mt-32 md:text-6xl bg-green-200 w-auto p-10 rounded-3xl shadow-lg text-3xl">
                        No videos found! Stay tuned for updates.
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPage;
