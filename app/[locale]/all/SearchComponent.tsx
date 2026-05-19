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
    <div className="relative w-full bg-white rounded-md mb-8">
      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        className="pl-10 pr-4"
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <SearchIcon className="w-5 h-5" />
      </span>
    </div>
  );
}
