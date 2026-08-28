"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import LocalSwitcher from "../switcher";
import Search from "./Search";
import ShiftingDropDown from "./Nav";
import logo from "@/public/about/axali.jpg";

export default function HeaderShell() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#203e72] shadow-md">
      <div className="container flex items-center justify-between gap-4 px-4 py-2">
        <Link className="shrink-0 p-1" href="/">
          <div className="rounded-full ring-2 ring-white/20 overflow-hidden">
            <Image src={logo} height={56} width={56} alt="Sleep & Bed Georgia" className="rounded-full" />
          </div>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-start min-w-0">
          <ShiftingDropDown />
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Search />
          <LocalSwitcher />
        </div>
      </div>
    </header>
  );
}
