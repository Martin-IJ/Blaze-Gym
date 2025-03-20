import React from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const SocialMediaLinks = ({
  instagram,
  twitter,
  facebook,
  linkedin,
  tiktok,
  youtube,
  telegram,
  snapchat,
  discord,
  reddit,
  pinterest,
  github,
}) => {
  const socialIcon = [
    { icon: <FaInstagram />, url: instagram },
    { icon: <FaYoutube />, url: youtube },
    { icon: <FaTiktok />, url: tiktok },
  ];

  return (
    <div className="flex gap-5">
      {socialIcon.map(
        (icon, index) =>
          icon.url && (
            <a
              key={index}
              className="p-2 rounded-full bg-tertiary-dark text-white"
              href={icon.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon.icon}
            </a>
          )
      )}
    </div>
  );
};

export default SocialMediaLinks;
