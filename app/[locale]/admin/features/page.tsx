import { redirect } from "@/i18n/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCatalogItems } from "@/lib/actions/catalog";
import FeatureManager from "./FeatureManager";
import { Link } from "@/i18n/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(await isAdminAuthenticated())) {
    redirect({ href: "/admin", locale });
  }

  const items = await getCatalogItems();

  return (
    <main className="mt-32 pb-16">
      <div className="mx-auto max-w-5xl px-4">
        <Link href="/admin" className="text-base text-brand hover:underline">
          ← უკან ადმინ პანელზე
        </Link>
      </div>
      <FeatureManager items={items} />
    </main>
  );
}
