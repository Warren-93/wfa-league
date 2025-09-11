"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Trophy, Users, UserRound, List as ListIcon } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/fixtures", label: "Fixtures", icon: CalendarDays },
    { href: "/results", label: "Results", icon: ListIcon },
    { href: "/standings", label: "Standings", icon: Trophy },
    { href: "/teams", label: "Teams", icon: Users },
    { href: "/profile", label: "Profile", icon: UserRound },
    {href: "/admin", label: "Admin", icon: UserRound}
  ];
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t">
      <div className="flex justify-around py-2">
        {items.map((it) => {
          const ActiveIcon = it.icon;
          const active = pathname === it.href;
          return (
            <Link key={it.href} href={it.href} className={`flex flex-col items-center text-xs ${active ? "text-brand-600" : "text-gray-500"}`}>
              <ActiveIcon size={20} />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
