"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getChapters } from "@/lib/bibleApi";

interface Props {
  params: { bookId: string };
}

export default function ChaptersPage({ params }: Props) {
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getChapters(params.bookId)
      .then((data) => setChapters(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params.bookId]);

  if (loading) return <p className="p-4">Cargando capítulos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Capítulos</h1>
      <ul className="space-y-2">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link
              href={`/bible/chapters/${chapter.id}`}
              className="block p-3 bg-gray-100 rounded hover:bg-gray-200 transition"
            >
              {chapter.reference}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
