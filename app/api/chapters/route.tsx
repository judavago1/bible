import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.scripture.api.bible/v1";
const API_KEY = "WzjaB-JEZ8K-j6b1j9hpO";

export async function GET(req: NextRequest) {
  const bookId = req.nextUrl.searchParams.get("bookId");
  if (!bookId) return NextResponse.json({ error: "bookId requerido" }, { status: 400 });

  const res = await fetch(`${API_URL}/bibles/de4e12af7f28f599-02/books/${bookId}/chapters`, {
    headers: { "api-key": API_KEY },
  });

  if (!res.ok) return NextResponse.json({ error: "Error al obtener capítulos" }, { status: res.status });

  const data = await res.json();
  return NextResponse.json(data.data);
}
