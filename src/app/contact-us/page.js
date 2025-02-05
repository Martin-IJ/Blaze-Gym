"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
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
        <Card className="text-white shadow-md">
          <CardHeader className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-3xl text-tertiary-dark" />
          </CardHeader>
          <CardContent className="text-gray-400">
            <p>123 Fitness Street, City, Country</p>
          </CardContent>
        </Card>
        <Card className="text-white shadow-md">
          <CardHeader className="flex flex-col items-center">
            <FaPhoneAlt className="text-3xl text-tertiary-dark" />
          </CardHeader>
          <CardContent className="text-gray-400">
            <p>+1 (123) 456-7890</p>
          </CardContent>
        </Card>
        <Card className="text-white shadow-md">
          <CardHeader className="flex flex-col items-center">
            <FaEnvelope className="text-3xl text-tertiary-dark" />
          </CardHeader>
          <CardContent className="text-gray-400">
            <p>contact@yourgym.com</p>
          </CardContent>
        </Card>
      </section>

      <section className="bg-slate-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Send Us a Message
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Have a question? Fill out the form below and we’ll get back to you
            as soon as possible.
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input placeholder="Your Name" className="border border-slate-400" />
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
      </section>

      <section className="h-[50vh] w-full">
        <iframe
        className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d959.5809910240378!2d3.1697242792137943!3d6.5067139072535864!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x103b837cfebcc4af%3A0xf676fb7f22ff0b9e!2sBlaze%20Gym%20Fitness%2C%203%20Alhaji%20hammed%20abokede%20street%20off%20yahweh%20street%2Ccele%20bus%20stop%2C%20iyano%2C%20Iyana%20Isashi%20Rd%2C%20Ojo%2C%20Lagos%20100242!3m2!1d6.5069175!2d3.1695775999999998!5e0!3m2!1sen!2sng!4v1738712745878!5m2!1sen!2sng"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </section>
    </main>
  );
}
