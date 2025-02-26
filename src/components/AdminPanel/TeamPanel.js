"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const TeamPanel = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMember, setNewMember] = useState({
    name: "",
    position: "",
    image: null,
  });
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/membership/team/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setTeamMembers(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch team members.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching team members."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewMember((prevMember) => ({
      ...prevMember,
      image: e.target.files[0],
    }));
  };

  const handleCreateMember = async (e) => {
    e.preventDefault();
    toast.loading("Creating team member...");
    const formData = new FormData();
    formData.append("name", newMember.name);
    formData.append("position", newMember.position);
    formData.append("image", newMember.image);

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/membership/team/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.dismiss();
        toast.success("Team member created successfully");
        setTeamMembers((prevMembers) => [data.data, ...prevMembers]);
        setNewMember({
          name: "",
          position: "",
          image: null,
        });
      } else {
        throw new Error(data.message || "Failed to create team member.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.message || "An error occurred while creating team member."
      );
    }
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    toast.loading("Updating team member...");
    const formData = new FormData();
    formData.append("name", newMember.name);
    formData.append("position", newMember.position);
    formData.append("image", newMember.image);

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/membership/team/${selectedMember.id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.dismiss();
        toast.success("Team member updated successfully");
        setTeamMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === selectedMember.id ? data.data : member
          )
        );
        setSelectedMember(null);
        setNewMember({
          name: "",
          position: "",
          image: null,
        });
      } else {
        throw new Error(data.message || "Failed to update team member.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.message || "An error occurred while updating team member."
      );
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/membership/team/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Team member deleted successfully");
        setTeamMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== id)
        );
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete team member.");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while deleting team member."
      );
    }
  };

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setNewMember({
      name: member.name,
      position: member.position,
      image: null,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Team Members</h2>
      <form
        onSubmit={selectedMember ? handleUpdateMember : handleCreateMember}
        className="my-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Position</label>
          <input
            type="text"
            name="position"
            value={newMember.position}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {selectedMember ? "Update Team Member" : "Create Team Member"}
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="border rounded-lg p-4 shadow-md">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
              <button
                onClick={() => handleEditClick(member)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMember(member.id)}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded mt-2 ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamPanel;
