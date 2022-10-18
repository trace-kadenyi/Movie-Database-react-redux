import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer_span text-muted">
        Copyright &copy; {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
