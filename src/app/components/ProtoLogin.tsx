import { useState } from "react";
import { Phone } from "lucide-react";

export function ProtoLogin({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = () => {
    const trimmedUser = user.trim();
    if (!trimmedUser || !pass) {
      setErr("Completa usuario y contraseña.");
      return;
    }
    if (trimmedUser !== "test@gmail.com" || pass !== "12345") {
      setErr("Usuario o contraseña incorrectos.");
      return;
    }
    setErr("");
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-600 mb-4 shadow-[0_8px_30px_rgba(37,99,235,0.4)]">
            <Phone size={28} className="text-white" />
          </div>
          <h1 className="font-mono text-2xl font-bold tracking-[0.3em] text-white">
            CENTURY
          </h1>
          <p className="font-mono text-[10px] text-blue-400 mt-1 tracking-widest uppercase">
            Contact Center Real-Time
          </p>
        </div>
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40 overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <h2 className="font-mono text-base font-bold text-gray-900 mb-1">
              Bienvenido de vuelta
            </h2>
            <p className="font-mono text-xs text-gray-400 mb-6">
              Ingresa tus credenciales para continuar
            </p>
            <div className="mb-4">
              <label className="font-mono text-xs font-semibold text-gray-700 block mb-2">
                Usuario
              </label>
              <input
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                  setErr("");
                }}
                className="w-full h-11 border border-gray-200 rounded-xl px-4 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
                placeholder="supervisor@century.com"
              />
            </div>
            <div className="mb-4">
              <label className="font-mono text-xs font-semibold text-gray-700 block mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setErr("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full h-11 border border-gray-200 rounded-xl px-4 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
                placeholder="••••••••"
              />
            </div>
            {err && (
              <div className="mb-4 font-mono text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                {err}
              </div>
            )}
            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                id="rem"
                className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
              <label
                htmlFor="rem"
                className="font-mono text-xs text-gray-600 cursor-pointer"
              >
                Recordar cuenta
              </label>
            </div>
            <button
              onClick={handleLogin}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-mono text-sm font-bold rounded-2xl transition-all shadow-[0_4px_14px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)]"
            >
              Ingresar al Dashboard →
            </button>
            <button className="w-full mt-3 font-mono text-xs text-gray-400 hover:text-blue-600 transition-colors py-2">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <div className="bg-gray-50/80 px-8 py-4 border-t border-gray-100">
            <p className="font-mono text-[10px] text-gray-400 text-center">
              Sistema de Supervisión v2.4 · Century
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
