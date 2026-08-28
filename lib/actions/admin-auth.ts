"use server";

import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import {
  ADMIN_COOKIE,
  adminPasswordsMatch,
  createAdminToken,
} from "@/lib/admin-auth";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export async function loginAdmin(password: string) {
  if (!process.env.ADMIN_PASSWORD) {
    return { success: false, message: "ADMIN_PASSWORD is not configured" };
  }

  if (!adminPasswordsMatch(password)) {
    return { success: false, message: "არასწორი პაროლი" };
  }

  const token = await createAdminToken();
  if (!token) {
    return { success: false, message: "Could not create admin session" };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, cookieOptions);
  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  const locale = await getLocale();
  redirect({ href: "/admin", locale });
}
