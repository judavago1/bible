"use client";

import React, { useEffect, useState } from "react";
import { getVerses } from "@/lib/bibleApi";

interface Props {
  params: { chapterId: string };
}

export default function VersesPage({ params }: Props) {
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getVerses(params.chapterId)
      .then((data) => setVerses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params.chapterId]);

  if (loading) return <p className="p-4">Cargando versículos...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Versículos</h1>
      <ul className="space-y-2">
        {verses.map((verse) => (
          <li key={verse.id} className="p-2 bg-gray-100 rounded">
            <strong>{verse.verse}</strong>: {verse.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
