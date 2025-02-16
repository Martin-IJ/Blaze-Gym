"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";

const ContactsPanel = () => {
  const [contactData, setContactData] = useState({
    whatsapp: "",
    phone_number: "",
    email: "",
    website: "",
    instagram: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    tiktok: "",
    youtube: "",
    telegram: "",
    snapchat: "",
    discord: "",
    reddit: "",
    pinterest: "",
    github: "",
    location_address: "",
    about_us: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          toast.error("No authentication token found. Please log in again.");
          return;
        }

        const response = await fetch("/api/proxy", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setContactData(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch contact details.");
        }
      } catch (error) {
        toast.error(mapErrorMessage(error.message));
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

      const response = await fetch("/api/proxy", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Contact details updated successfully");
        setIsEditing(false);
        // Fetch the updated contact details
        fetchContactDetails();
      } else {
        throw new Error(data.message || "Failed to update contact details.");
      }
    } catch (error) {
      toast.error(mapErrorMessage(error.message));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const mapErrorMessage = (message) => {
    switch (message) {
      case "No auth token found":
        return "No authentication token found. Please log in again.";
      case "Failed to fetch contact details.":
        return "Unable to retrieve contact details. Please try again later.";
      case "Failed to update contact details.":
        return "Unable to update contact details. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Contacts</h2>
      <div className="my-3">
        {isEditing ? (
          <div>
            <label>
              WhatsApp:
              <input
                type="text"
                name="whatsapp"
                value={contactData.whatsapp || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phone_number"
                value={contactData.phone_number || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={contactData.email || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Website:
              <input
                type="text"
                name="website"
                value={contactData.website || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Instagram:
              <input
                type="text"
                name="instagram"
                value={contactData.instagram || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Twitter:
              <input
                type="text"
                name="twitter"
                value={contactData.twitter || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Facebook:
              <input
                type="text"
                name="facebook"
                value={contactData.facebook || ""}
                onChange={handleChange}
              />
            </label>
            {/* <label>
              LinkedIn:
              <input
                type="text"
                name="linkedin"
                value={contactData.linkedin || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              TikTok:
              <input
                type="text"
                name="tiktok"
                value={contactData.tiktok || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              YouTube:
              <input
                type="text"
                name="youtube"
                value={contactData.youtube || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Telegram:
              <input
                type="text"
                name="telegram"
                value={contactData.telegram || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Snapchat:
              <input
                type="text"
                name="snapchat"
                value={contactData.snapchat || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Discord:
              <input
                type="text"
                name="discord"
                value={contactData.discord || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Reddit:
              <input
                type="text"
                name="reddit"
                value={contactData.reddit || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Pinterest:
              <input
                type="text"
                name="pinterest"
                value={contactData.pinterest || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              GitHub:
              <input
                type="text"
                name="github"
                value={contactData.github || ""}
                onChange={handleChange}
              />
            </label> */}
            <label>
              Location Address:
              <input
                type="text"
                name="location_address"
                value={contactData.location_address || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              About Us:
              <textarea
                name="about_us"
                value={contactData.about_us || ""}
                onChange={handleChange}
              />
            </label>
            <Button
              onClick={handleSaveClick}
              className="bg-green-500 hover:bg-green-700 text-white"
            >
              Save
            </Button>
          </div>
        ) : (
          <div>
            <p>WhatsApp: {contactData.whatsapp}</p>
            <p>Phone Number: {contactData.phone_number}</p>
            <p>Email: {contactData.email}</p>
            <p>Website: {contactData.website}</p>
            <p>Instagram: {contactData.instagram}</p>
            <p>Twitter: {contactData.twitter}</p>
            <p>Facebook: {contactData.facebook}</p>
            {/* <p>LinkedIn: {contactData.linkedin}</p>
            <p>TikTok: {contactData.tiktok}</p>
            <p>YouTube: {contactData.youtube}</p>
            <p>Telegram: {contactData.telegram}</p>
            <p>Snapchat: {contactData.snapchat}</p>
            <p>Discord: {contactData.discord}</p>
            <p>Reddit: {contactData.reddit}</p>
            <p>Pinterest: {contactData.pinterest}</p>
            <p>GitHub: {contactData.github}</p> */}
            <p>Location Address: {contactData.location_address}</p>
            <p>About Us: {contactData.about_us}</p>
            <Button
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-700 text-white"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsPanel;