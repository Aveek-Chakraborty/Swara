
import Pronav from "@/components/Pronav";
import SideNavigation from "@/components/SideNavigation";
import Blogs from "@/components/Blogs";




export default async function ProtectedPage() {
  

  return (
    <>
      <Pronav />
      <main className="flex">
        <SideNavigation />
        <section className="w-8/12 p-4">
          <Blogs/>
        </section>
      </main>
    </>
  );
}
