"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../hooks/useToast";

export default function ProfilePage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("wfa_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const logout = () => {
    localStorage.removeItem("wfa_user");
    showToast("Logged out (mock)");
    router.push("/");
  };

  if (!user) return (
    <div className="card max-w-sm mx-auto">
      <p className="mb-2">You are not logged in.</p>
      <div className="flex gap-2">
        <a href="/auth/login" className="bg-brand-600 text-white px-4 py-2 rounded w-full text-center">Login</a>
        <a href="/auth/signup" className="bg-gray-200 px-4 py-2 rounded w-full text-center">Sign Up</a>
      </div>
    </div>
  );

  return (
    <div className="card max-w-md mx-auto space-y-3">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      {user.name && <p><strong>Name:</strong> {user.name}</p>}
      <div className="flex gap-2">
        <button onClick={()=>router.push("/teams/prem-1")} className="bg-gray-200 px-4 py-2 rounded w-full">My Team</button>
        <button onClick={()=>router.push("/players/p1")} className="bg-gray-200 px-4 py-2 rounded w-full">My Player</button>
      </div>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded w-full">Logout</button>
    </div>
  );
}
