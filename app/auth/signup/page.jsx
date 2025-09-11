"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";

export default function SignupPage() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const { username, email, password } = form;

    if (!username.trim() || !email.trim() || password.length < 6) {
      showToast("All fields required (min password 6 chars).", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      await register(username.trim(), email.trim(), password);
      showToast("Account created!", "success");
      router.push("/profile");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="card max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="border rounded p-2 w-full"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          className="border rounded p-2 w-full"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="border rounded p-2 w-full"
          placeholder="Password"
          type="password"
          minLength={6}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          className="bg-brand-600 text-white px-4 py-2 rounded w-full disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating…" : "Create Account"}
        </button>
      </form>
    </div>
  );
}
