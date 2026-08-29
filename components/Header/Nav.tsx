"use client";

import React, { Suspense, useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { FiMenu, FiX } from "react-icons/fi";
import LocalLanguage from "./language";
import { ThemeToggle } from "../theme-toggle";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Search from "./Search";
import { cn } from "@/lib/utils";

function useHeaderLinks() {
  const t = useTranslations("navitems");

  const pageLinks = [
    { label: t("aboutUs"), href: "/about" },
    { label: t("why"), href: "/why" },
    { label: t("catalogue"), href: "/catalogue" },
    { label: t("gallery"), href: "/gallery" },
  ];

  const productLinks = [
    { label: t("matrass"), href: "/matrass" },
    { label: t("pillows"), href: "/pillows" },
    { label: t("textile"), href: "/blanket" },
    { label: t("furniture"), href: "/furniture" },
    { label: t("toper"), href: "/toper" },
  ];

  return { pageLinks, productLinks };
}

export function PageLinks({ className }: { className?: string }) {
  const { pageLinks } = useHeaderLinks();

  return (
    <nav className={cn("flex items-center gap-5 lg:gap-7 xl:gap-9", className)}>
      {pageLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="whitespace-nowrap text-base lg:text-lg font-medium text-white transition-colors hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function ProductBar() {
  const { productLinks } = useHeaderLinks();

  return (
    <nav className="border-t border-white/10">
      <div className="container flex items-center justify-start md:justify-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {productLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 whitespace-nowrap md:text-[18px] text-[16px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default function MobileNav() {
  const t = useTranslations("navitems");
  const pathname = usePathname();
  const locale = useLocale();
  const menuId = useId();
  const { pageLinks, productLinks } = useHeaderLinks();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) closeMenu();
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [closeMenu]);

  const mobileMenu =
    mounted &&
    createPortal(
      <div
        className={cn(
          "fixed inset-0 z-[100] lg:hidden",
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
              {pageLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-border py-4 text-xl font-semibold text-brand"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <p className="pt-6 pb-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {t("products")}
              </p>
              {productLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-border py-3 text-lg text-foreground hover:text-brand"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
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
    <>
      <button
        type="button"
        onClick={() => setMobileMenuOpen((open) => !open)}
        className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        aria-controls={menuId}
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      {mobileMenu}
    </>
  );
}
