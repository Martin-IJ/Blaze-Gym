import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import Logo from "../Logo/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="">
      <div className="w-full h-[2px] mb-4 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="md:flex flex-wrap gap-16 justify-between space-y-16 md:space-y-0">
          <div className="flex-1">
            <div className="flex py-6">
              <Link
                href="/"
                className="font-black text-[30px] text-primary"
              >
                <Logo />
              </Link>
            </div>
            <p className="text-sm">
              At Blaze Gym Fitness, we help you achieve your fitness goals with
              up-to-date equipment. Whether you&apos;re just starting out or a
              seasoned athlete, our gym offers high-intensity workouts. Join us
              and experience results like never before!
            </p>
            <div className="flex gap-5 mt-5 text-xl">
              <a
                className="p-2 rounded-full bg-tertiary-dark text-white"
                href="#"
                target="_blank"
              >
                <FaFacebook />
              </a>
              <a
                className="p-2 rounded-full bg-tertiary-dark text-white"
                href="#"
                target="_blank"
              >
                <FaXTwitter />
              </a>
              <a
                className="p-2 rounded-full bg-tertiary-dark text-white"
                href="#"
                target="_blank"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-[30px] py-6">Quick Links</h4>
            <p className="pb-4">FAQ</p>
            <p className="pb-4">Location</p>
            <p className="pb-4">Contact Us</p>
            <p className="pb-4">Get in Touch</p>
            <p className="">Membership Plans</p>
          </div>

          <Table className="flex-1">
            <h4 className="font-semibold text-[30px] py-6">Working Hours</h4>
            <TableBody>
              <TableHead className="font-semibold">Monday - Friday</TableHead>
              <TableRow>
                <TableCell>Morning Session</TableCell>
                <TableCell>07:00 AM - 12:00 PM</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Evening Session</TableCell>
                <TableCell>04:00 PM - 09:00 PM</TableCell>
              </TableRow>

              <TableHead className="font-semibold">Saturdays</TableHead>
              <TableRow>
                <TableCell>Morning Session</TableCell>
                <TableCell>09:00 AM - 12:00 PM</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Evening Session</TableCell>
                <TableCell>04:00 PM - 07:00 PM</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Closed</TableCell>
                <TableCell>Sundays</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Copyright */}
      <p className="bg-primary text-center flex justify-center mt-5 items-center text-sm h-10 text-white">
        &copy; {currentYear} Blaze Gym Fitness. All Rights Reserved.{" "}
        <span className="text-slate-400 pl-1">
          Designed by{" "}
          <a
            className="underline"
            href="https://martinsohezportfolio.vercel.app/"
            target="_blank"
          >
            Martins
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
