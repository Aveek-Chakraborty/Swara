import Pronav from "@/components/Pronav";
import SideNavigation from "@/components/SideNavigation";
import { HomeIcon, BookOpenIcon, CalendarIcon, VideoIcon, MessageSquareIcon, Settings } from "lucide-react";
import Link from "next/link";

export default async function ProtectedPage() {
  // Content cards data
  const contentCards = [
    { title: "Blogs", icon: BookOpenIcon, color: "bg-blue-100 text-blue-600", link:"/admin/blogs" },
    { title: "Events", icon: CalendarIcon, color: "bg-green-100 text-green-600", link:"/admin/events" },
    { title: "Videos", icon: VideoIcon, color: "bg-purple-100 text-purple-600", link:"/admin/videos" },
    { title: "Services", icon: Settings, color: "bg-amber-100 text-amber-600", link:"/admin/services" },
    { title: "Messages", icon: MessageSquareIcon, color: "bg-rose-100 text-rose-600", link:"/admin/messages"}
  ];

  return (
    <>
      <Pronav />
      <main className="flex min-h-screen bg-gray-50">
        <SideNavigation />
        <section className="w-full lg:w-10/12 p-6">
          {/* Header */}  
          <div className="flex items-center gap-3 mb-8">
            <HomeIcon className="h-6 w-6 text-gray-700" />
            <h1 className="text-3xl font-medium text-gray-800">Admin Dashboard</h1>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {contentCards.map((card, index) => (
              <Link href={card.link}  key={index}>
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-700">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {card.title === "Messages" ? "View messages" : `Manage ${card.title.toLowerCase()}`}
                </p>
                
              </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}