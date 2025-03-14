'use client'
import React, { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [animationComplete, setAnimationComplete] = useState(true);

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

  // Improved toggle menu logic with animation handling
  const toggleMenu = () => {
    if (animationComplete) {
      setAnimationComplete(false);
      setIsOpen(!isOpen);
      
      // Reset animation complete state after animation finishes
      setTimeout(() => {
        setAnimationComplete(true);
      }, 300); // Match this with your transition duration
    }
  };

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscKey = (event:any) => {
      if (event.key === "Escape" && isOpen) {
        toggleMenu();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogposts" },
    { name: "Events", path: "/eventposts" },
    { name: "Videos", path: "/videoposts" },
    { name: "Services", path: "#" },
    { name: "Contact us", path: "/contact" }
  ];

  return (
    <nav className={`fixed w-screen z-50 ${scrolled && !isOpen ? 'border-b border-gray-200 bg-white/80 shadow-sm' : ''}`}>
      <div className="flex justify-between items-center h-16 p-6 lg:p-10 backdrop-blur gap-4 lg:gap-14">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Logo
          </a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center space-x-6 gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.path}
              href={link.path} 
              className={`relative py-1 text-sm font-medium transition-colors duration-200 hover:text-blue-500 ${
                activeLink === link.path ? 'text-blue-500' : 'text-gray-700'
              }`}
            >
              {link.name}
              {activeLink === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"></span>
              )}
            </a>
          ))}
          {/* <ThemeSwitcher /> */}
        </div>
        
        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            disabled={!animationComplete}
            aria-expanded={isOpen}
            aria-label="Main menu"
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

      {/* Overlay - Improved for better slide animation effect */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 -z-10'
        }`}
        onClick={toggleMenu}
        aria-hidden="true"
      ></div>

      {/* Mobile Menu - Improved sliding animation */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out md:hidden z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          boxShadow: isOpen ? "-4px 0 15px rgba(0, 0, 0, 0.1)" : "none"
        }}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-medium text-gray-800">Menu</span>
          <button
            onClick={toggleMenu}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-gray-700"
            aria-label="Close main menu"
          >
            <svg
              className="w-5 h-5"
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

        {/* Mobile Links - With staggered entrance animation */}
        <div className="px-2 pt-4 pb-3 space-y-1 overflow-y-auto max-h-screen">
          {navLinks.map((link, index) => (
            <a 
              key={link.path}
              href={link.path} 
              className={`block px-3 py-2.5 rounded-md text-base font-medium transition-all duration-300 ease-in-out ${
                activeLink === link.path 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
              style={{ 
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
              onClick={toggleMenu}
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;