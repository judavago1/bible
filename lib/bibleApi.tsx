// 📁 lib/bibleApi.tsx
const API_URL = "https://api.scripture.api.bible/v1";
const API_KEY = "WzjaB-JEZ8K-j6b1j9hpO"; // ✅ Tu API Key

// 📘 Obtener todos los libros
export async function getBooks() {
  const res = await fetch(`${API_URL}/bibles/de4e12af7f28f599-02/books`, {
    headers: { "api-key": API_KEY },
  });
  if (!res.ok) throw new Error("Error al obtener libros");
  const data = await res.json();
  return data.data;
}

// 📖 Obtener capítulos de un libro
export async function getChapters(bookId: string) {
  const res = await fetch(
    `${API_URL}/bibles/de4e12af7f28f599-02/books/${bookId}/chapters`,
    { headers: { "api-key": API_KEY } }
  );
  if (!res.ok) throw new Error("Error al obtener capítulos");
  const data = await res.json();
  return data.data;
}

// 📜 Obtener versículos de un capítulo
export async function getVerses(chapterId: string) {
  const res = await fetch(
    `${API_URL}/bibles/de4e12af7f28f599-02/chapters/${chapterId}/verses`,
    { headers: { "api-key": API_KEY } }
  );
  if (!res.ok) throw new Error("Error al obtener versículos");
  const data = await res.json();
  return data.data;
}

// 🔍 Buscar texto en la Biblia
export async function searchBible(query: string) {
  const res = await fetch(
    `${API_URL}/bibles/de4e12af7f28f599-02/search?query=${encodeURIComponent(
      query
    )}`,
    { headers: { "api-key": API_KEY } }
  );
  if (!res.ok) throw new Error("Error en la búsqueda");
  const data = await res.json();
  return data.data;
}
