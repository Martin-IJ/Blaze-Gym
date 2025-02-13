"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [tab, setTab] = useState("users");
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
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({})
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
  
  
  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <ul>
          <li className={`p-2 cursor-pointer ${tab === "users" ? "bg-gray-600" : ""}`} onClick={() => setTab("users")}>Users</li>
          <li className={`p-2 cursor-pointer ${tab === "contacts" ? "bg-gray-600" : ""}`} onClick={() => setTab("contacts")}>Contacts</li>
          <li className={`p-2 cursor-pointer ${tab === "gallery" ? "bg-gray-600" : ""}`} onClick={() => setTab("gallery")}>Gallery</li>
          <li className={`p-2 cursor-pointer ${tab === "membership" ? "bg-gray-600" : ""}`} onClick={() => setTab("membership")}>Membership Plans</li>
          <li className={`p-2 cursor-pointer ${tab === "team" ? "bg-gray-600" : ""}`} onClick={() => setTab("team")}>Team Members</li>
          <li className={`p-2 cursor-pointer ${tab === "products" ? "bg-gray-600" : ""}`} onClick={() => setTab("products")}>Products</li>
          <li className="p-2 cursor-pointer text-red-400" onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {tab === "users" && <UsersPanel />}
        {tab === "contacts" && <ContactsPanel />}
        {tab === "gallery" && <GalleryPanel />}
        {tab === "membership" && <MembershipPanel />}
        {tab === "team" && <TeamPanel />}
        {tab === "products" && <ProductsPanel />}
      </main>
    </div>
  );
};

const UsersPanel = () => {
  return <h2 className="text-xl font-bold">User Management</h2>;
};

const ContactsPanel = () => {
  return <h2 className="text-xl font-bold">Contacts</h2>;
};

const GalleryPanel = () => {
  return <h2 className="text-xl font-bold">Gallery</h2>;
};

const MembershipPanel = () => {
  return <h2 className="text-xl font-bold">Membership Plans</h2>;
};

const TeamPanel = () => {
  return <h2 className="text-xl font-bold">Team Members</h2>;
};

const ProductsPanel = () => {
  return <h2 className="text-xl font-bold">Products</h2>;
};

export default AdminDashboard;
