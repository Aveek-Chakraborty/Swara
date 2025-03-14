
'use client'
import React, { useState } from "react";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-screen border-b-op z-50">
        <div className="flex justify-between items-center h-16 p-10 backdrop-blur gap-[14rem]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              Logo
            </a>
          </div>
          {/* Desktop Menu */}
          <div className="hidden flex justify-center items-center md:flex space-x-6 gap-10">
            <a href="/" className="hover:text-blue-300">Home</a>
            <a href="/blogposts" className="hover:text-blue-300">Blogs</a>
            <a href="/eventposts" className="hover:text-blue-300">Events</a>
            <a href="/videoposts" className="hover:text-blue-300">Videos</a>
            <a href="#" className="hover:text-blue-300">Services</a>
            <a href="/contact" className="hover:text-blue-300">Contact us</a>
            {/* <ThemeSwitcher /> */}
          </div>
          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 backdrop-blur transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-black"
          >
            <svg
              className="w-8 h-8"
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

        {/* Mobile Links */}
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-zinc-50 hover:bg-opacity-40">
            Home
          </a>
          <a href="/blogposts" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-zinc-50 hover:bg-opacity-40">
            Blogs
          </a>
          <a href="/eventposts" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-zinc-50 hover:bg-opacity-40">
            Events
          </a>
          <a href="/videoposts" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-zinc-50 hover:bg-opacity-40">
            Videos
          </a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-zinc-50 hover:bg-opacity-40">
            Services
          </a>
          <a href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-zinc-50 hover:bg-opacity-40">
            Contact us
          </a>
          {/* <ThemeSwitcher /> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
