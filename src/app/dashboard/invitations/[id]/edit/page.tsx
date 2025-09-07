"use client";

import { useState } from "react";

export default function EditInvitationPage() {
  const [theme, setTheme] = useState("classic");

  return (
    <select
      className="border p-2 w-full"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="classic">Classic</option>
      <option value="elegant">Elegant</option>
      <option value="minimal">Minimal</option>
    </select>
  );
}
