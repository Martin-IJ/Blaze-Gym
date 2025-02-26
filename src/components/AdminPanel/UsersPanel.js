"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const UsersPanel = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
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
          setUser(data.data);
          setFormData({
            first_name: data.data.first_name,
            last_name: data.data.last_name,
            username: data.data.username,
            email: data.data.email,
          });
        } else {
          throw new Error(data.message || "Failed to fetch user details.");
        }
      } catch (error) {
        toast.error(mapErrorMessage(error.message));
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("No authentication token found. Please log in again.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);

      const response = await fetch("/api/proxy", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data);
        setIsEditing(false);
        toast.success("User details updated successfully");
      } else {
        throw new Error(data.message || "Failed to update user details.");
      }
    } catch (error) {
      toast.error(mapErrorMessage(error.message));
    }
  };

  const handlePasswordChangeClick = () => {
    setIsChangingPassword(true);
  };

  const handlePasswordSaveClick = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("No authentication token found. Please log in again.");
        return;
      }

      // Client-side validation for password requirements
      if (passwordData.new_password.length < 8) {
        toast.error("New password must be at least 8 characters long.");
        return;
      }
      if (!/[A-Z]/.test(passwordData.new_password)) {
        toast.error("New password must contain at least one uppercase letter.");
        return;
      }

      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsChangingPassword(false);
        toast.success("Password updated successfully");
      } else {
        throw new Error(data.message || "Failed to update password.");
      }
    } catch (error) {
      toast.error(mapErrorMessage(error.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mapErrorMessage = (message) => {
    switch (message) {
      case "No auth token found":
        return "No authentication token found. Please log in again.";
      case "Failed to fetch user details.":
        return "Unable to retrieve user details. Please try again later.";
      case "Failed to update user details.":
        return "Unable to update user details. Please try again later.";
      case "Failed to update password.":
        return "Unable to update password. Please try again later.";
      case "Password must be at least 8 characters long.":
        return "New password must be at least 8 characters long.";
      case "Password must contain at least one uppercase letter.":
        return "New password must contain at least one uppercase letter.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const userFields = [
    { label: "First Name", name: "first_name" },
    { label: "Last Name", name: "last_name" },
    { label: "Username", name: "username" },
    { label: "Email", name: "email" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold">User Management</h2>
      <div className="my-3">
        {user ? (
          <div>
            {isEditing ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userFields.map((field) => (
                    <TableRow key={field.name}>
                      <TableCell>{field.label}</TableCell>
                      <TableCell>
                        <input
                          type={field.name === "email" ? "email" : "text"}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          className="w-full"
                        />
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
                  {userFields.map((field) => (
                    <TableRow key={field.name}>
                      <TableCell>{field.label}</TableCell>
                      <TableCell>{user[field.name]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <Button
              onClick={isEditing ? handleSaveClick : handleEditClick}
              className={`mt-4 ${isEditing ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"} text-white`}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
            {isChangingPassword && (
              <div className="mt-4">
                <label>
                  Old Password:
                  <input
                    type="password"
                    name="old_password"
                    value={passwordData.old_password}
                    onChange={handlePasswordChange}
                    className="w-full"
                  />
                </label>
                <label>
                  New Password:
                  <input
                    type="password"
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    className="w-full"
                  />
                </label>
                <Button
                  onClick={handlePasswordSaveClick}
                  className="bg-green-500 hover:bg-green-700 text-white mt-4"
                >
                  Save Password
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default UsersPanel;