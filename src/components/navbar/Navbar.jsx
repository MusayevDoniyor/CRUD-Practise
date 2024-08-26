import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ navLinks }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-gray-800 text-gray-200 shadow-md fixed w-full z-20 ">
      <div>
        <Link
          to={navLinks[0].path}
          className="text-3xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
        >
          {navLinks[0].title}
        </Link>
      </div>

      <div className="block md:hidden">
        {isMenuOpen ? (
          <FiX
            size={28}
            className="cursor-pointer text-white hover:text-yellow-300 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        ) : (
          <FiMenu
            size={28}
            className="cursor-pointer text-white hover:text-yellow-300 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
      </div>

      <div className="hidden md:flex items-center gap-6">
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

        <div className="flex gap-6 items-center ml-7">
          <div className="relative">
            <Link
              to={navLinks[4].path}
              className="text-lg text-yellow-400 hover:text-yellow-300 transition-colors duration-300 flex items-center"
            >
              <FaShoppingCart size={24} />
              <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                3
              </span>
            </Link>
          </div>

          <button
            className="text-base bg-yellow-400 text-gray-800 py-2 rounded-md transition-colors duration-300 font-semibold px-2"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Log out
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="z-10 absolute top-16 right-0 w-full h-fit max-w-xs bg-gray-800 text-gray-200 p-4 md:hidden rounded-b-md">
          <ul className="flex flex-col gap-6">
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

          <div className="flex flex-col gap-6 mt-6">
            <Link
              to={navLinks[4].path}
              className="relative text-lg text-yellow-400 hover:text-yellow-300 transition-colors duration-300 flex items-center"
            >
              <FaShoppingCart size={24} />

              <span className="absolute -top-2 left-4 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                3
              </span>
            </Link>

            <button
              className="text-xl bg-yellow-400 text-gray-800 py-2 rounded-md transition-colors duration-300 font-bold"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
