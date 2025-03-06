"use client";

import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import Logo from "../Logo/Logo";
import SocialMediaLinks from "../SocialMediaLinks/SocialMediaLinks";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [contactData, setContactData] = useState({});
  const [loading, setLoading] = useState(true);

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
        console.error("Error fetching contact details:", error);
        toast.error(
          error.message || "An error occurred while fetching contact details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-white/50">
      <div className="w-full h-[2px] mb-4 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="md:flex flex-wrap gap-16 justify-between space-y-16 md:space-y-0">
          <div className="flex-1">
            <div className="flex py-6">
              <Link href="/" className="font-black text-[30px] text-primary">
                <Logo />
              </Link>
            </div>
            <p className="text-sm">
              At Blaze Gym Fitness, we help you achieve your fitness goals with
              up-to-date equipment. Whether you&apos;re just starting out or a
              seasoned athlete, our gym offers high-intensity workouts. Join us
              and experience results like never before! 
            </p>
            <div className="mt-5 text-xl">
              {!loading && (
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
              )}
            </div>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-2xl lg:text-3xl py-6">
              Quick Links
            </h4>
            <Link href="/shop">
              <p className="pb-4 hover:text-primary">Shop</p>
            </Link>
            <Link href="/auth">
              <p className="pb-4 hover:text-primary">Login</p>
            </Link>
            <Link href="/gallery">
              <p className="pb-4 hover:text-primary">Gallery</p>
            </Link>
            <Link href="/about-us">
              <p className="pb-4 hover:text-primary">About Us</p>
            </Link>
            <Link href="/contact-us">
              <p className="pb-4 hover:text-primary">Contact Us</p>
            </Link>
            <Link href="/membership-plan">
              <p className="hover:text-primary">Membership Plans</p>
            </Link>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-2xl lg:text-3xl py-6">
              Working Hours
            </h4>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="font-semibold">
                    Monday - Saturday
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableCell>Morning Session</TableCell>
                  <TableCell>06:45 AM - 12:00 PM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Evening Session</TableCell>
                  <TableCell>05:00 PM - 09:00 PM</TableCell>
                </TableRow>

                <TableRow>
                  <TableHead className="font-semibold">Sunday</TableHead>
                </TableRow>
                <TableRow>
                  <TableCell>Morning Session</TableCell>
                  <TableCell>07:00 AM - 12:00 PM</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell>Evening Session</TableCell>
                  <TableCell>04:00 PM - 07:00 PM</TableCell>
                </TableRow> */}

                {/* <TableRow>
                  <TableCell>Closed</TableCell>
                  <TableCell>Sundays</TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="bg-primary py-2 md:py-4 text-center flex flex-wrap justify-center mt-5 items-center text-sm text-white">
        &copy; {currentYear} Blaze Gym Fitness. All Rights Reserved.{" "}
        <span className="text-slate-400 pl-1">
          Designed by{" "}
          <a
            className="underline"
            href="https://martinsohezportfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Martins
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
