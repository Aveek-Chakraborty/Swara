

import Pronav from "@/components/Pronav";
import SideNavigation from "@/components/SideNavigation";
import Events from "@/components/events";
import Videos from "@/components/videos";




export default async function ProtectedPage() {
  
  return (
    <>
      <Pronav />
      <main className="flex">
        <SideNavigation />
        <section className="w-8/12 p-4">
          <Videos/>
        </section>
      </main>
    </>
  );
}
