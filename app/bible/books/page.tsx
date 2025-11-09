"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    useEffect(() => {
      fetch("/api/books")
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((err) => setError(err.error || err.message))
        .finally(() => setLoading(false));
    }, []);


  if (loading) return <p className="p-4">Cargando libros...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Libros de la Biblia</h1>
      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.id}>
            <Link
              href={`/bible/books/${book.id}`}
              className="block p-3 bg-gray-100 rounded hover:bg-gray-200 transition"
            >
              {book.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
