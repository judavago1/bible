"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Search, Heart, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function BibleBottomMenu() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const menuItems = [
    { href: "/bible/verse", label: "Verso", icon: BookOpen },
    { href: "/bible/search", label: "Buscar", icon: Search },
    { href: "/bible/reflection", label: "Reflexión", icon: Heart },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-blue-700 text-white shadow-lg flex justify-around items-center py-2 sm:py-3 z-50">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center transition-colors ${
              isActive ? "text-yellow-300" : "text-white"
            }`}
          >
            <Icon size={22} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}

      <button
        onClick={handleLogout}
        className="flex flex-col items-center text-white hover:text-red-400 transition-colors"
      >
        <LogOut size={22} />
        <span className="text-xs mt-1">Salir</span>
      </button>
    </nav>
  );
}
