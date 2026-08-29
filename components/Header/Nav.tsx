"use client";

import React, { Suspense, useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import LocalLanguage from "./language";
import { ThemeToggle } from "../theme-toggle";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Search from "./Search";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const t = useTranslations("navitems");
  const pathname = usePathname();
  const locale = useLocale();
  const menuId = useId();

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
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [submenuCloseTimeout, setSubmenuCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, locale, closeMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen, closeMenu]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) closeMenu();
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [closeMenu]);

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

  const mobileMenu =
    mounted &&
    createPortal(
      <div
        className={cn(
          "fixed inset-0 z-[100] md:hidden",
          mobileMenuOpen ? "visible" : "invisible pointer-events-none"
        )}
        aria-hidden={!mobileMenuOpen}
        {...(!mobileMenuOpen ? { inert: true } : {})}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          aria-label="Close menu"
          onClick={closeMenu}
        />
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={cn(
            "absolute inset-y-0 right-0 flex h-full w-full max-w-sm flex-col bg-surface shadow-2xl transition-transform duration-300 ease-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <p className="text-lg font-semibold text-foreground">{t("menu")}</p>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-lg p-2 text-foreground hover:bg-surface-muted transition-colors"
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-5">
            <div className="mb-6">
              <Suspense fallback={<div className="h-10 rounded-full bg-muted" />}>
                <Search variant="menu" />
              </Suspense>
            </div>

            <nav className="flex flex-col">
              {navItems.map((item, index) => {
                const isOpen = openSection === index;
                return (
                  <div key={item.link} className="border-b border-border last:border-0">
                    <div className="flex items-center">
                      <Link
                        href={item.link}
                        className="flex-1 py-4 text-lg font-semibold text-brand"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          className="rounded-lg p-2 text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                          onClick={() => setOpenSection(isOpen ? null : index)}
                        >
                          <FiChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform duration-200",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>
                      )}
                    </div>
                    {item.children && isOpen && (
                      <div className="pb-4 pl-3 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.link}
                            href={child.link}
                            className="block rounded-lg py-2.5 px-3 text-[15px] text-muted-foreground hover:bg-surface-muted hover:text-brand transition-colors"
                            onClick={closeMenu}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto pt-8 flex items-center justify-between gap-4">
              <ThemeToggle variant="menu" />
              <LocalLanguage />
            </div>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <nav className="w-full text-white">
      <div className="flex items-center justify-between md:justify-start md:px-2">
        <div className="hidden md:flex gap-8">
          {navItems.map((item, index) => (
            <div
              key={item.link}
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
                  {item.children.map((child) => (
                    <Link
                      key={child.link}
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
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="md:hidden ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls={menuId}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {mobileMenu}
    </nav>
  );
}
