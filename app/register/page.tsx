"use client";
// 👆 Este componente se ejecuta del lado del cliente (navegador)

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; 
// 👆 Importamos el cliente de Supabase que configuramos en /lib

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // 📦 Estados para los campos del formulario
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ⚙️ Maneja el registro del usuario
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 👈 Evita recargar la página

    // 🚀 1️⃣ Registrar usuario en el sistema de autenticación de Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setMessage("❌ Error en registro: " + authError.message);
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      setMessage("⚠️ No se pudo obtener el ID del usuario.");
      return;
    }

    // 📘 2️⃣ Insertar datos del estudiante en la tabla 'estudiantes'
    const { error: insertError } = await supabase.from("estudiantes").insert([
      {
        id: userId, // mismo ID del sistema de autenticación
        nombre,
        correo: email,
        telefono,
      },
    ]);

    if (insertError) {
      setMessage(
        "⚠️ Usuario autenticado pero no guardado en la tabla: " +
          insertError.message
      );
      return;
    }

    // ✅ Todo salió bien
    setMessage(
      "✅ Usuario registrado correctamente. Revisa tu correo para confirmar la cuenta."
    );

    // 🔄 Limpieza de campos
    setNombre("");
    setEmail("");
    setTelefono("");
    setPassword("");
  };

    useEffect(() => {
      const checkUser = async () => {
        const { data } = await supabase.auth.getUser();

        if (!data.user) {
          // ❌ No hay usuario logueado → redirige a login
          router.push("/user");
        } else {
          // ✅ Usuario logueado, seguimos con la página
          setLoading(false);
        }
      };

      checkUser();
    }, [router]);

    if (loading) return <p className="text-center mt-10">Verificando sesión...</p>;


  // 🧱 Interfaz del formulario
  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4 text-center">
        Registro de estudiante
      </h1>

      {/* 📋 Al enviar el formulario se ejecuta handleRegister */}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>

      {/* 💬 Mostramos mensaje de éxito o error */}
      {message && <p className="mt-4 text-center">{message}</p>}

      {/* 🔗 Enlace a la página de login */}
      <p className="mt-4 text-center">
      ¿Ya tienes cuenta?{" "}
      <button
      onClick={() => router.push("/login")}
      className="text-blue-600 underline"
      >
      Inicia sesión aquí
      </button>
      </p>
    </div>
  );
}
