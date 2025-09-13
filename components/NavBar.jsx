"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function NavBar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();

  if (loading) return null; // prevent flash of "logged out" before state loads

  // Base links (always visible)
  const items = [
    { href: "/", label: "Home" },
    { href: "/fixtures", label: "Fixtures" },
    { href: "/results", label: "Results" },
    { href: "/standings", label: "Standings" },
    { href: "/teams", label: "Teams" },
    { href: "/players", label: "Players" },
  ];

  // If logged in, add Profile
  if (user) {
    items.push({ href: "/profile", label: "Profile" });
  } else {
    items.push({ href: "/login", label: "Profile" });
  }

  // If user is team-admin or league-admin, add Admin
  if (user && (user.role === "team-admin" || user.role === "league-admin")) {
    items.push({ href: "/admin", label: "Admin" });
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-brand-600 text-white shadow">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="font-bold text-lg">
          WFA
        </Link>
        <div className="hidden md:flex gap-2 items-center">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === it.href
                  ? "bg-brand-800"
                  : "hover:bg-brand-700"
              }`}
            >
              {it.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={logout}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-brand-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
