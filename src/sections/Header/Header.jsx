import React from "react";
import Navbar from "../../components/navbar/navbar";

export default function Header() {
  const navLinks = [
    {
      id: 1,
      title: "LOGO",
      path: "/",
    },
    {
      id: 2,
      title: "Home",
      path: "/",
    },
    {
      id: 3,
      title: "Products",
      path: "/products",
    },
    {
      id: 4,
      title: "Users",
      path: "/users",
    },
    {
      id: 5,
      path: "/cart",
    },
  ];

  return (
    <header className="bg-gray-800 shadow-lg">
      <Navbar navLinks={navLinks} />
    </header>
  );
}
