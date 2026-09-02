"use client";

import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { deleteProduct } from "@/lib/actions/actions";
import { ProductType } from "@/lib/ProductType";

const ITEMS_PER_PAGE = 10;

const CATEGORIES: { value: ProductType["type"] | "ALL"; label: string }[] = [
  { value: "ALL", label: "ყველა" },
  { value: "MATTRESS", label: "მატრასი" },
  { value: "PILLOW", label: "ბალიში" },
  { value: "QUILT", label: "საბანი" },
  { value: "FURNITURE", label: "ავეჯი" },
  { value: "PAD", label: "ტოპერი" },
];

const TYPE_LABEL: Record<ProductType["type"], string> = {
  MATTRESS: "მატრასი",
  PILLOW: "ბალიში",
  QUILT: "საბანი",
  FURNITURE: "ავეჯი",
  PAD: "ტოპერი",
};

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

const pagerBtn =
  "inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-foreground transition hover:border-brand-chrome hover:bg-brand-chrome hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-card disabled:hover:text-foreground";

export default function All({ products }: { products: ProductType[] }) {
  const [productList, setProductList] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<ProductType["type"] | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return productList.filter((product) => {
      if (category !== "ALL" && product.type !== category) return false;
      if (!query) return true;

      return (
        product.titleKa.toLowerCase().includes(query) ||
        product.titleEn.toLowerCase().includes(query)
      );
    });
  }, [productList, category, searchQuery]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [currentPage, pageCount]);

  const pageProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const from = filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const to = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const result = await deleteProduct(id);

    if (result.success) {
      setProductList((prev) => prev.filter((product) => product.id !== id));
      alert("Product deleted successfully");
    } else {
      alert("Error deleting product: " + result.message);
    }
  };

  return (
    <div className="px-4 py-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-bold text-foreground">ყველა პროდუქტი</h1>
          <p className="text-sm text-muted-foreground">
            {from}–{to} / {filteredProducts.length}
          </p>
        </div>
        <div className="relative w-full max-w-md">
          <Input
            type="search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="ძებნა სახელით (KA / EN)..."
            aria-label="ძებნა პროდუქტის სახელით"
            className="h-11 pl-10 pr-4 border-border bg-card text-foreground placeholder:text-muted-foreground"
          />
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((item) => {
            const isActive = category === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setCategory(item.value);
                  setCurrentPage(1);
                }}
                className={`inline-flex cursor-pointer items-center rounded-md border px-4 py-2 text-sm font-medium uppercase tracking-wide transition ${
                  isActive
                    ? "border-brand-chrome bg-brand-chrome text-white"
                    : "border-border bg-card text-foreground hover:border-brand-chrome hover:bg-brand-chrome hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card text-card-foreground shadow-sm dark:bg-muted/50 dark:shadow-none">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border bg-muted/60 text-left text-sm font-semibold text-muted-foreground">
              <th className="p-4">სურათი</th>
              <th className="p-4">სახელი</th>
              <th className="p-4">ტიპი</th>
              <th className="p-4 text-center">ქმედება</th>
            </tr>
          </thead>
          <tbody>
            {pageProducts.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  {searchQuery.trim() ? "პროდუქტი ამ სახელით არ მოიძებნა." : "პროდუქტი არ მოიძებნა."}
                </td>
              </tr>
            ) : (
              pageProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border last:border-0 transition hover:bg-muted/40"
                >
                  <td className="p-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-border">
                      <Image
                        src={product.images?.[0] ?? "/placeholder.jpg"}
                        alt={product.titleKa}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    <Link
                      href={`/product/${product.id}`}
                      className="text-foreground transition hover:text-brand"
                    >
                      {product.titleKa}
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {TYPE_LABEL[product.type]}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/edit/${product.id}`}
                        aria-label="რედაქტირება"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-chrome/10 text-brand-chrome transition hover:bg-brand-chrome hover:text-white dark:bg-brand/15 dark:text-brand dark:hover:bg-brand dark:hover:text-background"
                      >
                        <FaEdit size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        aria-label="წაშლა"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive transition hover:bg-destructive hover:text-white"
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredProducts.length > ITEMS_PER_PAGE && (
        <nav
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
          aria-label="პროდუქტების გვერდები"
        >
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage <= 1}
            aria-label="წინა გვერდი"
            className={pagerBtn}
          >
            <FaArrowLeft className="h-3 w-3" />
            <span className="hidden sm:inline">წინა</span>
          </button>

          {getPageNumbers(currentPage, pageCount).map((item, index) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className="px-1 text-muted-foreground">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => setCurrentPage(item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm transition ${
                  item === currentPage
                    ? "border-brand-chrome bg-brand-chrome text-white"
                    : "border-border bg-card text-foreground hover:border-brand-chrome hover:bg-brand-chrome hover:text-white"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
            disabled={currentPage >= pageCount}
            aria-label="შემდეგი გვერდი"
            className={pagerBtn}
          >
            <span className="hidden sm:inline">შემდეგი</span>
            <FaArrowRight className="h-3 w-3" />
          </button>
        </nav>
      )}
    </div>
  );
}
