"use client";

import React, { useEffect, useState } from "react";
import { getBooks, getChapters, getVerses } from "@/lib/bibleApi";

export default function ReflectionPage() {
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Función para obtener un versículo aleatorio
  const fetchRandomVerse = async () => {
    try {
      // 1️⃣ Obtener libros
      const books = await getBooks();
      const randomBook = books[Math.floor(Math.random() * books.length)];

      // 2️⃣ Obtener capítulos
      const chapters = await getChapters(randomBook.id);
      const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];

      // 3️⃣ Obtener versículos
      const verses = await getVerses(randomChapter.id);
      const randomVerse = verses[Math.floor(Math.random() * verses.length)];

      // 4️⃣ Crear texto reflexivo
      const text = `📖 ${randomBook.name} ${randomChapter.reference} - Verso ${randomVerse.verse}: "${randomVerse.content}"\n\n💡 Reflexión: Recuerda aplicar este versículo en tu vida diaria y compartirlo con otros.`;
      setReflection(text);
    } catch (err: any) {
      setError(err.message || "Error al cargar reflexión");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomVerse();
  }, []);

  if (loading) return <p className="p-4">Cargando reflexión...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Reflexión Bíblica</h1>
      <div className="bg-yellow-50 p-4 rounded shadow">
        <p className="whitespace-pre-line">{reflection}</p>
      </div>

      <button
        onClick={fetchRandomVerse}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Obtener otra reflexión
      </button>
    </div>
  );
}
