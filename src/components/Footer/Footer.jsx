import React from "react";
import "./footer.css";
import logo from "../../media/logo.png";
import SocialLinks from "../Navbar/SocialLinks";
import { Link } from "react-router-dom";
export default function Footer() {
  const alphabets = Array.from({length: 26}, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
  const links = alphabets.map((el) => (
    <Link
      to={`/search?name=${el}&parameter=letter`}
      key={el}
      className="alphabet-tile"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      {el}
    </Link>
  ));

  return (
    <div className="footer-container d-flex-fd-column j-center">
      <div className="logo-social-links d-flex">
        <Link
          className="main-element"
          to="/"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <img src={logo} className="logo" />
        </Link>
        <SocialLinks />
      </div>
      <div className="help-text d-flex">
        <h2 className="main-element">A-Z List</h2>
        <span>Searching anime order by alphabet name A to Z.</span>
      </div>
      <div className="alphabet-list d-flex">{links}</div>
      <div className="copyright-text">
        <p>
          <strong><a href="#">AnimeZ</a></strong> Stream for free without ads! The source code is by <a
          target="_blank" rel="noopener noreferrer" href="https://github.com/viplove3541">Viplove Kale</a>. Credits to Jikan and Kitsu for the API.
        </p>
        <p>&copy; {new Date().getFullYear()} AnimeZ All rights reserved.</p>
      </div>
    </div>
  );
}

