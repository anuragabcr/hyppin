import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <main className="p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
