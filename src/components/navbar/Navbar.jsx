import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
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
    <nav className="flex justify-between items-center px-6 md:px-10 py-5 bg-gray-800 text-gray-200 shadow-md">
      <div>
        <Link
          to={navLinks[0].path}
          className="text-3xl font-bold text-yellow-400"
        >
          {navLinks[0].title}
        </Link>
      </div>

      <div className="flex items-center gap-12">
        <ul className="flex gap-8">
          {navLinks.slice(1, -1).map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-lg transition-colors duration-300 ${
                    isActive ? "text-yellow-300" : "hover:text-yellow-300"
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div>
          <Link
            to={navLinks[4].path}
            className="relative text-lg text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
          >
            <FaShoppingCart size={24} />

            <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
