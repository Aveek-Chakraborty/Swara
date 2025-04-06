'use client'
import React, { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Set active link based on current path
    setActiveLink(window.location.pathname);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogposts" },
    { name: "Events", path: "/eventposts" },
    { name: "Videos", path: "/videoposts" },
    { name: "Services", path: "/serviceposts" },
    { name: "Contact us", path: "/contact" }
  ];

  return (
    <nav className={`fixed w-screen z-50 ${scrolled ? 'border-b border-gray-200 bg-white/80 shadow-sm' : 'border-b-op'}`}>
      <div className="flex justify-between items-center h-16 p-2 lg:p-10 backdrop-blur gap-4 lg:gap-14">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/">
            <img
              src="/SwaraLogo.png"
              alt="Swara Logo"
              className="transform transition-transform duration-500 hover:scale-105 mt-4 mb-3"
              width="80"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center space-x-6 gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`relative py-1 text-sm font-medium transition-colors duration-200 hover:text-green-500 ${activeLink === link.path ? 'text-green-500' : 'text-gray-700'
                }`}
            >
              {link.name}
              {activeLink === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500 rounded-full"></span>
              )}
            </a>
          ))}
          {/* <ThemeSwitcher /> */}
        </div>

        {/* Hamburger Icon - Keeping original logic but improving styling */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Keeping original sliding panel logic */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white/95 backdrop-blur shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 border-b border-gray-100">
          <button
            onClick={toggleMenu}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Links - Improved styling */}
        <div className="px-2 pt-4 pb-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-200 ${activeLink === link.path
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              {link.name}
              {activeLink === link.path && (
                <span className="float-right">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              )}
            </a>
          ))}
          {/* <ThemeSwitcher /> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;