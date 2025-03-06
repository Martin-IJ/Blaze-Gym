"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Map from "@/components/Map/Map";
import SocialMediaLinks from "../SocialMediaLinks/SocialMediaLinks";
import { toast } from "react-hot-toast";

export default function ContactUs() {
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

  return (
    <main className="bg-background text-accent">
      <section className="relative h-[60vh] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0">
          <Image
            src="/images/contact-hero.jpeg"
            alt="Gym Contact"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold text-white">
            Get in <span className="text-tertiary-dark">Touch</span>
          </h1>
          <p className="text-lg text-gray-300">
            We’re here to help you on your fitness journey. Reach out to us
            anytime!
          </p>
        </div>
        <div className="absolute inset-0 bg-black/80"></div>
      </section>

      <section className="py-16 px-6 max-w-5xl mx-auto text-center grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-white shadow-md flex flex-col items-center justify-center">
          <CardHeader className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-3xl text-tertiary-dark" />
          </CardHeader>
          <CardContent className="text-gray-400">
            <p>{contactData.location_address}</p>
          </CardContent>
        </Card>
        <Card className="text-white shadow-md flex flex-col items-center justify-center">
          <CardHeader className="flex flex-col items-center">
            <FaPhoneAlt className="text-3xl text-tertiary-dark" />
          </CardHeader>
          <CardContent className="text-gray-400">
            <p>{contactData.phone_number}</p>
          </CardContent>
        </Card>
        <Card className="text-white shadow-md flex flex-col items-center justify-center">
          <CardHeader className="flex flex-col items-center">
            <FaEnvelope className="text-3xl text-tertiary-dark" />
          </CardHeader>
          <CardContent className="text-gray-400">
            <p>{contactData.email}</p>
          </CardContent>
        </Card>
      </section>

      <section className="pb-16 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">Follow Us</h1>
        <div className="flex justify-center">
          <SocialMediaLinks
            instagram={contactData.instagram}
            twitter={contactData.twitter}
            facebook={contactData.facebook}
            linkedin={contactData.linkedin}
            tiktok={contactData.tiktok}
            youtube={contactData.youtube}
            telegram={contactData.telegram}
            snapchat={contactData.snapchat}
            discord={contactData.discord}
            reddit={contactData.reddit}
            pinterest={contactData.pinterest}
            github={contactData.github}
          />
        </div>
      </section>

      {/* <section className="bg-slate-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Send Us a Message
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Have a question? Fill out the form below and we’ll get back to you
            as soon as possible.
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="Your Name"
              className="border border-slate-400"
            />
            <Input
              type="email"
              placeholder="Your Email"
              className="border border-slate-400"
            />
            <Input
              type="tel"
              placeholder="Your Phone (Optional)"
              className="border border-slate-400 md:col-span-2"
            />
            <Textarea
              placeholder="Your Message"
              className="border border-slate-400 md:col-span-2 h-32"
            />
            <Button className="text-white w-full md:col-span-2">
              Send Message
            </Button>
          </form>
        </div>
      </section> */}

      <Map />
    </main>
  );
}
