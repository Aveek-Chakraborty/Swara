'use client'
import { FileIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

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

const Blogs = () => {
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [deletingUuid, setDeletingUuid] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  const onDelete = async (uuid: string) => {
    setDeletingUuid(uuid);
    try {
      const response = await fetch(`/api/delblog?q=${uuid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.message === 'Deleted') {
        setBlogData((prevData) => prevData.filter((post) => post.uuid !== uuid));
      } else {
        console.error("Failed to delete blog:", result.message);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
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
        <h1 className="text-2xl font-semibold">Manage all your blogs here</h1>
        <Link href='/admin/blogs/create'>
          <button className="p-5 text-2xl border-2 rounded-md hover:bg-slate-100 hover:shadow-md flex items-center gap-2">
            <FileIcon /> Create a Blog
          </button>
        </Link>
      </div>
      <div>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-10">
            {blogData.map((post) => (
              <div key={post.uuid} className="border rounded-lg shadow-lg p-4">
                <img
                  src={post.content.coverImage || undefined}
                  alt="Cover"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold">{post?.content?.title?.text}</h2>
                <p className="text-sm text-gray-600">
                  {post.content.author} - {post.content.date}
                </p>
                <p className="text-gray-700 mt-2">
                  {post.content.subheading.text.length > 50
                    ? `${post.content.subheading.text.slice(0, 50)}...`
                    : post.content.subheading.text}
                </p> 
                <div className="flex justify-between items-end">
                  <a
                    href={`/blogposts/${post.uuid}`}
                    className="text-blue-600 mt-2 hover:underline inline-block"
                  >
                    Read More
                  </a>
                  <Button
                    onClick={() => onDelete(post.uuid)}
                    className="bg-red-700 hover:bg-red-600"
                  >
                    {deletingUuid === post.uuid ? (
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

export default Blogs;
