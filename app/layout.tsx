"use client";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BibleBottomMenu from "./components/BibleBottomMenu";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
      setLoading(false);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <body className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
          <p>Cargando aplicación...</p>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white pb-20`} // Deja espacio al final para el menú inferior
      >
        <main className="min-h-screen">{children}</main>

        {/* 🔹 Menú inferior visible solo si hay usuario logueado */}
        {user && <BibleBottomMenu />}
      </body>
    </html>
  );
}
