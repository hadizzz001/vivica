'use client';

import { useState, useEffect } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
  FaBars
} from "react-icons/fa6";
import { HiX } from "react-icons/hi"; // Close icon
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Services', 'Contact'];
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  const getHref = (item) => (item === 'Home' ? '/' : `/${item.toLowerCase()}`);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? `bg-white shadow-md ${isHome ? 'pt-[7em]' : 'pt-[1em]'}` 
          : `bg-gradient-to-b from-black/70 to-transparent ${isHome ? 'pt-[7em]' : 'pt-[3em]'}`
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 flex items-center justify-between">
        {/* PC NAV */}
        <div className="hidden md:flex w-full items-center justify-center relative">
          <div className="absolute left-0 flex space-x-4">
            <a href="mailto:info@viv.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className={`text-lg ${scrolled ? 'text-black' : 'text-white'} cursor-pointer`} />
            </a>
            <a href="https://wa.me/+9613460293" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className={`text-lg ${scrolled ? 'text-black' : 'text-white'} cursor-pointer`} />
            </a>
            <a href="https://www.facebook.com/p/Vivica-Events-61553580276959/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className={`text-lg ${scrolled ? 'text-black' : 'text-white'} cursor-pointer`} />
            </a>
            <a href="https://www.tiktok.com/@vivicaevents" target="_blank" rel="noopener noreferrer">
              <FaTiktok className={`text-lg ${scrolled ? 'text-black' : 'text-white'} cursor-pointer`} />
            </a>
            <a href="https://www.instagram.com/vivicaevents" target="_blank" rel="noopener noreferrer">
              <FaInstagram className={`text-lg ${scrolled ? 'text-black' : 'text-white'} cursor-pointer`} />
            </a>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
            <ul className="flex space-x-8 list-none">
              {leftItems.map((item) => (
                <li key={item}>
                  <Link
                    href={getHref(item)}
                    className={`uppercase font-light text-lg transition-colors ${
                      scrolled ? 'text-black' : 'text-white'
                    } hover:text-blue-600`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex-shrink-0 transition-all duration-300 mt-3">
              <Link href="/">
                <img
                  src={
                    scrolled
                      ? "https://res.cloudinary.com/duln5xyix/image/upload/v1760189999/logo_glxbls.webp"
                      : "https://res.cloudinary.com/duln5xyix/image/upload/v1760189999/white_tq7ghw.webp"
                  }
                  alt="Logo"
                  width={scrolled ? 80 : 160}
                  height={scrolled ? 30 : 60}
                  className="object-contain"
                />
              </Link>
            </div>

            <ul className="flex space-x-8">
              {rightItems.map((item) => (
                <li key={item}>
                  <Link
                    href={getHref(item)}
                    className={`uppercase font-light text-lg transition-colors ${
                      scrolled ? 'text-black' : 'text-white'
                    } hover:text-blue-600`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className="flex md:hidden justify-between items-center w-full myMobnav">
          <Link href="/">
            <img
              src={
                scrolled
                  ? "https://res.cloudinary.com/duln5xyix/image/upload/v1760189999/logo_glxbls.webp"
                  : "https://res.cloudinary.com/duln5xyix/image/upload/v1760189999/white_tq7ghw.webp"
              }
              alt="Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </Link>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-3xl focus:outline-none z-50 relative"
          >
            {menuOpen ? <HiX className="text-black" /> : <FaBars className={`${scrolled ? 'text-black' : 'text-white'}`} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item}
            href={getHref(item)}
            onClick={() => setMenuOpen(false)}
            className="uppercase text-xl text-gray-800 font-semibold mb-6 hover:text-blue-600"
          >
            {item}
          </Link>
        ))}

        <div className="flex space-x-5 mt-4">
          {/* Mobile-only black icons with links */}
          <a href="https://wa.me/+9613460293" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-2xl text-black" />
          </a>
          <a href="https://www.facebook.com/p/Vivica-Events-61553580276959/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-2xl text-black" />
          </a>
          <a href="https://www.tiktok.com/@vivicaevents" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="text-2xl text-black" />
          </a>
          <a href="https://www.instagram.com/vivicaevents" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl text-black" />
          </a>
          <a href="mailto:info@viv.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="text-2xl text-black" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
