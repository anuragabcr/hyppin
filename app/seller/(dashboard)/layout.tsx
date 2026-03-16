import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopNavbar />

        <main className="flex-1 overflow-y-auto p-8 bg-[#F8FAFF]">
          {children}
        </main>
      </div>
    </div>
  );
}
