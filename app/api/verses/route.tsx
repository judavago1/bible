import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.scripture.api.bible/v1";
const API_KEY = "WzjaB-JEZ8K-j6b1j9hpO";

export async function GET(req: NextRequest) {
  const chapterId = req.nextUrl.searchParams.get("chapterId");
  if (!chapterId) return NextResponse.json({ error: "chapterId requerido" }, { status: 400 });

  const res = await fetch(`${API_URL}/bibles/de4e12af7f28f599-02/chapters/${chapterId}/verses`, {
    headers: { "api-key": API_KEY },
  });

  if (!res.ok) return NextResponse.json({ error: "Error al obtener versículos" }, { status: res.status });

  const data = await res.json();
  return NextResponse.json(data.data);
}
