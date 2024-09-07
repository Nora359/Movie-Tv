// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>© 2024 All Rights Reserved</p>
      <p>Created by Your Nora Khaled</p> 
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#91",
  color: "#fff",
  textAlign: "center",
  padding: "10px 0",
  marginTop: "auto", 
};

export default Footer;
