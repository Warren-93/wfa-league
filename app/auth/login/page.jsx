"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.usernameOrEmail.trim() || !form.password) {
      showToast("Please fill in both fields.", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await login(form.usernameOrEmail.trim(), form.password);
      showToast(`Welcome back, ${data.user.username}!`, "success");
      router.push("/profile");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="card max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="border rounded p-2 w-full"
          placeholder="Username or Email"
          value={form.usernameOrEmail}
          onChange={(e) => setForm({ ...form, usernameOrEmail: e.target.value })}
          required
        />
        <input
          className="border rounded p-2 w-full"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          className="bg-brand-600 text-white px-4 py-2 rounded w-full disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}
