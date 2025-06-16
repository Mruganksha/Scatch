import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-center py-4 mt-10 text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Scatch. All rights reserved.
    </footer>
  );
}

export default Footer;
