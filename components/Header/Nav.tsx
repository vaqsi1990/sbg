"use client";

import React, { useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import LocalLanguage from "./language";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";


export default function Navbar() {
  const t = useTranslations("navitems");

  const navItems = [
    {
      label: t("products"),
      link: "/all",
      children: [
        { label: t("pillows"), link: "/pillows" },
        { label: t("blanket"), link: "/blanket" },
        { label: t("matrass"), link: "/matrass" },
        { label: t("toper"), link: "/toper" },
        { label: t("catalogue"), link: "/catalogue" },
      ],
    },
    {
      label: t("aboutUs"),
      link: "/about",
      children: [
        { label: t("whySleepAndBed"), link: "/why" },
        { label: t("gallery"), link: "/gallery" },
      ],
    },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [submenuCloseTimeout, setSubmenuCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (submenuCloseTimeout) {
      clearTimeout(submenuCloseTimeout);
      setSubmenuCloseTimeout(null);
    }
    setHovered(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHovered(null);
    }, 200); 
    setSubmenuCloseTimeout(timeout);
  };

  return (
    <nav className="fixed z-50 w-full text-white">
      <div className="flex items-center justify-between mx-auto px-6">
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.link}
                className="flex text-[18px] items-center gap-2 hover:text-gray-300"
              >
                {item.label}
                {item.children && (
                  <FiChevronDown
                    className={`transition ${
                      hovered === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Submenu */}
              {hovered === index && item.children && (
                <div
                  className="absolute left-0 top-full mt-2 w-48 shadow-md bg-[#EBEBEB] p-4 rounded-md"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.children.map((child, idx) => (
                    <Link
                      key={idx}
                      href={child.link}
                      className="relative block text-center py-2 text-[16px] text-black hover:underline"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
      
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-auto"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute -top-8 -right-6  w-full h-[1200px] bg-[#EBEBEB] flex flex-col gap-4 shadow-l">
          <button onClick={() => setMobileMenuOpen(false)} className="self-end">
            <FiX className="text-black mt-5 mr-9" size={24} />
          </button>
          {navItems.map((item, index) => (
            <div key={index} className="w-full px-3">
              <Link
                href={item.link}
                className="block text-center py-3 text-black text-lg border-b border-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4 mt-2">
                  {item.children.map((child, idx) => (
                    <Link
                      key={idx}
                      href={child.link}
                      className="block text-center py-2 text-black text-[16px] hover:underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
              <LocalLanguage />
        </div>
      )}
    </nav>
  );
}
