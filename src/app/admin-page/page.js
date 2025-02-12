"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { IoIosLogOut } from "react-icons/io";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchData("/api/users", setUsers);
    fetchData("/api/contacts", setContacts);
    fetchData("/api/gallery", setGallery);
    fetchData("/api/membership-plans", setMembershipPlans);
    fetchData("/api/team-members", setTeamMembers);
    fetchData("/api/products", setProducts);
  }, []);

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setState(data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

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
        },
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
    <div className="p-6">
      <div className="flex items-center py-4 justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} className="flex items-center bg-red-600 hover:bg-red-700 text-white">
          Logout <IoIosLogOut className="" />
        </Button>
      </div>
      <section>
        <h2 className="text-lg mb-2">Manage Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-lg mb-2">Manage Contacts</h2>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.email} - {contact.phone_number}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-lg mb-2">Manage Gallery</h2>
        <ul>
          {gallery.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt="Gallery Item" className="w-16 h-16" />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-lg mb-2">Manage Membership Plans</h2>
        <ul>
          {membershipPlans.map((plan) => (
            <li key={plan.id}>
              {plan.name} - ${plan.price}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-lg mb-2">Manage Team Members</h2>
        <ul>
          {teamMembers.map((member) => (
            <li key={member.id}>
              {member.name} - {member.position}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-lg mb-2">Manage Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPage;
