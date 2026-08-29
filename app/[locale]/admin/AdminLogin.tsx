"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { loginAdmin } from "@/lib/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const result = await loginAdmin(password);

    setPending(false);

    if (!result.success) {
      setError(result.message ?? "შეცდომა");
      return;
    }

    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-5 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-black">ადმინ პანელი</h1>
          <p className="text-base text-gray-500">შეიყვანეთ ადმინ პაროლი</p>
        </div>

        <label className="block space-y-2">
          <span className="text-base font-medium text-black">პაროლი</span>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="h-11 text-base text-black border-gray-700 md:text-base"
            placeholder="პაროლი"
          />
        </label>

        {error ? <p className="text-base text-red-600">{error}</p> : null}

        <Button
          type="submit"
          disabled={pending}
          className="h-11 w-full cursor-pointer bg-[#203e72] text-base text-white hover:bg-[#203e72]/90"
        >
          {pending ? "შესვლა..." : "შესვლა"}
        </Button>
      </form>
    </main>
  );
}
