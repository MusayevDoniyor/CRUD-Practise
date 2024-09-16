import React from "react";
import Navbar from "../../components/navbar/navbar";
import { useLocation } from "react-router-dom";

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
      title: "Cart",
      path: "/cart",
    },
  ];

  const location = useLocation();

  if (location.pathname !== "/login") {
    return (
      <header className="bg-gray-800 shadow-md">
        <Navbar navLinks={navLinks} />
      </header>
    );
  }

  return null;
}
