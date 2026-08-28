import AdminHelper from "./AdminHelper";
import AdminLogin from "./AdminLogin";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function Page() {
  const isAdmin = await isAdminAuthenticated();

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return <AdminHelper />;
}
