"use client";

import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function GuestbookForm({
  invitationId,
}: {
  invitationId: string;
}) {
  const supabase = supabaseBrowser();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .eq("invitation_id", invitationId)
      .order("created_at", { ascending: false });
    setMessages(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("guestbook")
      .insert([{ name, message, invitation_id: invitationId }]);
    if (!error) {
      setName("");
      setMessage("");
      fetchMessages();
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded shadow max-w-md w-full">
      <h2 className="text-lg font-bold mb-3">Buku Tamu</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Tulis ucapan..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Kirim
        </button>
      </form>

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {messages.map((m) => (
          <li key={m.id} className="border p-2 rounded">
            <p className="font-semibold">{m.name}</p>
            <p>{m.message}</p>\n{" "}
            <p className="text-xs text-gray-500">
              {new Date(m.created_at).toLocaleString("id-ID")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
