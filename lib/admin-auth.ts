import { cookies } from "next/headers";

export const ADMIN_COOKIE = "sbg_admin";
const SESSION_MS = 60 * 60 * 24 * 7 * 1000;

function getSigningSecret() {
  return (
    process.env.JWT_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.ADMIN_PASSWORD ||
    ""
  );
}

async function hmacHex(secret: string, value: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createAdminToken() {
  const secret = getSigningSecret();
  if (!secret) return null;
  const expiresAt = String(Date.now() + SESSION_MS);
  const signature = await hmacHex(secret, expiresAt);
  return `${expiresAt}.${signature}`;
}

export async function verifyAdminToken(token: string | undefined) {
  if (!token) return false;
  const secret = getSigningSecret();
  if (!secret) return false;

  const separator = token.indexOf(".");
  if (separator <= 0) return false;

  const expiresAt = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!expiresAt || !signature) return false;
  if (Number(expiresAt) < Date.now()) return false;

  const expected = await hmacHex(secret, expiresAt);
  return safeEqual(signature, expected);
}

export function adminPasswordsMatch(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value);
}
