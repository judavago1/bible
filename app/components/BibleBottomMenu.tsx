"use client";

import { BookOpen, Search, Heart, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function BibleBottomMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Aquí puedes limpiar cookies, localStorage o cualquier estado de login
    router.push("/login");
  };

  const menuItems = [
    { name: "Books", href: "/books", icon: BookOpen },
    { name: "Buscar", href: "/search", icon: Search },
    { name: "Favoritos", href: "/favorites", icon: Heart },
    { name: "Perfil", href: "/user", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2 md:hidden z-50">
      {menuItems.map(({ name, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={name}
            href={href}
            className={`flex flex-col items-center text-xs ${
              active ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Icon size={22} />
            <span>{name}</span>
          </Link>
        );
      })}

      {/* Botón de salir */}
      <button
        onClick={handleLogout}
        className="flex flex-col items-center text-xs text-red-500"
      >
        <LogOut size={22} />
        <span>Salir</span>
      </button>
    </nav>
  );
}
