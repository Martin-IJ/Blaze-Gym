"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const ContactsPanel = () => {
  const [contactData, setContactData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setContactData(data.data);
        } else {
          // throw new Error(data.message || "Failed to fetch contact details.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching contact details."
        );
      }
    };

    fetchContactDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("No authentication token found. Please log in again.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Contact details updated successfully");
        setIsEditing(false);
        fetchContactDetails();
      } else {
        throw new Error(data.message || "Failed to update contact details.");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while updating contact details."
      );
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const contactFields = [
    { label: "WhatsApp", name: "whatsapp" },
    { label: "Phone Number", name: "phone_number" },
    { label: "Email", name: "email" },
    { label: "Website", name: "website" },
    { label: "Instagram", name: "instagram" },
    { label: "Twitter", name: "twitter" },
    { label: "Facebook", name: "facebook" },
    { label: "TikTok", name: "tiktok" },
    { label: "YouTube", name: "youtube" },
    { label: "Location Address", name: "location_address" },
    { label: "About Us", name: "about_us" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold">Contacts</h2>
      <div className="my-3">
        {isEditing ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactFields.map((field) => (
                <TableRow key={field.name}>
                  <TableCell>{field.label}</TableCell>
                  <TableCell>
                    {field.name === "about_us" ? (
                      <textarea
                        name={field.name}
                        value={contactData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full"
                      />
                    ) : (
                      <input
                        type={field.name === "email" ? "email" : "text"}
                        name={field.name}
                        value={contactData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full"
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactFields.map((field) => (
                <TableRow key={field.name}>
                  <TableCell>{field.label}</TableCell>
                  <TableCell>{contactData[field.name]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Button
          onClick={isEditing ? handleSaveClick : handleEditClick}
          className={`mt-4 ${
            isEditing
              ? "bg-green-500 hover:bg-green-700"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white`}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
    </div>
  );
};

export default ContactsPanel;
