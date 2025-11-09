"use client";
import { useEffect, useState } from "react";
import { getBooks } from "@/lib/bibleApi";

interface Book {
  id: string;
  name: string;
  abbreviation: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p className="text-center mt-10">⏳ Cargando libros...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">📖 Libros de la Biblia</h1>
      <ul className="space-y-2">
        {books.map((book) => (
          <li
            key={book.id}
            className="border p-3 rounded hover:bg-blue-50 cursor-pointer"
          >
            {book.name} ({book.abbreviation})
          </li>
        ))}
      </ul>
    </div>
  );
}
