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
  const locale = useLocale();

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

    const path = pathname.includes("/all") ? pathname : `/${locale}/all`;

    if (pathname !== path) {
      push(`${path}?${params.toString()}`);
    } else {
      replace(`${path}?${params.toString()}`);
    }
  }, 300);

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        className="h-11 pl-10 pr-4 rounded-full border-border bg-card text-foreground placeholder:text-muted-foreground"
      />
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
        <SearchIcon className="w-4 h-4" />
      </span>
    </div>
  );
}
