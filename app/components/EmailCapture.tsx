"use client";
import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  // TODO: replace with your Mailchimp/Klaviyo form action
  const action = "https://example.com/subscribe";
  return (
    <form
      action={action}
      method="post"
      className="flex w-full max-w-md gap-2"
      onSubmit={(e) => {
        if (!email.includes("@")) e.preventDefault();
      }}
    >
      <input
        type="email"
        name="EMAIL"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="flex-1 rounded-xl border px-3 py-2"
      />
      <button className="rounded-xl bg-[#4A1F3D] px-4 py-2 text-white">
        Get early access
      </button>
    </form>
  );
}
