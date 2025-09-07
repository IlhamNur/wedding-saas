import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

type Invitation = {
  id: string;
  title: string | null;
  bride_name: string;
  groom_name: string;
  slug: string;
  created_at: string;
};

export default async function InvitationsPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: invitations } = await supabase
    .from("invitations")
    .select("*")
    .eq("owner", user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daftar Undangan</h2>
        <Link
          href="/dashboard/invitations/new"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          + Buat Baru
        </Link>
      </div>

      <ul className="space-y-2">
        {invitations?.map((inv: Invitation) => (
          <li
            key={inv.id}
            className="p-4 bg-white rounded shadow flex justify-between"
          >
            <div>
              <p className="font-semibold">
                {inv.title || `${inv.bride_name} & ${inv.groom_name}`}
              </p>
              <p className="text-sm text-gray-600">Slug: {inv.slug}</p>
            </div>
            <Link
              href={`/dashboard/invitations/${inv.id}`}
              className="text-blue-600 underline"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
