import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.scripture.api.bible/v1";
const API_KEY = "WzjaB-JEZ8K-j6b1j9hpO";

export async function GET() {
  const res = await fetch(`${API_URL}/bibles/de4e12af7f28f599-02/books`, {
    headers: { "api-key": API_KEY },
  });

  if (!res.ok) return NextResponse.json({ error: "Error al obtener libros" }, { status: res.status });

  const data = await res.json();
  return NextResponse.json(data.data);
}
