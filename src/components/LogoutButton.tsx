"use client";

import { supabaseBrowser } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}
