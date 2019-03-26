import React, { Component } from "react";

const Footer = props => {
  return (
    <footer>
      <p className="footer-links">
        <a
          href="#"
          target="_blank"
        >
          About us
        </a>
        <span> / </span>
        <a href="mailto:" target="_blank">
          Need any help?
        </a>
        <span> / </span>
        <a href="https://twitter.com" target="_blank">
          Like us on Twitter
        </a>
        <span> / </span>
        <a href="#" target="_blank">
          Blog
        </a>
      </p>
      <p>
        &copy; 2019 <strong>Fashion YW</strong> - Fashion Image Search
      </p>
    </footer>
  );
};

export default Footer;
