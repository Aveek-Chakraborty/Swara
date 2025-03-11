
import Pronav from "@/components/Pronav";
import SideNavigation from "@/components/SideNavigation";
import MessagesComponent from "@/components/messages";




export default async function ProtectedPage() {
  

  return (
    <>
      <Pronav />
      <main className="flex">
        <SideNavigation />
        <section className="w-8/12 p-4">
          <MessagesComponent/>
        </section>
      </main>
    </>
  );
}
