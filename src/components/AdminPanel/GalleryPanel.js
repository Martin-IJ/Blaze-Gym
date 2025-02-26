import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

const GalleryPanel = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          toast.error("No authentication token found. Please log in again.");
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery/`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setImages(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch gallery images.");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred while fetching gallery images.");
      }
    };

    fetchGalleryImages();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      toast.error("No authentication token found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("description", description);

    setIsUploading(true);
    toast.loading("Uploading...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImages((prevImages) => [...prevImages, data.data]);
        toast.dismiss();
        toast.success("Image uploaded successfully!");
        setShowUploadForm(false);
        setSelectedFile(null);
        setDescription("");
      } else {
        throw new Error(data.message || "Failed to upload image.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "An error occurred while uploading the image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      toast.error("No authentication token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
        toast.success("Image deleted successfully!");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete image.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while deleting the image.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Gallery</h2>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showUploadForm ? "Cancel" : "Add New Image"}
        </button>
      </div>
      {showUploadForm && (
        <div className="mt-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mr-2 px-2 py-1 border rounded"
          />
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Choose File
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-green-500 text-white rounded"
            disabled={isUploading}
          >
            Upload Image
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {images.map((image) => (
          <div key={image.id} className="relative w-full h-64">
            <Image
              src={image.image}
              alt={image.description || "Gallery image"}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg shadow-md"
            />
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPanel;
