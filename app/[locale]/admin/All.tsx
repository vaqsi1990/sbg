"use client";

import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { deleteProduct } from "@/lib/actions/actions";
import { ProductType } from "@/lib/ProductType";

const ITEMS_PER_PAGE = 10;

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

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const pageCount = Math.max(1, Math.ceil(productList.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [currentPage, pageCount]);

  const pageProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return productList.slice(start, start + ITEMS_PER_PAGE);
  }, [productList, currentPage]);

  const from = productList.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const to = Math.min(currentPage * ITEMS_PER_PAGE, productList.length);

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
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">ყველა პროდუქტი</h1>
        <p className="text-sm text-muted-foreground">
          {from}–{to} / {productList.length}
        </p>
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
                  პროდუქტი არ მოიძებნა.
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
                      {product.type}
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

      {productList.length > ITEMS_PER_PAGE && (
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
