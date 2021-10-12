import React from "react";
const phantomStyle = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%",
  
};

function Footer() {

  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div>Copyright ⓒ {year}</div>
    </footer>
  );
}

export default Footer;

// style={{pointerEvents: "none"}}