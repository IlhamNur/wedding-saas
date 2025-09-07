"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function NewInvitationPage() {
  const supabase = supabaseBrowser();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [bride, setBride] = useState("");
  const [groom, setGroom] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.from("invitations").insert([
      {
        title,
        bride_name: bride,
        groom_name: groom,
        event_date: eventDate,
        slug,
      },
    ]);

    if (error) return setError(error.message);
    router.push("/dashboard/invitations");
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Buat Undangan Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Nama Mempelai Wanita"
          value={bride}
          onChange={(e) => setBride(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Nama Mempelai Pria"
          value={groom}
          onChange={(e) => setGroom(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 w-full"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Slug unik (contoh: budi-ani-2025)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
