"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MembershipPanel = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    price: "",
    benefits: "",
  });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/membership/plans/`,
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
          setPlans(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch membership plans.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching membership plans."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipPlans();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const handleCreatePlan = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/membership/plans/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            ...newPlan,
            benefits: newPlan.benefits
              .split(",")
              .map((benefit) => benefit.trim()),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Membership plan created successfully");
        setPlans((prevPlans) => [data.data, ...prevPlans]);
        setNewPlan({
          name: "",
          description: "",
          price: "",
          benefits: "",
        });
        setShowForm(false);
      } else {
        throw new Error(data.message || "Failed to create membership plan.");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while creating membership plan."
      );
    }
  };

  const handleUpdatePlan = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const payload = {
        ...selectedPlan,
        benefits: selectedPlan.benefits
          .split(",")
          .map((benefit) => benefit.trim()),
      };
      console.log("Update Payload:", payload);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/membership/plans/${selectedPlan.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Membership plan updated successfully");
        setPlans((prevPlans) =>
          prevPlans.map((plan) =>
            plan.id === selectedPlan.id ? data.data : plan
          )
        );
        setSelectedPlan(null);
      } else {
        console.error("Update Error:", data);
        throw new Error(data.message || "Failed to update membership plan.");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while updating membership plan."
      );
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/membership/plans/${planId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Membership plan deleted successfully");
        setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== planId));
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete membership plan.");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while deleting membership plan."
      );
    }
  };

  const handleEditClick = (plan) => {
    setSelectedPlan({
      ...plan,
      benefits: plan.benefits.join(", "),
    });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Membership Plans</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white"
        >
          {showForm ? "Cancel" : "Add New Plan"}
        </Button>
      </div>

      {showForm && (
        <div className="my-6">
          <h2 className="text-xl font-bold mt-10">
            Create New Membership Plan
          </h2>
          <div className="mt-6">
            <Input
              name="name"
              value={newPlan.name}
              onChange={handleInputChange}
              placeholder="Plan Name"
              className="mb-4"
            />
            <Textarea
              name="description"
              value={newPlan.description}
              onChange={handleInputChange}
              placeholder="Plan Description"
              className="mb-4"
            />
            <Input
              type="number"
              name="price"
              value={newPlan.price}
              onChange={handleInputChange}
              placeholder="Plan Price"
              className="mb-4"
            />
            <Input
              name="benefits"
              value={newPlan.benefits}
              onChange={handleInputChange}
              placeholder="Plan Benefits (comma separated)"
              className="mb-4"
            />
            <Button
              onClick={handleCreatePlan}
              className="bg-blue-500 hover:bg-blue-700 text-white"
            >
              Create Plan
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={index}
                className="border rounded-2xl shadow-md overflow-hidden"
              >
                <CardHeader className="flex justify-center items-center h-52">
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="w-full h-6 bg-gray-200 animate-pulse mb-2"></div>
                  <div className="w-3/4 h-6 bg-gray-200 animate-pulse"></div>
                </CardContent>
              </Card>
            ))
          : plans.map((plan) => (
              <Card
                key={plan.id}
                className="border rounded-2xl shadow-md overflow-hidden"
              >
                <CardHeader className="flex justify-center items-center h-40 bg-gray-100">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-lg font-semibold">
                    Price: ₦{formatPrice(plan.price)}
                  </p>
                  <p className="text-gray-600">{plan.description}</p>
                  {plan.benefits.length > 0 && (
                    <ul className="mt-4 list-disc list-inside">
                      {plan.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  )}
                  <Button
                    onClick={() => handleEditClick(plan)}
                    className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white mr-5"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
      </div>

      {selectedPlan && (
        <div className="my-10">
          <h2 className="text-xl font-bold">Update Membership Plan</h2>
          <div className="mt-6">
            <Input
              name="name"
              value={selectedPlan.name}
              onChange={handleUpdateInputChange}
              placeholder="Plan Name"
              className="mb-4"
            />
            <Textarea
              name="description"
              value={selectedPlan.description}
              onChange={handleUpdateInputChange}
              placeholder="Plan Description"
              className="mb-4"
            />
            <Input
              type="number"
              name="price"
              value={selectedPlan.price}
              onChange={handleUpdateInputChange}
              placeholder="Plan Price"
              className="mb-4"
            />
            <Input
              name="benefits"
              value={selectedPlan.benefits}
              onChange={handleUpdateInputChange}
              placeholder="Plan Benefits (comma separated)"
              className="mb-4"
            />
            <Button
              onClick={handleUpdatePlan}
              className="bg-green-500 hover:bg-green-700 text-white"
            >
              Update Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPanel;
