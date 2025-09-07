"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = supabaseBrowser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return setError(error.message);
      router.push("/dashboard");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return setError(error.message);
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          {mode === "login" ? "Login" : "Register"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded mb-2"
        >
          {mode === "login" ? "Login" : "Register"}
        </button>

        <p className="text-center text-sm">
          {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-blue-600 underline"
          >
            {mode === "login" ? "Daftar" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
