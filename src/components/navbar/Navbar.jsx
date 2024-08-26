import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    {
      id: 1,
      title: "LOGO",
      path: "/",
    },

    {
      id: 2,
      title: "HOME",
      path: "/",
    },

    {
      id: 3,
      title: "LOGO",
      path: "/",
    },

    {
      id: 4,
      title: "LOGO",
      path: "/",
    },
  ];

  return (
    <nav>
      <div>
        <Link to="/">{navLinks[0]}</Link>
      </div>

      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Navbar;
