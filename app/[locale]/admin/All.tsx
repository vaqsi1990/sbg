"use client";

import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
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
    <div className="p-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-bold">ყველა პროდუქტი</h1>
        <p className="text-sm text-gray-600">
          {from}–{to} / {productList.length}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="text-left border-b">
              <th className="p-4">სურათი</th>
              <th className="p-4">სახელი</th>
              <th className="p-4">ტიპი</th>
              <th className="p-4 text-center">ქმედება</th>
            </tr>
          </thead>
          <tbody>
            {pageProducts.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  პროდუქტი არ მოიძებნა.
                </td>
              </tr>
            ) : (
              pageProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="w-12 h-12 relative rounded-full overflow-hidden">
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
                    <Link href={`/product/${product.id}`}>{product.titleKa}</Link>
                  </td>
                  <td className="p-4 text-gray-600">{product.type}</td>
                  <td className="p-4 flex justify-center gap-4">
                    <Link href={`/admin/edit/${product.id}`}>
                      <FaEdit className="text-blue-600 hover:text-blue-800 cursor-pointer" size={18} />
                    </Link>
                    <Button className="cursor-pointer" onClick={() => handleDelete(product.id)}>
                      <FaTrash className="cursor-pointer" size={18} />
                    </Button>
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
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[#203e72] px-3 text-sm text-[#203e72] transition hover:bg-[#203e72] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#203e72]"
          >
            <FaArrowLeft className="h-3 w-3" />
            <span className="hidden sm:inline">წინა</span>
          </button>

          {getPageNumbers(currentPage, pageCount).map((item, index) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className="px-1 text-gray-400">
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
                    ? "border-[#203e72] bg-[#203e72] text-white"
                    : "border-[#203e72]/30 text-[#203e72] hover:border-[#203e72] hover:bg-[#203e72] hover:text-white"
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
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[#203e72] px-3 text-sm text-[#203e72] transition hover:bg-[#203e72] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#203e72]"
          >
            <span className="hidden sm:inline">შემდეგი</span>
            <FaArrowRight className="h-3 w-3" />
          </button>
        </nav>
      )}
    </div>
  );
}
