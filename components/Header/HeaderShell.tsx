"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import LocalSwitcher from "../switcher";
import Search from "./Search";
import MobileNav, { PageLinks, ProductBar } from "./Nav";
import { ThemeToggle } from "../theme-toggle";
import logo from "@/public/about/axali.jpg";

export default function HeaderShell() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-chrome/95 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="container flex items-center justify-between gap-3 px-4 py-2 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div className="hidden min-w-0 lg:flex lg:justify-self-start">
          <PageLinks />
        </div>

        <Link href="/" className="shrink-0 p-1 lg:justify-self-center">
          <div className="rounded-full ring-2 ring-white/20 overflow-hidden">
            <Image
              src={logo}
              height={80}
              width={80}
              alt="Sleep & Bed Georgia"
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover"
            />
          </div>
        </Link>

        <div className="flex items-center justify-end gap-3 shrink-0 lg:justify-self-end">
          <div className="hidden lg:flex items-center gap-3">
            <Search />
            <ThemeToggle />
            <LocalSwitcher />
          </div>
          <MobileNav />
        </div>
      </div>

      <div className="hidden lg:block">
        <ProductBar />
      </div>
    </header>
  );
}
