"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const ProductsPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setProducts(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch products.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0],
    }));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    toast.loading("Creating product...");
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);
    formData.append("description", newProduct.description);

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`,
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
        toast.success("Product created successfully");
        setProducts((prevProducts) => [data.data, ...prevProducts]);
        setNewProduct({
          name: "",
          price: "",
          image: null,
          description: "",
        });
      } else {
        throw new Error(data.message || "Failed to create product.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "An error occurred while creating product.");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    toast.loading("Updating product...");
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);
    formData.append("description", newProduct.description);

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${selectedProduct.id}/`,
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
        toast.success("Product updated successfully");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id ? data.data : product
          )
        );
        setSelectedProduct(null);
        setNewProduct({
          name: "",
          price: "",
          image: null,
          description: "",
        });
      } else {
        throw new Error(data.message || "Failed to update product.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "An error occurred while updating product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Product deleted successfully");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete product.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while deleting product.");
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      image: null,
      description: product.description,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Products</h2>
      <form
        onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
        className="my-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
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
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {selectedProduct ? "Update Product" : "Create Product"}
        </button>
      </form>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="bg-white shadow-md max-w-[400px] w-full mx-auto"
            >
              <div className="relative w-full h-60 rounded-t-lg overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
              <CardHeader className="text-center">
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-white shadow-md max-w-[400px] w-full mx-auto"
            >
              <div className="relative w-full h-60 rounded-t-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-primary">
                  {product.name}
                </CardTitle>
                <p className="text-gray-500">₦{product.price}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.description}</p>
                <button
                  onClick={() => handleEditClick(product)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded mt-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded mt-2 ml-2"
                >
                  Delete
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPanel;
