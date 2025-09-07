import { ReactNode } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <h1 className="font-bold">WeddingSaaS Dashboard</h1>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
}
