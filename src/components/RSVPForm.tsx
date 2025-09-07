"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function RSVPForm({ invitationId }: { invitationId: string }) {
  const supabase = supabaseBrowser();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("rsvp")
      .insert([{ name, status, invitation_id: invitationId }]);
    if (!error) {
      setSuccess(true);
      setName("");
      setStatus("Hadir");
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded shadow max-w-md w-full">
      <h2 className="text-lg font-bold mb-3">Konfirmasi Kehadiran</h2>
      {success && (
        <p className="text-green-600 mb-2">Terima kasih sudah mengisi!</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className="border p-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Hadir</option>
          <option>Tidak Hadir</option>
          <option>Ragu-ragu</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
