import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaLinks = () => {
  const socialIcon = [
    { icon: <FaFacebook />, url: "#" },
    { icon: <FaXTwitter />, url: "#" },
    { icon: <FaInstagram />, url: "#" },
  ];

  return (
    <div className="flex gap-5">
      {socialIcon.map((icon, index) => (
        <a
          key={index}
          className="p-2 rounded-full bg-tertiary-dark text-white"
          href={icon.url}
          target="_blank"
        >
          {icon.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
