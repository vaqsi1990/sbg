"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useLocale } from "next-intl";

export default function SearchComponent() {
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); // მოაქვს მიმდინარე ენა: "ge" ან "en"

  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    setQuery(searchParams.get("query") || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // ვამოწმებთ არის თუ არა უკვე /[locale]/all
    const path = pathname.includes("/all") ? pathname : `/${locale}/all`;

    if (pathname !== path) {
      push(`${path}?${params.toString()}`);
    } else {
      replace(`${path}?${params.toString()}`);
    }
  }, 300);

  return (
    <div className="relative w-44 lg:w-52">
      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        className="h-9 pl-9 pr-3 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full backdrop-blur-sm focus-visible:ring-white/30"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
        <SearchIcon className="w-4 h-4" />
      </span>
    </div>
  );
}
