"use client";

import React, { useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import LocalLanguage from "./language";
import { ThemeToggle } from "../theme-toggle";
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
    const timeout = setTimeout(() => setHovered(null), 200);
    setSubmenuCloseTimeout(timeout);
  };

  return (
    <nav className="w-full text-white">
      <div className="flex items-center justify-between md:justify-start md:px-2">
        <div className="hidden md:flex gap-8">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.link}
                className="flex items-center gap-1.5 text-[15px] lg:text-[17px] font-medium text-white/90 hover:text-white transition-colors"
              >
                {item.label}
                {item.children && (
                  <FiChevronDown
                    className={`transition-transform duration-200 ${hovered === index ? "rotate-180" : ""}`}
                  />
                )}
              </Link>

              {hovered === index && item.children && (
                <div
                  className="absolute left-0 top-full mt-3 w-52 rounded-xl bg-popover p-2 shadow-xl ring-1 ring-border"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.children.map((child, idx) => (
                    <Link
                      key={idx}
                      href={child.link}
                      className="block rounded-lg px-4 py-2.5 text-[15px] text-popover-foreground hover:bg-surface-muted hover:text-brand transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 md:hidden bg-surface">
          <div className="flex flex-col h-full overflow-y-auto px-6 py-8">
            {navItems.map((item, index) => (
              <div key={index} className="border-b border-border last:border-0">
                <Link
                  href={item.link}
                  className="block py-4 text-lg font-semibold text-brand"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pb-4 pl-4 space-y-1">
                    {item.children.map((child, idx) => (
                      <Link
                        key={idx}
                        href={child.link}
                        className="block py-2.5 text-[15px] text-muted-foreground hover:text-brand transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4">
              <ThemeToggle variant="menu" />
              <LocalLanguage />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
