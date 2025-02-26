import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
    { icon: <FaFacebook />, url: facebook },
    { icon: <FaXTwitter />, url: twitter },
    { icon: <FaInstagram />, url: instagram },,
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
