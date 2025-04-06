'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Trash2Icon, LoaderIcon, CopyIcon, CopyCheckIcon } from 'lucide-react';

interface Message {
  uuid: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  time: string;
}

const MessagesComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [deletingUuid, setDeletingUuid] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedUuid, setCopiedUuid] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        if(data.message != "External server error"){setMessages(data.message);}
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const onDelete = async (uuid: string) => {
    setDeletingUuid(uuid);
    try {
      const response = await fetch(`/api/delmessage?q=${uuid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.message === 'Deleted') {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.uuid !== uuid));
      } else {
        console.error('Failed to delete message:', result.message);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
    setDeletingUuid(null);
  };

  const onCopyDetails = (uuid: string, name: string, mobile: string, email: string) => {
    const formattedDetails = `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}`;
    navigator.clipboard.writeText(formattedDetails)
      .then(() => {
        setCopiedUuid(uuid);
        setTimeout(() => setCopiedUuid(null), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy details:', error);
      });
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
      <div className="flex justify-between items-center px-7 pb-4 mb-2 border-b">
        <h1 className="text-2xl p-5 font-semibold">Manage all your messages here</h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 py-16">
            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h6v6m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Messages you receive will show up here.</p>
          </div>
        ) : messages.map((message) => (
          <div
            key={message.uuid}
            className="w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <div className="mb-2 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">{message.name}</h2>
              <div className="flex gap-3">
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  onClick={() => onCopyDetails(message.uuid, message.name, message.mobile, message.email)}
                  className="flex items-center justify-center px-3 py-2 rounded-md"
                >
                  {copiedUuid === message.uuid ? <><CopyCheckIcon className="mr-2" /> Copied!</> : <><CopyIcon className="mr-2" /> Copy</>}
                </Button>
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  onClick={() => onDelete(message.uuid)}
                  className="flex items-center justify-center"
                >
                  {deletingUuid === message.uuid ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    <Trash2Icon />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-lg text-gray-500 my-2">{message.mobile}</p>
            <p className="text-lg text-gray-500 my-2">{message.time}</p>
            <p className="text-lg text-gray-500 mb-2">{message.email}</p>
            <div className="text-gray-700 break-words">
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MessagesComponent;
