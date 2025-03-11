'use client'
import { CalendarRangeIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { Button } from "./ui//button";

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

const Events = () => {
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [deletingUuid, setDeletingUuid] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);

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

  const onDelete = async (uuid: string) => {
    setDeletingUuid(uuid); 
    try {
      const response = await fetch(`/api/delevent?q=${uuid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.message === 'Deleted') {
        setEventData((prevData) => prevData.filter((event) => event.uuid !== uuid));
      } else {
        console.error("Failed to delete event:", result.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    setDeletingUuid(null); 
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
        <h1 className="text-2xl font-semibold">Manage all your events here</h1>
        <Link href='/admin/events/create'>
          <button className="p-5 text-2xl border-2 rounded-md hover:bg-slate-100 hover:shadow-md flex items-center gap-2">
            <CalendarRangeIcon /> Schedule an Event
          </button>
        </Link>
      </div>
      <div>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-10">
            {eventData.map((event) => (
              <div key={event.uuid} className="border rounded-lg shadow-lg p-4">
                <img
                  src={event.content.coverImage || undefined}
                  alt="Event Cover"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold">{event.content.title.text}</h2>
                <p className="text-sm text-gray-600 mt-1">{event.content.date.text}</p>
                <p className="text-sm text-gray-600">{event.content.venue.text}</p>
                <p className="text-gray-700 mt-2">
                  {event.content.description.text.length > 50
                    ? `${event.content.description.text.slice(0, 50)}...`
                    : event.content.description.text}
                </p>
                <div className="flex justify-between items-end">
                  <a
                    href={`/eventposts/${event.uuid}`}
                    className="text-blue-600 mt-2 hover:underline inline-block"
                  >
                    Read More
                  </a>
                  <Button
                    onClick={() => onDelete(event.uuid)}
                    className="bg-red-700 hover:bg-red-600 mt-2"
                  >
                    {deletingUuid === event.uuid ? (
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
  )
}

export default Events;
