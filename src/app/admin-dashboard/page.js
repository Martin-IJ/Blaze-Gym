"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import UsersPanel from "@/components/AdminPanel/UsersPanel";
import ContactsPanel from "@/components/AdminPanel/ContactsPanel";
import GalleryPanel from "@/components/AdminPanel/GalleryPanel";
import MembershipPanel from "@/components/AdminPanel/MembershipPanel";
import TeamPanel from "@/components/AdminPanel/TeamPanel";
import ProductsPanel from "@/components/AdminPanel/ProductsPanel";

const AdminDashboard = () => {
  const [tab, setTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("No auth token found");
        return;
      }

      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("authToken");
        toast.success("Logged out successfully");
        router.push("/auth");
      } else {
        throw new Error(data.message || "Logout failed.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleTabClick = (tabName) => {
    setTab(tabName);
    setSidebarOpen(false); // Close the sidebar
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out bg-gray-800 text-white w-64 p-4 absolute z-20 md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-4 mt-4 md:mt-0">Admin Panel</h2>
        <ul>
          <li
            className={`p-2 cursor-pointer hover:bg-gray-700 ${
              tab === "users" ? "bg-gray-600" : ""
            }`}
            onClick={() => handleTabClick("users")}
          >
            Users
          </li>
          <li
            className={`p-2 cursor-pointer hover:bg-gray-700 ${
              tab === "contacts" ? "bg-gray-600" : ""
            }`}
            onClick={() => handleTabClick("contacts")}
          >
            Contacts
          </li>
          <li
            className={`p-2 cursor-pointer hover:bg-gray-700 ${
              tab === "gallery" ? "bg-gray-600" : ""
            }`}
            onClick={() => handleTabClick("gallery")}
          >
            Gallery
          </li>
          <li
            className={`p-2 cursor-pointer hover:bg-gray-700 ${
              tab === "membership" ? "bg-gray-600" : ""
            }`}
            onClick={() => handleTabClick("membership")}
          >
            Membership Plans
          </li>
          <li
            className={`p-2 cursor-pointer hover:bg-gray-700 ${
              tab === "team" ? "bg-gray-600" : ""
            }`}
            onClick={() => handleTabClick("team")}
          >
            Team Members
          </li>
          <li
            className={`p-2 cursor-pointer hover:bg-gray-700 ${
              tab === "products" ? "bg-gray-600" : ""
            }`}
            onClick={() => handleTabClick("products")}
          >
            Products
          </li>
          <li
            className="p-2 cursor-pointer text-red-400"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-0">
        <div className="md:hidden z-30 flex justify-between items-center bg-gray-800 p-6 text-white">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            {sidebarOpen ? "Close" : "Menu"}
          </Button>
        </div>
        <div className="p-6">
          {tab === "users" && <UsersPanel />}
          {tab === "contacts" && <ContactsPanel />}
          {tab === "gallery" && <GalleryPanel />}
          {tab === "membership" && <MembershipPanel />}
          {tab === "team" && <TeamPanel />}
          {tab === "products" && <ProductsPanel />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
