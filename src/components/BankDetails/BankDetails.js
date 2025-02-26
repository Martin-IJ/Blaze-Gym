"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-hot-toast";

const BankDetails = () => {
  const [contactData, setContactData] = useState({});

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
          throw new Error(data.message || "Failed to fetch contact details.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching contact details."
        );
      }
    };

    fetchContactDetails();
  }, []);

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    // Remove any non-numeric characters
    phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    // Replace leading zero with country code 234
    if (phoneNumber.startsWith("0")) {
      phoneNumber = "234" + phoneNumber.slice(1);
    }
    return phoneNumber;
  };

  return (
    <div className="py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-gray-500">
          Blaze Gym Fitness reserves the right to verify, accept or reject
          membership
        </p>

        <div className="flex flex-col items-center my-4">
          <div className="relative h-60 w-60">
            <Image
              layout="fill"
              alt="Bank Logo"
              objectFit="contain"
              src="/images/UBA-logo.png"
            />
          </div>

          <div>
            <p className="text-2xl uppercase font-bold">Bank Name</p>
            <p className="text-2xl uppercase">UBA Bank</p>
          </div>

          <div className="w-full h-[2px] my-4 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <div>
            <p className="text-2xl uppercase font-bold">Account Number</p>
            <p className="text-2xl uppercase">1234567890</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 my-8">
          After payment, kindly reach out to us with a copy of your receipt via
          any of our channels below
        </p>

        {/* Contact Detail */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-5 text-primary">
            <div className="">
              <a
                href={`tel:${contactData.phone_number}`}
                className="text-primary flex items-center"
              >
                <FaPhoneAlt className="text-2xl mr-3" />
                {contactData.phone_number}
              </a>
            </div>
            <div className="">
              <a
                href={`https://wa.me/${formatPhoneNumber(
                  contactData.whatsapp
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-start text-primary"
              >
                <FaWhatsapp className="text-2xl mr-3" />
                {contactData.whatsapp}
              </a>
            </div>
            <div className="">
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-center text-primary"
              >
                <FaEnvelope className="text-2xl mr-3" />
                {contactData.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
