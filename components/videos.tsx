'use client'
import { LoaderIcon, Trash2Icon, VideotapeIcon } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";

interface VideoData {
  uuid: string;
  videoId: string;
  title: string;
  description: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [deletingVideoId, setDeletingVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
              const content = JSON.parse(video.content); // Parse content separately
              return {
                uuid: video.uuid,
                videoId: content.videoData.videoId,
                title: content.videoData.title.text,
                description: content.videoData.description.text,
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

  const onDelete = async (uuid: string) => {
    setDeletingVideoId(uuid);
    try {
      const response = await fetch(`/api/delvideo?q=${uuid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.message === 'Deleted') {
        setVideos((prevData) => prevData.filter((video) => video.uuid !== uuid));
      } else {
        console.error("Failed to delete video:", result.message);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
    setDeletingVideoId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center px-10 pb-4 border-b">
        <h1 className="text-2xl font-semibold">Manage all your Videos here</h1>
        <Link href='/admin/videos/create'>
          <button className="p-5 text-2xl border-2 rounded-md hover:bg-slate-100 hover:shadow-md flex items-center gap-2">
            <VideotapeIcon /> Add a Video
          </button>
        </Link>
      </div>
      <div>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-7 mt-10">
            {videos.map((video) => (
              <div key={video.uuid} className="border rounded-lg shadow-lg p-3 bg-white hover:shadow-xl transition">
                <div className="relative w-full h-50">
                  <iframe
                    className="w-full h-full rounded-md"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h2 className="text-2xl font-semibold mt-3">{video.title.length > 50
                    ? `${video.title.slice(0, 60)}...`
                    : video.title}</h2>
                <p className="text-gray-700 mt-2">
                  {video.description.length > 50
                    ? `${video.description.slice(0, 50)}...`
                    : video.description}
                </p>
                <div className="flex justify-between items-end mt-4">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch on YouTube
                  </a>
                  <Button
                    onClick={() => onDelete(video.uuid)}
                    className="bg-red-700 hover:bg-red-600"
                  >
                    {deletingVideoId === video.uuid ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      <Trash2Icon />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Videos;
