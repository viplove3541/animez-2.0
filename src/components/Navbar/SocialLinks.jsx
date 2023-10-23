import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
export default function SocialLinks() {
  return (
    <div className="social-links-wrapper">
      <span
        style={{ backgroundColor: "#000000" }}
        className="d-flex a-center j-center"
      >
        <a
          href="https://github.com/viplove3541"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={22} />
        </a>
      </span>
      <span
        style={{ backgroundColor: "#0072b1" }}
        className="d-flex a-center j-center"
      >
        <a
          href="https://www.linkedin.com/in/viplove-kale-42032283/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={22} />
        </a>
      </span>
      <span
        style={{ backgroundColor: "#fd1d1d" }}
        className="d-flex a-center j-center"
      >
        <a
          href="https://www.instagram.com/viplove_18/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram size={22} />
        </a>
      </span>
      <span
        style={{ backgroundColor: "#1d9bf0" }}
        className="d-flex a-center j-center"
      >
        <a
          href="https://www.facebook.com/viplove.kale1"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF size={22} />
        </a>
      </span>
    </div>
  );
}
