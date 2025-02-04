"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { Button } from "../ui/button";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    if (navbarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navbarOpen]);

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  const openNavbar = () => {
    setNavbarOpen(true);
  };

  return (
    <header className="sticky top-0 left-0 z-50 bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,0,0,0.7)] backdrop-blur-xl">
      <div className="h-[85px] lg:h-[100px] px-10 container mx-auto flex gap-5 items-center justify-between flex-wrap md:flex-nowrap text-xl">
        <div className="flex items-center">
          <Link href="/" className="font-black text-primary">
            Blaze Gym
          </Link>
        </div>

        <button onClick={openNavbar} className="md:hidden">
          <GiHamburgerMenu />
        </button>

        {/* Desktop View */}
        <ul className="hidden md:flex items-center gap-10 mt-4 md:mt-0">
          <li className="hover:border-b-4 border-primary hover:text-primary duration-300 transition-all">
            <Link href="/"> Home </Link>
          </li>

          <li className="hover:border-b-4 border-primary hover:text-primary duration-300 transition-all">
            <Link href="/"> About Us </Link>
          </li>

          <li className="hover:border-b-4 border-primary hover:text-primary duration-300 transition-all">
            <Link href="/"> Shop </Link>
          </li>

          <li className="hover:border-b-4 border-primary hover:text-primary duration-300 transition-all">
            <Link href="/"> Contact </Link>
          </li>

          <li className="text-white">
            <Link href="/">
              {" "}
              <Button className="text-lg py-7 px-7">
                Become a Member
              </Button>{" "}
            </Link>
          </li>
        </ul>

        {/* Mobile View */}
        {navbarOpen && (
          <div className="absolute top-0 right-0 isolate flex justify-end md:hidden w-full h-screen">
            <div className="max-w-[350px] w-full h-full bg-white shadow-xl">
              {/* Mobile Close Btn */}
              <button
                onClick={closeNavbar}
                className="py-7 w-full px-7 text-2xl shadow-lg shadow-slate-100"
              >
                <IoMdClose />
              </button>

              {/* Dark Background */}
              <div
                onClick={closeNavbar}
                className="absolute inset-0 bg-black/70 -z-10"
              />

              {/* Mobile Ul */}
              <ul className="">
                <Link href="/">
                  <li
                    onClick={closeNavbar}
                    className="p-7 hover:bg-slate-100 hover:text-primary hover:border-l-4 border-primary duration-500 transition-all"
                  >
                    Home
                  </li>
                </Link>

                <Link href="/">
                  <li
                    onClick={closeNavbar}
                    className="p-7 hover:bg-slate-100 hover:text-primary hover:border-l-4 border-primary duration-500 transition-all"
                  >
                    About Us
                  </li>
                </Link>

                <Link href="/">
                  <li
                    onClick={closeNavbar}
                    className="p-7 hover:bg-slate-100 hover:text-primary hover:border-l-4 border-primary duration-500 transition-all"
                  >
                    Shop
                  </li>
                </Link>

                <Link href="/">
                  <li
                    onClick={closeNavbar}
                    className="p-7 hover:bg-slate-100 hover:text-primary hover:border-l-4 border-primary duration-500 transition-all"
                  >
                    Contact
                  </li>
                </Link>

                <li className="text-white ml-7">
                  <Link href="/">
                    {" "}
                    <Button className="text-lg py-7 px-7">
                      Become a Member
                    </Button>{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
