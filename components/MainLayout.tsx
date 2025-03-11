
// import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Pronav from "@/components/Pronav";
import SideNavigation from "@/components/SideNavigation";
import { ClipboardCheckIcon, HomeIcon, PointerIcon } from "lucide-react";




export default async function ProtectedPage() {
  

  return (
    <>
      <Pronav />
      <main className="flex">
        <SideNavigation />
        <section className="w-8/12 p-4 flex flex-col">
          <div className="border text-3xl flex gap-3 items-center mb-4 h-1/6 px-9 "><HomeIcon/>Home</div>
          <div className="border flex justify-center items-center text-4xl h-5/6 gap-4">  <PointerIcon/> <span>Click on anything</span></div>
        </section>
      </main>
    </>
  );
}
