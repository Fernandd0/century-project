import { useState, useRef, useEffect } from "react";
import { toast, Toaster } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  LayoutDashboard,
  History,
  FileBarChart2,
  Settings2,
  LogOut,
  Bell,
  ChevronDown,
  SlidersHorizontal,
  Download,
  ArrowUpDown,
  X,
  Menu,
  MessageSquare,
  Pause,
  AlertTriangle,
  User,
  Camera,
  Save,
  Phone,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
} from "lucide-react";

// ─── SHARED DATA ─────────────────────────────────────────────────────────────

const AGENTS = [
  {
    id: 1,
    name: "Ana García",
    status: "En línea",
    tme: "3:45",
    tmeN: 3.75,
    ns: "92%",
    nsN: 92,
    pauses: 1,
    flag: "green",
    calls: 41,
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    status: "En pausa",
    tme: "6:20",
    tmeN: 6.33,
    ns: "61%",
    nsN: 61,
    pauses: 3,
    flag: "red",
    calls: 28,
  },
  {
    id: 3,
    name: "María López",
    status: "En línea",
    tme: "4:10",
    tmeN: 4.17,
    ns: "85%",
    nsN: 85,
    pauses: 1,
    flag: "yellow",
    calls: 37,
  },
  {
    id: 4,
    name: "José Martín",
    status: "En línea",
    tme: "3:55",
    tmeN: 3.92,
    ns: "88%",
    nsN: 88,
    pauses: 2,
    flag: "green",
    calls: 39,
  },
  {
    id: 5,
    name: "Laura Pérez",
    status: "Desconectado",
    tme: "—",
    tmeN: 0,
    ns: "—",
    nsN: 0,
    pauses: 0,
    flag: "gray",
    calls: 0,
  },
  {
    id: 6,
    name: "Miguel Torres",
    status: "En línea",
    tme: "5:30",
    tmeN: 5.5,
    ns: "72%",
    nsN: 72,
    pauses: 2,
    flag: "yellow",
    calls: 31,
  },
  {
    id: 7,
    name: "Sofía Díaz",
    status: "En línea",
    tme: "3:20",
    tmeN: 3.33,
    ns: "94%",
    nsN: 94,
    pauses: 1,
    flag: "green",
    calls: 44,
  },
  {
    id: 8,
    name: "Roberto Silva",
    status: "En pausa",
    tme: "7:45",
    tmeN: 7.75,
    ns: "55%",
    nsN: 55,
    pauses: 4,
    flag: "red",
    calls: 19,
  },
  {
    id: 9,
    name: "Carmen Vega",
    status: "En línea",
    tme: "4:30",
    tmeN: 4.5,
    ns: "80%",
    nsN: 80,
    pauses: 1,
    flag: "yellow",
    calls: 33,
  },
  {
    id: 10,
    name: "Felipe Mora",
    status: "En línea",
    tme: "3:10",
    tmeN: 3.17,
    ns: "96%",
    nsN: 96,
    pauses: 0,
    flag: "green",
    calls: 47,
  },
  {
    id: 11,
    name: "Isabel Cruz",
    status: "En línea",
    tme: "5:00",
    tmeN: 5.0,
    ns: "75%",
    nsN: 75,
    pauses: 2,
    flag: "yellow",
    calls: 29,
  },
  {
    id: 12,
    name: "Andrés Rojas",
    status: "En pausa",
    tme: "8:20",
    tmeN: 8.33,
    ns: "48%",
    nsN: 48,
    pauses: 5,
    flag: "red",
    calls: 14,
  },
  {
    id: 13,
    name: "Valentina Ríos",
    status: "En línea",
    tme: "3:40",
    tmeN: 3.67,
    ns: "91%",
    nsN: 91,
    pauses: 1,
    flag: "green",
    calls: 40,
  },
  {
    id: 14,
    name: "Diego Herrera",
    status: "En línea",
    tme: "4:50",
    tmeN: 4.83,
    ns: "78%",
    nsN: 78,
    pauses: 2,
    flag: "yellow",
    calls: 32,
  },
  {
    id: 15,
    name: "Paula Mendoza",
    status: "En línea",
    tme: "3:25",
    tmeN: 3.42,
    ns: "93%",
    nsN: 93,
    pauses: 1,
    flag: "green",
    calls: 42,
  },
  {
    id: 16,
    name: "Sebastián Vargas",
    status: "Desconectado",
    tme: "—",
    tmeN: 0,
    ns: "—",
    nsN: 0,
    pauses: 0,
    flag: "gray",
    calls: 0,
  },
  {
    id: 17,
    name: "Natalia Fuentes",
    status: "En línea",
    tme: "4:15",
    tmeN: 4.25,
    ns: "83%",
    nsN: 83,
    pauses: 1,
    flag: "yellow",
    calls: 35,
  },
  {
    id: 18,
    name: "Tomás Castillo",
    status: "En línea",
    tme: "6:00",
    tmeN: 6.0,
    ns: "65%",
    nsN: 65,
    pauses: 3,
    flag: "red",
    calls: 24,
  },
  {
    id: 19,
    name: "Gabriela Ponce",
    status: "En línea",
    tme: "3:50",
    tmeN: 3.83,
    ns: "89%",
    nsN: 89,
    pauses: 1,
    flag: "green",
    calls: 38,
  },
  {
    id: 20,
    name: "Ricardo Paredes",
    status: "En pausa",
    tme: "9:10",
    tmeN: 9.17,
    ns: "42%",
    nsN: 42,
    pauses: 6,
    flag: "red",
    calls: 11,
  },
];

const CHART = [
  { hora: "08:00", tme: 3.2, ns: 94 },
  { hora: "09:00", tme: 3.8, ns: 91 },
  { hora: "10:00", tme: 4.5, ns: 84 },
  { hora: "11:00", tme: 5.2, ns: 73 },
  { hora: "12:00", tme: 6.1, ns: 62 },
  { hora: "13:00", tme: 5.4, ns: 70 },
  { hora: "14:00", tme: 4.8, ns: 77 },
  { hora: "15:00", tme: 4.2, ns: 82 },
  { hora: "16:00", tme: 3.9, ns: 86 },
];

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────

const FLAG_BORDER_L: Record<string, string> = {
  green: "border-l-4 border-l-green-500",
  yellow: "border-l-4 border-l-yellow-400",
  red: "border-l-4 border-l-red-500",
  gray: "border-l-4 border-l-gray-300",
};
const FLAG_TEXT: Record<string, string> = {
  green: "text-green-600",
  yellow: "text-amber-600",
  red: "text-red-600",
  gray: "text-gray-400",
};
const FLAG_DOT: Record<string, string> = {
  green: "bg-green-500",
  yellow: "bg-amber-400",
  red: "bg-red-500",
  gray: "bg-gray-300",
};
const FLAG_BADGE: Record<string, string> = {
  green: "bg-green-50 text-green-700 border-green-200",
  yellow: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-600 border-red-200",
  gray: "bg-gray-100 text-gray-500 border-gray-200",
};
const FLAG_AVATAR_BG: Record<string, string> = {
  green: "bg-green-500",
  yellow: "bg-amber-500",
  red: "bg-red-500",
  gray: "bg-gray-400",
};
const FLAG_METRIC: Record<string, string> = {
  green: "bg-green-50 border-green-100",
  yellow: "bg-amber-50 border-amber-100",
  red: "bg-red-50 border-red-100",
  gray: "bg-gray-50 border-gray-100",
};

type Agent = (typeof AGENTS)[number];

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────────

const Mono = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <span className={`font-mono ${className}`}>{children}</span>;

function ProtoAvatar({
  name,
  flag,
  size = "md",
  colorOverride,
}: {
  name: string;
  flag: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  colorOverride?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bg = colorOverride ?? FLAG_AVATAR_BG[flag] ?? "bg-gray-400";
  const sz = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl",
  }[size];
  return (
    <div
      className={`rounded-full ${bg} flex items-center justify-center flex-shrink-0 ${sz} font-mono font-bold text-white select-none`}
    >
      {initials}
    </div>
  );
}

// ─── WIREFRAME PRIMITIVES ────────────────────────────────────────────────────

const ScreenTag = ({
  id,
  title,
  note,
}: {
  id: string;
  title: string;
  note?: string;
}) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white border-b border-blue-700">
    <span className="font-mono text-xs font-bold bg-white text-blue-600 px-1.5 py-0.5 rounded">
      {id}
    </span>
    <span className="font-mono text-xs font-semibold">{title}</span>
    {note && (
      <span className="font-mono text-xs text-blue-300 ml-auto">{note}</span>
    )}
  </div>
);

const DocSection = ({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="mb-16">
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-xs text-gray-400 border border-gray-300 bg-white px-2 py-0.5 rounded">
        {num}
      </span>
      <h2 className="font-mono text-sm font-bold text-gray-700 uppercase tracking-widest">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
    {children}
  </section>
);

const WField = ({ label, type = "text" }: { label: string; type?: string }) => (
  <div className="mb-3">
    <Mono className="text-xs text-gray-500 block mb-1">{label}</Mono>
    <div className="h-9 border border-gray-400 bg-white rounded px-3 flex items-center justify-between">
      <div className="w-24 h-1.5 bg-gray-200 rounded" />
      {type === "password" && (
        <Mono className="text-xs text-gray-300 tracking-widest">••••••</Mono>
      )}
    </div>
  </div>
);

// ─── WIREFRAME SCREENS (unchanged) ───────────────────────────────────────────

function W00Login() {
  return (
    <div
      className="border-2 border-gray-400 bg-gray-50 inline-flex flex-col"
      style={{ width: 380 }}
    >
      <ScreenTag id="W00" title="Login" note="Punto de entrada" />
      <div className="p-10 flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="inline-flex flex-col items-center border-2 border-gray-400 bg-white px-8 py-4">
            <Mono className="text-xl font-bold tracking-[0.35em] text-gray-900">
              CENTURY
            </Mono>
            <Mono className="text-xs text-gray-400 tracking-widest mt-0.5">
              CONTACT CENTER
            </Mono>
          </div>
          <Mono className="text-xs text-gray-400 mt-2 block">
            Sistema de Supervisión v2.4
          </Mono>
        </div>
        <div className="w-full">
          <WField label="Usuario" />
          <WField label="Contraseña" type="password" />
          <div className="flex items-center gap-2 mb-5">
            <div className="w-4 h-4 border-2 border-gray-400 bg-white flex items-center justify-center">
              <div className="w-2 h-1.5 bg-gray-400" />
            </div>
            <Mono className="text-xs text-gray-600">Recordar cuenta</Mono>
          </div>
          <button className="w-full h-10 bg-gray-800 text-white font-mono text-xs font-medium rounded flex items-center justify-center gap-1.5">
            Ingresar al Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}

function W01Dashboard() {
  const [filter, setFilter] = useState("Todos");
  const [banner, setBanner] = useState(true);
  const kpis = [
    {
      label: "Nivel de Servicio",
      value: "78%",
      flag: "yellow",
      sub: "Meta: 85%",
      note: "↓ 7 pts bajo meta",
    },
    {
      label: "TME Promedio",
      value: "4:32 min",
      flag: "red",
      sub: "Límite: 4:00",
      note: "↑ 32 s sobre límite",
    },
    {
      label: "Agentes En Línea",
      value: "17 / 20",
      flag: "green",
      sub: "Turno actual",
      note: "3 inactivos",
    },
    {
      label: "En Pausa",
      value: "3",
      flag: "yellow",
      sub: "Máx perm.: 2",
      note: "1 excede límite",
    },
  ];
  const FILTERS = ["Todos", "En línea", "En pausa", "Desconectado"];
  const rows =
    filter === "Todos" ? AGENTS : AGENTS.filter((a) => a.status === filter);
  return (
    <div className="border-2 border-gray-400 bg-white w-full">
      <ScreenTag
        id="W01"
        title="Dashboard Principal"
        note="Vista Global · Supervisor"
      />
      {banner && (
        <div className="flex items-center gap-3 bg-red-600 text-white px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <Mono className="text-xs font-bold">
            ALERTA: TME supera umbral crítico — 4 agentes afectados
          </Mono>
          <button
            onClick={() => setBanner(false)}
            className="ml-auto font-mono text-xs text-red-200"
          >
            ✕
          </button>
        </div>
      )}
      <div className="bg-gray-900 text-white px-4 py-2 flex items-center gap-4">
        <Mono className="text-sm font-bold tracking-[0.3em]">CENTURY</Mono>
        {["Dashboard", "Historial", "Ajustes ⚙"].map((n) => (
          <Mono key={n} className="text-xs text-gray-400">
            {n}
          </Mono>
        ))}
        <div className="flex-1" />
        <Mono className="text-xs text-gray-500">Turno Mañana</Mono>
      </div>
      <div className="grid grid-cols-4 gap-3 p-4 bg-gray-50 border-b border-gray-200">
        {kpis.map((k) => (
          <div
            key={k.label}
            className={`bg-white border border-gray-200 ${FLAG_BORDER_L[k.flag]} p-3`}
          >
            <Mono className="text-xs text-gray-400 block mb-1">{k.label}</Mono>
            <Mono className={`text-xl font-bold ${FLAG_TEXT[k.flag]} block`}>
              {k.value}
            </Mono>
            <Mono className="text-xs text-gray-400 block">{k.note}</Mono>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono text-xs px-3 py-1 border rounded ${filter === f ? "bg-gray-900 text-white" : "bg-white text-gray-600 border-gray-300"}`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100">
              {["#", "Agente", "Estado", "TME", "NS", "Pausas", "Acción"].map(
                (c) => (
                  <th
                    key={c}
                    className="font-mono text-xs text-gray-500 px-3 py-2 border-r border-gray-200"
                  >
                    {c}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 8).map((a, i) => (
              <tr
                key={a.id}
                className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
              >
                <td className="font-mono text-xs text-gray-400 px-3 py-1.5 border-r border-gray-100">
                  {a.id}
                </td>
                <td className="font-mono text-xs px-3 py-1.5 border-r border-gray-100">
                  {a.name}
                </td>
                <td className="px-3 py-1.5 border-r border-gray-100">
                  <span
                    className={`font-mono text-xs px-2 py-0.5 border rounded ${FLAG_BADGE[a.flag]}`}
                  >
                    {a.status}
                  </span>
                </td>
                <td
                  className={`font-mono text-xs px-3 py-1.5 border-r border-gray-100 ${FLAG_TEXT[a.flag]}`}
                >
                  {a.tme}
                </td>
                <td
                  className={`font-mono text-xs px-3 py-1.5 border-r border-gray-100 ${FLAG_TEXT[a.flag]}`}
                >
                  {a.ns}
                </td>
                <td className="font-mono text-xs px-3 py-1.5 border-r border-gray-100 text-center text-gray-500">
                  {a.pauses}
                </td>
                <td className="px-3 py-1.5">
                  <button className="font-mono text-xs px-2 py-0.5 border border-blue-300 text-blue-600 rounded bg-blue-50">
                    Ver →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <Mono className="text-xs text-gray-500 block mb-2">
          Tendencias del Turno
        </Mono>
        <ResponsiveContainer width="100%" height={90}>
          <LineChart data={CHART}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="hora"
              tick={{ fontSize: 9, fontFamily: "monospace" }}
            />
            <YAxis
              key="wf-y-l"
              yAxisId="l"
              domain={[0, 12]}
              tick={{ fontSize: 9, fontFamily: "monospace" }}
              width={22}
            />
            <YAxis
              key="wf-y-r"
              yAxisId="r"
              orientation="right"
              domain={[40, 100]}
              tick={{ fontSize: 9, fontFamily: "monospace" }}
              width={26}
            />
            <Tooltip contentStyle={{ fontFamily: "monospace", fontSize: 10 }} />
            <Line
              key="wf-tme"
              yAxisId="l"
              type="monotone"
              dataKey="tme"
              stroke="#dc2626"
              strokeWidth={1.5}
              dot={false}
            />
            <Line
              key="wf-ns"
              yAxisId="r"
              type="monotone"
              dataKey="ns"
              stroke="#2563eb"
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function W02Panel() {
  return (
    <div className="border-2 border-gray-400 bg-white w-full flex flex-col">
      <ScreenTag
        id="W02"
        title="Panel Lateral · Drill-down"
        note="Drawer derecho sobre W01"
      />
      <div className="flex flex-1" style={{ minHeight: 480 }}>
        <div className="flex-1 bg-gray-100 p-4 opacity-30 pointer-events-none space-y-2">
          <div className="h-8 bg-gray-400 rounded" />
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-gray-300 rounded" />
            ))}
          </div>
          <div className="h-48 bg-gray-300 rounded" />
        </div>
        <div
          className="border-l-2 border-gray-400 bg-white flex flex-col"
          style={{ width: 280 }}
        >
          <div className="bg-gray-900 text-white p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-200 border-2 border-red-400 flex items-center justify-center">
              <Mono className="text-sm font-bold text-gray-800">CR</Mono>
            </div>
            <div>
              <Mono className="text-sm font-bold block">Carlos Ruiz</Mono>
              <Mono className="text-xs text-red-300">⚠ Alerta crítica</Mono>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-2">
            {[
              { l: "TME Actual", v: "6:20 min", f: "red" },
              { l: "Nivel de Servicio", v: "61%", f: "red" },
              { l: "Llamadas", v: "34", f: "green" },
              { l: "Pausas", v: "3", f: "yellow" },
            ].map((m) => (
              <div
                key={m.l}
                className={`flex items-center justify-between p-2 border rounded ${FLAG_METRIC[m.f]}`}
              >
                <Mono className="text-xs text-gray-600">{m.l}</Mono>
                <Mono className={`text-xs font-bold ${FLAG_TEXT[m.f]}`}>
                  {m.v}
                </Mono>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-gray-300 p-3 bg-gray-50">
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  i: "💬",
                  l: "Mensaje",
                  c: "border-blue-300 bg-blue-50 text-blue-700",
                },
                {
                  i: "⏸",
                  l: "Pausa",
                  c: "border-yellow-300 bg-yellow-50 text-yellow-700",
                },
                {
                  i: "🔺",
                  l: "Escalar",
                  c: "border-red-300 bg-red-50 text-red-700",
                },
              ].map((b) => (
                <button
                  key={b.l}
                  className={`font-mono text-xs py-2 border rounded text-center ${b.c}`}
                >
                  <span className="block text-base">{b.i}</span>
                  {b.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function W03Modal() {
  const [tab, setTab] = useState<"historial" | "umbrales">("historial");
  const [vals, setVals] = useState({ tmeY: 4, tmeR: 6, nsY: 80, nsR: 65 });
  const H = [
    { t: "10:15", a: "Carlos Ruiz", ac: "Pausa asignada" },
    { t: "10:02", a: "Ricardo Paredes", ac: "Mensaje enviado" },
    { t: "09:48", a: "Roberto Silva", ac: "Escalado a gerencia" },
    { t: "09:30", a: "Andrés Rojas", ac: "Mensaje enviado" },
  ];
  return (
    <div className="border-2 border-gray-400 bg-white w-full">
      <ScreenTag
        id="W03"
        title="Modal de Gestión"
        note="Panel central emergente"
      />
      <div className="relative" style={{ minHeight: 440 }}>
        <div className="absolute inset-0 bg-gray-100 opacity-40 pointer-events-none p-4 space-y-2">
          <div className="h-8 bg-gray-300 rounded" />
          <div className="h-48 bg-gray-200 rounded" />
        </div>
        <div className="relative m-6 border-2 border-gray-400 bg-white shadow-2xl">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
            <Mono className="text-sm font-bold text-gray-800">
              Gestión del Turno
            </Mono>
            <button className="font-mono text-xs text-gray-400">✕</button>
          </div>
          <div className="flex border-b border-gray-200">
            {[
              { k: "historial", l: "Historial" },
              { k: "umbrales", l: "Umbrales" },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k as any)}
                className={`font-mono text-xs px-5 py-2.5 border-b-2 ${tab === t.k ? "border-blue-600 text-blue-600 bg-blue-50" : "border-transparent text-gray-500"}`}
              >
                {t.l}
              </button>
            ))}
          </div>
          <div className="p-5">
            {tab === "historial" ? (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-100">
                    {["Hora", "Agente", "Acción"].map((c) => (
                      <th
                        key={c}
                        className="font-mono text-xs text-gray-500 px-3 py-2 border-r border-gray-200"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {H.map((h, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="font-mono text-xs text-gray-500 px-3 py-2">
                        {h.t}
                      </td>
                      <td className="font-mono text-xs font-medium text-gray-800 px-3 py-2">
                        {h.a}
                      </td>
                      <td className="font-mono text-xs text-gray-600 px-3 py-2">
                        {h.ac}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="space-y-4">
                {[
                  {
                    l: "TME Amarillo (min)",
                    k: "tmeY",
                    min: 2,
                    max: 8,
                    c: "yellow",
                  },
                  { l: "TME Rojo (min)", k: "tmeR", min: 3, max: 12, c: "red" },
                  {
                    l: "NS Amarillo (%)",
                    k: "nsY",
                    min: 60,
                    max: 95,
                    c: "yellow",
                  },
                  { l: "NS Rojo (%)", k: "nsR", min: 40, max: 80, c: "red" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="flex justify-between mb-1">
                      <Mono className="text-xs text-gray-600">{s.l}</Mono>
                      <Mono
                        className={`text-xs font-bold ${s.c === "red" ? "text-red-600" : "text-yellow-600"}`}
                      >
                        {(vals as any)[s.k]}
                      </Mono>
                    </div>
                    <input
                      type="range"
                      min={s.min}
                      max={s.max}
                      value={(vals as any)[s.k]}
                      onChange={(e) =>
                        setVals({ ...vals, [s.k]: +e.target.value })
                      }
                      className={`w-full ${s.c === "red" ? "accent-red-500" : "accent-yellow-500"}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function W04Mobile() {
  const alertAgents = AGENTS.filter((a) => a.flag === "red");
  return (
    <div
      className="border-2 border-gray-400 bg-white inline-flex flex-col"
      style={{ width: 300 }}
    >
      <ScreenTag id="W04" title="Dashboard Móvil" note="320 px" />
      <div className="bg-gray-900 text-white px-3 py-1.5 flex items-center justify-between">
        <Mono className="text-xs font-bold tracking-widest">CENTURY</Mono>
        <Mono className="text-xs text-gray-400">08:42</Mono>
      </div>
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="grid grid-cols-2 gap-2 p-3">
          {[
            { l: "Nv.Servicio", v: "78%", f: "yellow" },
            { l: "TME", v: "4:32", f: "red" },
            { l: "En Línea", v: "17/20", f: "green" },
            { l: "En Pausa", v: "3", f: "yellow" },
          ].map((k) => (
            <div
              key={k.l}
              className={`bg-white border ${FLAG_BORDER_L[k.f]} p-3 rounded-lg`}
            >
              <Mono className="text-xs text-gray-400 block">{k.l}</Mono>
              <Mono className={`text-lg font-bold ${FLAG_TEXT[k.f]} block`}>
                {k.v}
              </Mono>
            </div>
          ))}
        </div>
        <div className="mx-3 mb-3 flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <Mono className="text-xs font-bold">4 agentes en alerta</Mono>
        </div>
        <div className="px-3 space-y-3 pb-6">
          {alertAgents.map((a) => (
            <div
              key={a.id}
              className="bg-white border border-red-100 rounded-2xl p-3 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <ProtoAvatar name={a.name} flag={a.flag} size="md" />
                <div className="flex-1 min-w-0">
                  <Mono className="text-xs font-bold text-gray-800 block truncate">
                    {a.name}
                  </Mono>
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded-full border ${FLAG_BADGE[a.flag]}`}
                  >
                    {a.status}
                  </span>
                </div>
                <div className="text-right">
                  <Mono
                    className={`text-sm font-bold block ${FLAG_TEXT[a.flag]}`}
                  >
                    {a.tme}
                  </Mono>
                  <Mono className="text-xs text-gray-400">NS: {a.ns}</Mono>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    i: "💬",
                    l: "Msg",
                    c: "border-blue-200 text-blue-700 bg-blue-50",
                  },
                  {
                    i: "⏸",
                    l: "Pausa",
                    c: "border-amber-200 text-amber-700 bg-amber-50",
                  },
                  {
                    i: "🔺",
                    l: "Escalar",
                    c: "border-red-200 text-red-700 bg-red-50",
                  },
                ].map((b) => (
                  <button
                    key={b.l}
                    style={{ minHeight: 44 }}
                    className={`font-mono text-xs border rounded-xl flex flex-col items-center justify-center gap-0.5 ${b.c}`}
                  >
                    <span>{b.i}</span>
                    <span>{b.l}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type FlowBox = { screen: string; note?: string; highlight?: boolean };
type FlowArrow = { label: string };
type FlowItem = FlowBox | FlowArrow;
function isArrow(i: FlowItem): i is FlowArrow {
  return "label" in i && !("screen" in i);
}

function WireFlow({
  id,
  title,
  items,
  desc,
}: {
  id: string;
  title: string;
  items: FlowItem[];
  desc: string;
}) {
  return (
    <div className="border border-gray-300 bg-white p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
          {id}
        </span>
        <span className="font-mono text-xs font-semibold text-gray-700">
          {title}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-0 mb-3">
        {items.map((item, i) =>
          isArrow(item) ? (
            <div
              key={i}
              className="flex flex-col items-center mx-1.5"
              style={{ minWidth: 52 }}
            >
              <Mono
                className="text-xs text-blue-600 text-center leading-tight block mb-0.5"
                style={{ maxWidth: 68 }}
              >
                {item.label}
              </Mono>
              <div className="flex items-center">
                <div className="h-px bg-gray-400" style={{ width: 24 }} />
                <span className="text-gray-400 text-xs">▶</span>
              </div>
            </div>
          ) : (
            <div
              key={i}
              className={`border-2 rounded px-3 py-2 text-center flex-shrink-0 ${item.highlight ? "border-blue-500 bg-blue-50" : "border-gray-400 bg-gray-50"}`}
              style={{ minWidth: 68 }}
            >
              <Mono
                className={`text-xs font-bold block ${item.highlight ? "text-blue-700" : "text-gray-700"}`}
              >
                {item.screen}
              </Mono>
              {item.note && (
                <Mono className="text-xs text-gray-400 block leading-tight mt-0.5">
                  {item.note}
                </Mono>
              )}
            </div>
          ),
        )}
      </div>
      <Mono className="text-xs text-gray-400 italic">{desc}</Mono>
    </div>
  );
}

const WF_ITEMS: {
  id: string;
  title: string;
  desc: string;
  items: FlowItem[];
}[] = [
  {
    id: "WF-00",
    title: "Flujo de Acceso",
    desc: "El supervisor ingresa credenciales y el sistema valida antes de mostrar el dashboard.",
    items: [
      { screen: "W00", note: "Login" },
      { label: "Ingresar" },
      { screen: "Sistema", note: "Valida" },
      { label: "Válido" },
      { screen: "W01", note: "Dashboard", highlight: true },
    ],
  },
  {
    id: "WF-01",
    title: "Monitoreo Global en Tiempo Real",
    desc: "Carga inicial: el supervisor escanea los 4 KPIs semaforizados sin hacer clic.",
    items: [
      { screen: "W01", note: "Carga inicial" },
      { label: "Auto-refresh" },
      { screen: "W01", note: "KPIs actualizados", highlight: true },
    ],
  },
  {
    id: "WF-02",
    title: "Filtrado Rápido por Estado",
    desc: "Al presionar un filtro, la tabla se actualiza ocultando agentes no coincidentes.",
    items: [
      { screen: "W01", note: "Tabla completa" },
      { label: "Clic filtro" },
      { screen: "W01", note: "Tabla filtrada", highlight: true },
    ],
  },
  {
    id: "WF-03",
    title: "Detección por KPI Rojo",
    desc: "Al presionar un KPI en alerta, el panel lateral se despliega.",
    items: [
      { screen: "W01", note: "KPI rojo" },
      { label: "Clic KPI" },
      { screen: "W02", note: "Drawer abierto", highlight: true },
    ],
  },
  {
    id: "WF-04",
    title: "Notificaciones Automáticas",
    desc: "El sistema emite un banner rojo al cruzar el umbral crítico.",
    items: [
      { screen: "Sistema", note: "Cruza umbral" },
      { label: "Dispara alerta" },
      { screen: "W01", note: "Banner rojo", highlight: true },
      { label: "Clic banner" },
      { screen: "W01", note: "Filtrado" },
    ],
  },
  {
    id: "WF-05",
    title: "Acción Correctiva Directa",
    desc: "Desde el panel del agente, el supervisor presiona una acción y recibe confirmación toast.",
    items: [
      { screen: "W02", note: "Detalle agente" },
      { label: "Clic acción" },
      { screen: "Sistema", note: "Procesa" },
      { label: "Éxito" },
      { screen: "Toast", note: "Confirmación", highlight: true },
    ],
  },
  {
    id: "WF-06",
    title: "Historial de Intervenciones",
    desc: "Desde el menú, el supervisor accede al historial y puede exportarlo.",
    items: [
      { screen: "W01", note: "Menú nav" },
      { label: "Clic Historial" },
      { screen: "W03", note: "Tab Historial", highlight: true },
      { label: "Exportar" },
      { screen: "Descarga", note: ".csv" },
    ],
  },
  {
    id: "WF-07",
    title: "Tendencias Históricas del Turno",
    desc: "El supervisor selecciona rango horario en el gráfico.",
    items: [
      { screen: "W01", note: "Dashboard" },
      { label: "Scroll ↓" },
      { screen: "W01", note: "Gráfico", highlight: true },
      { label: "Selec.rango" },
      { screen: "W01", note: "Actualizado" },
    ],
  },
  {
    id: "WF-08",
    title: "Comparativa entre Agentes",
    desc: "Al hacer clic en el encabezado, la tabla se reordena.",
    items: [
      { screen: "W01", note: "Tabla normal" },
      { label: "Clic columna" },
      { screen: "W01", note: "Reordenada", highlight: true },
    ],
  },
  {
    id: "WF-09",
    title: "Configuración de Umbrales",
    desc: "El supervisor ajusta sliders y guarda; se aplican en tiempo real.",
    items: [
      { screen: "W01", note: "Ajustes ⚙" },
      { label: "Clic ajustes" },
      { screen: "W03", note: "Tab Umbrales", highlight: true },
      { label: "Guardar" },
      { screen: "W01", note: "Actualizados" },
    ],
  },
  {
    id: "WF-10",
    title: "Vista Móvil Resumida",
    desc: "Login táctil → dashboard compacto con botones 44×44 px.",
    items: [
      { screen: "W00", note: "Login móvil" },
      { label: "Ingresar" },
      { screen: "W04", note: "Dashboard", highlight: true },
      { label: "Scroll" },
      { screen: "W04", note: "Alertas" },
    ],
  },
];

// ─── WIREFRAME DOC ────────────────────────────────────────────────────────────

const DOC_NAV = [
  { id: "w00", label: "W00 Login" },
  { id: "w01", label: "W01 Dashboard" },
  { id: "w02", label: "W02 Drawer" },
  { id: "w03", label: "W03 Modal" },
  { id: "w04", label: "W04 Móvil" },
  { id: "wf", label: "Wireflows" },
];

function WireframeDoc() {
  const [activeNav, setActiveNav] = useState("w00");
  const scrollTo = (id: string) => {
    setActiveNav(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{ fontFamily: "Inter, monospace" }}
    >
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-gray-300 flex items-center px-4 md:px-6 gap-0"
        style={{ height: 48 }}
      >
        <div className="flex items-center gap-2 mr-6 flex-shrink-0">
          <span className="font-mono text-sm font-bold tracking-widest text-gray-900">
            CENTURY
          </span>
          <span className="text-gray-300 hidden md:inline">|</span>
          <span className="font-mono text-xs text-gray-400 hidden md:inline">
            Wireframes · v1.0
          </span>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto flex-1">
          {DOC_NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className={`font-mono text-xs px-2 md:px-3 py-1.5 border-b-2 transition-colors whitespace-nowrap ${activeNav === n.id ? "border-blue-600 text-blue-600 bg-blue-50" : "border-transparent text-gray-500 hover:text-gray-800"}`}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <span className="font-mono text-xs text-gray-400 flex-shrink-0 hidden md:inline ml-4">
          11 flujos · 5 pantallas
        </span>
      </header>
      <main className="pt-16 pb-20 max-w-6xl mx-auto px-4 md:px-6">
        <div className="border-2 border-gray-400 bg-white mb-12 p-6 md:p-8 flex flex-col md:flex-row items-start justify-between mt-6 gap-4">
          <div>
            <div className="font-mono text-xs text-blue-600 mb-2 uppercase tracking-widest">
              Documento de Diseño
            </div>
            <h1 className="font-mono text-xl md:text-2xl font-bold text-gray-900 mb-1">
              Wireframes & Wireflows
            </h1>
            <div className="font-mono text-sm text-gray-500">
              Sistema de Supervisión · Century Contact Center
            </div>
            <div className="mt-4 flex gap-6">
              {[
                ["5", "Pantallas"],
                ["11", "Flujos"],
                ["10", "User Stories"],
              ].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="font-mono text-xl font-bold text-gray-800">
                    {n}
                  </div>
                  <div className="font-mono text-xs text-gray-400">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="font-mono text-xs text-gray-400">26 Jun 2026</div>
            <div className="flex items-center gap-3 mt-3">
              {[
                ["bg-green-500", "OK"],
                ["bg-yellow-500", "Alerta"],
                ["bg-red-500", "Crítico"],
              ].map(([c, l]) => (
                <span key={l} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${c}`} />
                  <span className="font-mono text-xs text-gray-500">{l}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <DocSection id="w00" num="W00" title="Pantalla de Login">
          <div className="flex gap-6 items-start flex-wrap">
            <W00Login />
            <div className="flex-1 min-w-48 border border-gray-200 bg-white p-4">
              <Mono className="text-xs font-bold text-gray-700 block mb-2">
                Componentes
              </Mono>
              {[
                "Logo Century",
                "Campo Usuario",
                "Campo Contraseña",
                "Checkbox Recordar",
                "Botón Ingresar",
              ].map((c) => (
                <div key={c} className="flex items-start gap-2 mb-1">
                  <span className="text-gray-300">○</span>
                  <Mono className="text-xs text-gray-600">{c}</Mono>
                </div>
              ))}
            </div>
          </div>
        </DocSection>
        <DocSection id="w01" num="W01" title="Dashboard Principal">
          <W01Dashboard />
        </DocSection>
        <DocSection id="w02" num="W02" title="Panel Lateral · Drill-down">
          <W02Panel />
        </DocSection>
        <DocSection id="w03" num="W03" title="Modal de Gestión">
          <W03Modal />
        </DocSection>
        <DocSection id="w04" num="W04" title="Dashboard Móvil">
          <div className="flex gap-6 items-start flex-wrap">
            <W04Mobile />
          </div>
        </DocSection>
        <DocSection id="wf" num="WF" title="Mapa de Wireflows · 11 Flujos">
          <div className="mb-4 border border-blue-100 bg-blue-50 p-3">
            <Mono className="text-xs text-blue-700">
              Cada caja es una pantalla o estado. Las flechas muestran la acción
              → respuesta. Cajas azules = destino principal.
            </Mono>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {WF_ITEMS.map((f) => (
              <WireFlow key={f.id} {...f} />
            ))}
          </div>
        </DocSection>
      </main>
      <footer className="border-t-2 border-gray-300 bg-white px-6 py-4 flex items-center justify-between">
        <Mono className="text-xs text-gray-400">
          Century Contact Center · UX Wireframes · v1.0
        </Mono>
        <Mono className="text-xs text-gray-400">W00–W04 · WF-00–WF-10</Mono>
      </footer>
    </div>
  );
}

// ─── PROTOTYPE ────────────────────────────────────────────────────────────────

interface UserProfile {
  name: string;
  email: string;
  role: string;
  shift: string;
  phone: string;
  avatarColor: string;
}

const AVATAR_COLORS = [
  { id: "blue", cls: "bg-blue-600", label: "Azul" },
  { id: "violet", cls: "bg-violet-600", label: "Violeta" },
  { id: "teal", cls: "bg-teal-600", label: "Verde" },
  { id: "rose", cls: "bg-rose-600", label: "Rosa" },
  { id: "orange", cls: "bg-orange-500", label: "Naranja" },
  { id: "slate", cls: "bg-slate-700", label: "Gris" },
];

// ── Login ─────────────────────────────────────────────────────────────────────
function ProtoLogin({ onLogin }: { onLogin: () => void }) {
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
                placeholder="test@gmail.com"
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
                placeholder="12345"
              />
            </div>
            {err && (
              <div className="mb-4 font-mono text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                {err}
              </div>
            )}
            <div className="mb-5 p-3 bg-blue-50/50 border border-blue-100/50 rounded-xl">
              <p className="font-mono text-[10px] text-blue-800 leading-normal">
                🔑 <strong>Acceso Demo:</strong><br />
                Email: <span className="underline">test@gmail.com</span><br />
                Clave: <span className="underline">12345</span>
              </p>
            </div>
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

// ── User Profile Modal ────────────────────────────────────────────────────────

function UserProfileModal({
  profile,
  onSave,
  onClose,
}: {
  profile: UserProfile;
  onSave: (p: UserProfile) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<UserProfile>({ ...profile });
  const handleSave = () => {
    onSave(draft);
    toast.success("Perfil actualizado correctamente");
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-mono text-base font-bold text-gray-900">
              Mi perfil
            </h2>
            <p className="font-mono text-xs text-gray-400 mt-0.5">
              Edita tu información de cuenta
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={14} className="text-gray-600" />
          </button>
        </div>
        {/* Avatar picker */}
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center gap-4 mb-5">
            <div
              className={`w-16 h-16 rounded-2xl ${AVATAR_COLORS.find((c) => c.id === draft.avatarColor)?.cls ?? "bg-blue-600"} flex items-center justify-center shadow-lg flex-shrink-0`}
            >
              <span className="font-mono text-xl font-bold text-white">
                {draft.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-mono text-xs font-medium text-gray-700 mb-2">
                Color del avatar
              </p>
              <div className="flex gap-2">
                {AVATAR_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setDraft({ ...draft, avatarColor: c.id })}
                    className={`w-7 h-7 rounded-full ${c.cls} transition-all ${draft.avatarColor === c.id ? "ring-2 ring-offset-2 ring-blue-500 scale-110" : "hover:scale-105"}`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Fields */}
          {[
            {
              key: "name",
              label: "Nombre completo",
              placeholder: "Sup. García Pérez",
              type: "text",
            },
            {
              key: "email",
              label: "Correo electrónico",
              placeholder: "sup@century.com",
              type: "email",
            },
            {
              key: "phone",
              label: "Teléfono directo",
              placeholder: "+52 55 0000 0000",
              type: "tel",
            },
            {
              key: "role",
              label: "Rol / cargo",
              placeholder: "Supervisor de turno",
              type: "text",
            },
            {
              key: "shift",
              label: "Turno asignado",
              placeholder: "Turno Mañana 08:00–16:00",
              type: "text",
            },
          ].map((f) => (
            <div key={f.key} className="mb-3">
              <label className="font-mono text-xs font-medium text-gray-600 block mb-1.5">
                {f.label}
              </label>
              <input
                type={f.type}
                value={(draft as any)[f.key]}
                onChange={(e) =>
                  setDraft({ ...draft, [f.key]: e.target.value })
                }
                placeholder={f.placeholder}
                className="w-full h-10 border border-gray-200 rounded-xl px-3 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
              />
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-gray-200 rounded-2xl font-mono text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-mono text-sm font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Save size={14} /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Agent Drawer ──────────────────────────────────────────────────────────────

function AgentDrawer({
  agent,
  onClose,
}: {
  agent: Agent;
  onClose: () => void;
}) {
  const metrics = [
    { label: "TME Actual", value: agent.tme, flag: agent.flag },
    { label: "Nivel de Servicio", value: agent.ns, flag: agent.flag },
    { label: "Llamadas atendidas", value: String(agent.calls), flag: "green" },
    {
      label: "Pausas tomadas",
      value: String(agent.pauses),
      flag: agent.pauses >= 4 ? "red" : agent.pauses >= 2 ? "yellow" : "green",
    },
    {
      label: "Tiempo en pausa",
      value: `${agent.pauses * 6}:00 min`,
      flag: agent.pauses >= 4 ? "red" : "yellow",
    },
    { label: "Última intervención", value: "Hace 45 min", flag: "gray" },
  ];
  const barData = CHART.map((d, i) => ({
    hora: d.hora,
    calls: Math.max(
      1,
      Math.round((agent.calls * (0.6 + Math.sin(i) * 0.4)) / 9),
    ),
  }));
  const actions = [
    {
      icon: <MessageSquare size={16} />,
      label: "Mensaje",
      cls: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
      action: () => toast.success(`Mensaje enviado a ${agent.name}`),
    },
    {
      icon: <Pause size={16} />,
      label: "Pausa",
      cls: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
      action: () => toast.info(`Pausa asignada a ${agent.name}`),
    },
    {
      icon: <AlertTriangle size={16} />,
      label: "Escalar",
      cls: "border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
      action: () => toast.error(`${agent.name} escalado a gerencia`),
    },
  ];
  return (
    <div className="fixed inset-0 z-40 flex">
      <div
        className="flex-1 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="w-full max-w-xs md:max-w-sm bg-white flex flex-col h-full shadow-2xl rounded-l-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 flex items-center gap-4">
          <ProtoAvatar name={agent.name} flag={agent.flag} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="font-mono text-sm font-bold text-white truncate">
              {agent.name}
            </p>
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded-full border mt-1 inline-block ${FLAG_BADGE[agent.flag]}`}
            >
              {agent.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
        {/* Metrics */}
        <div className="flex-1 overflow-auto p-4 space-y-2">
          <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">
            Métricas en detalle
          </p>
          {metrics.map((m) => (
            <div
              key={m.label}
              className={`flex items-center justify-between px-3 py-2.5 border rounded-xl ${FLAG_METRIC[m.flag]}`}
            >
              <span className="font-mono text-xs text-gray-600">{m.label}</span>
              <span
                className={`font-mono text-sm font-bold ${FLAG_TEXT[m.flag]}`}
              >
                {m.value}
              </span>
            </div>
          ))}
          {/* Mini chart */}
          <div className="mt-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="font-mono text-xs text-gray-400 mb-2">
              Llamadas por hora
            </p>
            <ResponsiveContainer width="100%" height={64}>
              <BarChart data={barData}>
                <Bar
                  dataKey="calls"
                  fill={
                    agent.flag === "red"
                      ? "#fca5a5"
                      : agent.flag === "yellow"
                        ? "#fcd34d"
                        : "#6ee7b7"
                  }
                  radius={[4, 4, 0, 0]}
                />
                <XAxis
                  dataKey="hora"
                  tick={{ fontSize: 8, fontFamily: "monospace" }}
                  tickLine={false}
                  axisLine={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* History */}
          <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mt-4 mb-2">
            Actividad reciente
          </p>
          {[
            "Hace 2 min — Llamada atendida (3:45)",
            "Hace 18 min — Pausa extendida",
            "Hace 1h — TME superó límite",
            "08:00 — Inicio de turno",
          ].map((h) => (
            <div
              key={h}
              className="font-mono text-xs text-gray-500 border-l-2 border-gray-200 pl-3 py-1"
            >
              {h}
            </div>
          ))}
        </div>
        {/* Actions */}
        <div className="border-t border-gray-100 p-4 bg-gray-50/80">
          <p className="font-mono text-xs text-gray-400 uppercase tracking-widest text-center block mb-3">
            Acciones rápidas
          </p>
          <div className="grid grid-cols-3 gap-2">
            {actions.map((a) => (
              <button
                key={a.label}
                onClick={a.action}
                className={`font-mono text-xs py-3.5 border rounded-2xl text-center cursor-pointer transition-colors flex flex-col items-center gap-1.5 ${a.cls}`}
              >
                {a.icon}
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Historial / Umbrales Modal ────────────────────────────────────────────────

function ManagementModal({
  defaultTab,
  onClose,
}: {
  defaultTab: "historial" | "umbrales";
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"historial" | "umbrales">(defaultTab);
  const [sliders, setSliders] = useState({
    tmeY: 4,
    tmeR: 6,
    nsY: 80,
    nsR: 65,
  });
  const HISTORY = [
    {
      time: "10:15",
      agent: "Carlos Ruiz",
      action: "Pausa asignada",
      flag: "yellow",
    },
    {
      time: "10:02",
      agent: "Ricardo Paredes",
      action: "Mensaje enviado",
      flag: "blue",
    },
    {
      time: "09:48",
      agent: "Roberto Silva",
      action: "Escalado a gerencia",
      flag: "red",
    },
    {
      time: "09:30",
      agent: "Andrés Rojas",
      action: "Mensaje enviado",
      flag: "blue",
    },
    {
      time: "09:15",
      agent: "Carlos Ruiz",
      action: "Pausa asignada",
      flag: "yellow",
    },
    {
      time: "08:55",
      agent: "Tomás Castillo",
      action: "Mensaje enviado",
      flag: "blue",
    },
  ];
  const AC: Record<string, string> = {
    yellow: "bg-amber-50 text-amber-700 border-amber-200",
    red: "bg-red-50 text-red-600 border-red-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:max-w-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-mono text-base font-bold text-gray-900">
              Gestión del Turno
            </h2>
            <p className="font-mono text-xs text-gray-400 mt-0.5">
              Sup. Pérez · Turno Mañana
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={14} className="text-gray-600" />
          </button>
        </div>
        <div className="flex border-b border-gray-100 bg-gray-50">
          {[
            {
              k: "historial",
              l: "Historial de Intervenciones",
              i: <History size={13} />,
            },
            {
              k: "umbrales",
              l: "Config. de Umbrales",
              i: <SlidersHorizontal size={13} />,
            },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as any)}
              className={`flex-1 md:flex-none font-mono text-xs px-5 py-3 border-b-2 flex items-center justify-center gap-1.5 transition-colors ${tab === t.k ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              {t.i}
              {t.l}
            </button>
          ))}
        </div>
        <div className="p-5 md:p-6 overflow-auto" style={{ maxHeight: "65vh" }}>
          {tab === "historial" ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-gray-400">
                  {HISTORY.length} intervenciones · turno actual
                </span>
                <button
                  onClick={() => toast.success("CSV descargado")}
                  className="font-mono text-xs px-3 py-1.5 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 flex items-center gap-1.5"
                >
                  <Download size={12} /> Exportar CSV
                </button>
              </div>
              <div className="space-y-2">
                {HISTORY.map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap md:flex-nowrap items-center gap-3 p-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-mono text-xs text-gray-400 w-10 flex-shrink-0">
                      {h.time}
                    </span>
                    <ProtoAvatar name={h.agent} flag="gray" size="sm" />
                    <span className="font-mono text-xs font-medium text-gray-800 flex-1 min-w-0 truncate">
                      {h.agent}
                    </span>
                    <span
                      className={`font-mono text-xs px-2.5 py-1 border rounded-full flex-shrink-0 ${AC[h.flag]}`}
                    >
                      {h.action}
                    </span>
                    <span className="font-mono text-xs text-gray-400 flex-shrink-0">
                      Sup. Pérez
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="font-mono text-xs text-gray-400 mb-5">
                Los cambios se aplican al dashboard en tiempo real.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "TME — Umbral Amarillo",
                    key: "tmeY",
                    min: 2,
                    max: 8,
                    unit: "min",
                    c: "yellow",
                  },
                  {
                    label: "TME — Umbral Rojo",
                    key: "tmeR",
                    min: 3,
                    max: 12,
                    unit: "min",
                    c: "red",
                  },
                  {
                    label: "NS — Umbral Amarillo",
                    key: "nsY",
                    min: 60,
                    max: 95,
                    unit: "%",
                    c: "yellow",
                  },
                  {
                    label: "NS — Umbral Rojo",
                    key: "nsR",
                    min: 40,
                    max: 80,
                    unit: "%",
                    c: "red",
                  },
                ].map((s) => (
                  <div key={s.key} className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-medium text-gray-700">
                        {s.label}
                      </span>
                      <span
                        className={`font-mono text-lg font-bold ${s.c === "red" ? "text-red-600" : "text-amber-600"}`}
                      >
                        {(sliders as any)[s.key]}
                        {s.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={s.min}
                      max={s.max}
                      value={(sliders as any)[s.key]}
                      onChange={(e) =>
                        setSliders({ ...sliders, [s.key]: +e.target.value })
                      }
                      className={`w-full h-2 rounded-full cursor-pointer ${s.c === "red" ? "accent-red-500" : "accent-amber-500"}`}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="font-mono text-xs text-gray-300">
                        {s.min}
                        {s.unit}
                      </span>
                      <span className="font-mono text-xs text-gray-300">
                        {s.max}
                        {s.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={onClose}
                  className="font-mono text-sm px-5 py-2.5 border border-gray-200 rounded-2xl hover:bg-gray-50 text-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    toast.success("Umbrales guardados");
                    onClose();
                  }}
                  className="font-mono text-sm px-5 py-2.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 font-medium"
                >
                  Guardar cambios →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

function ProtoDashboard({
  profile,
  onLogout,
  onOpenProfile,
}: {
  profile: UserProfile;
  onLogout: () => void;
  onOpenProfile: () => void;
}) {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Agent>("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [banner, setBanner] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [modal, setModal] = useState<{
    open: boolean;
    tab: "historial" | "umbrales";
  }>({ open: false, tab: "historial" });
  const [chartRange, setChartRange] = useState("Turno");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      )
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const FILTERS = ["Todos", "En línea", "En pausa", "Desconectado"];
  const KPIS = [
    {
      label: "Nivel de Servicio",
      value: "78%",
      flag: "yellow",
      sub: "Meta: 85%",
      note: "↓ 7 pts",
      trend: "down",
      onClick: () => setFilter("En línea"),
    },
    {
      label: "TME Promedio",
      value: "4:32 min",
      flag: "red",
      sub: "Límite: 4:00",
      note: "↑ 32 s",
      trend: "up",
      onClick: () => {
        const a = AGENTS.find((a) => a.flag === "red");
        if (a) setSelectedAgent(a);
      },
    },
    {
      label: "Agentes En Línea",
      value: "17 / 20",
      flag: "green",
      sub: "Turno actual",
      note: "3 inactivos",
      trend: "stable",
      onClick: () => setFilter("En línea"),
    },
    {
      label: "En Pausa",
      value: "3",
      flag: "yellow",
      sub: "Máx perm.: 2",
      note: "1 excede",
      trend: "up",
      onClick: () => setFilter("En pausa"),
    },
  ];
  const TrendIcon = ({ t, f }: { t: string; f: string }) => {
    if (t === "up")
      return (
        <TrendingUp
          size={12}
          className={f === "red" ? "text-red-500" : "text-amber-500"}
        />
      );
    if (t === "down")
      return (
        <TrendingDown
          size={12}
          className={f === "yellow" ? "text-amber-500" : "text-green-500"}
        />
      );
    return <Minus size={12} className="text-gray-400" />;
  };

  const filtered = (
    filter === "Todos" ? AGENTS : AGENTS.filter((a) => a.status === filter)
  )
    .filter(
      (a) => !search || a.name.toLowerCase().includes(search.toLowerCase()),
    )
    .slice()
    .sort((a, b) => {
      const av = a[sortKey],
        bv = b[sortKey];
      const cmp =
        typeof av === "number"
          ? av - (bv as number)
          : String(av).localeCompare(String(bv));
      return sortAsc ? cmp : -cmp;
    });

  const handleSort = (key: keyof Agent) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };
  const chartData =
    chartRange === "1h"
      ? CHART.slice(-2)
      : chartRange === "3h"
        ? CHART.slice(-4)
        : CHART;
  const avatarBg =
    AVATAR_COLORS.find((c) => c.id === profile.avatarColor)?.cls ??
    "bg-blue-600";
  const userInitials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <nav className="bg-slate-900 text-white px-4 md:px-6 flex items-center h-14 flex-shrink-0 sticky top-0 z-30 gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Phone size={14} className="text-white" />
          </div>
          <span className="font-mono text-sm font-bold tracking-wider hidden sm:inline">
            CENTURY
          </span>
        </div>
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 ml-4">
          {[
            {
              label: "Dashboard",
              icon: <LayoutDashboard size={13} />,
              active: true,
              onClick: () => {},
            },
            {
              label: "Historial",
              icon: <History size={13} />,
              active: false,
              onClick: () => setModal({ open: true, tab: "historial" }),
            },
            {
              label: "Reportes",
              icon: <FileBarChart2 size={13} />,
              active: false,
              onClick: () => toast.info("Módulo de Reportes próximamente"),
            },
            {
              label: "Umbrales",
              icon: <Settings2 size={13} />,
              active: false,
              onClick: () => setModal({ open: true, tab: "umbrales" }),
            },
          ].map((n) => (
            <button
              key={n.label}
              onClick={n.onClick}
              className={`font-mono text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${n.active ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        {/* Shift badge */}
        <span className="font-mono text-xs text-slate-400 hidden lg:inline">
          {profile.shift}
        </span>
        {/* Notifications */}
        <button
          onClick={() => toast.info("3 alertas activas")}
          className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center relative flex-shrink-0"
        >
          <Bell size={14} className="text-slate-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        {/* User menu */}
        <div className="relative flex-shrink-0" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div
              className={`w-7 h-7 rounded-full ${avatarBg} flex items-center justify-center flex-shrink-0`}
            >
              <span className="font-mono text-xs font-bold text-white">
                {userInitials}
              </span>
            </div>
            <span className="font-mono text-xs text-slate-300 hidden sm:inline max-w-24 truncate">
              {profile.name.split(" ")[0]}
            </span>
            <ChevronDown
              size={12}
              className={`text-slate-400 transition-transform flex-shrink-0 ${userMenuOpen ? "rotate-180" : ""}`}
            />
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="p-3 border-b border-gray-100">
                <div
                  className={`w-10 h-10 rounded-xl ${avatarBg} flex items-center justify-center mb-2`}
                >
                  <span className="font-mono text-sm font-bold text-white">
                    {userInitials}
                  </span>
                </div>
                <p className="font-mono text-xs font-bold text-gray-900 truncate">
                  {profile.name}
                </p>
                <p className="font-mono text-xs text-gray-400 truncate">
                  {profile.email}
                </p>
                <p className="font-mono text-xs text-gray-400">
                  {profile.role}
                </p>
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-50 text-left transition-colors"
                >
                  <User size={13} className="text-gray-500" />
                  <span className="font-mono text-xs text-gray-700">
                    Editar perfil
                  </span>
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    setModal({ open: true, tab: "umbrales" });
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-50 text-left transition-colors"
                >
                  <Settings2 size={13} className="text-gray-500" />
                  <span className="font-mono text-xs text-gray-700">
                    Configuración
                  </span>
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-50 text-left transition-colors"
                >
                  <LogOut size={13} className="text-red-500" />
                  <span className="font-mono text-xs text-red-600">
                    Cerrar sesión
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center flex-shrink-0"
        >
          {mobileMenuOpen ? (
            <X size={14} className="text-white" />
          ) : (
            <Menu size={14} className="text-white" />
          )}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700 px-4 py-2 space-y-1 z-20 relative">
          {[
            { label: "Dashboard", onClick: () => setMobileMenuOpen(false) },
            {
              label: "Historial",
              onClick: () => {
                setMobileMenuOpen(false);
                setModal({ open: true, tab: "historial" });
              },
            },
            {
              label: "Reportes",
              onClick: () => {
                setMobileMenuOpen(false);
                toast.info("Próximamente");
              },
            },
            {
              label: "Umbrales",
              onClick: () => {
                setMobileMenuOpen(false);
                setModal({ open: true, tab: "umbrales" });
              },
            },
            {
              label: "Editar perfil",
              onClick: () => {
                setMobileMenuOpen(false);
                onOpenProfile();
              },
            },
          ].map((n) => (
            <button
              key={n.label}
              onClick={n.onClick}
              className="w-full text-left font-mono text-xs text-slate-300 hover:text-white px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
            >
              {n.label}
            </button>
          ))}
        </div>
      )}

      {/* Alert banner */}
      {banner && (
        <div className="flex items-center gap-3 bg-red-600 text-white px-4 md:px-6 py-2.5 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
          <span className="font-mono text-xs font-bold flex-1 min-w-0">
            ALERTA: TME supera umbral crítico — 4 agentes afectados
          </span>
          <button
            onClick={() => {
              setBanner(false);
              setFilter("En pausa");
            }}
            className="font-mono text-xs text-red-100 border border-red-400 rounded-lg px-2.5 py-1 hover:bg-red-700 hidden sm:block flex-shrink-0"
          >
            Ver agentes
          </button>
          <button
            onClick={() => setBanner(false)}
            className="font-mono text-xs text-red-300 hover:text-white flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <main className="flex-1 p-4 md:p-6 space-y-4 overflow-auto">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {KPIS.map((k) => (
            <button
              key={k.label}
              onClick={k.onClick}
              className={`bg-white border border-gray-200 ${FLAG_BORDER_L[k.flag]} p-4 text-left cursor-pointer hover:shadow-md transition-all rounded-2xl group`}
            >
              <p className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-2 truncate">
                {k.label}
              </p>
              <p
                className={`font-mono text-lg sm:text-2xl font-bold ${FLAG_TEXT[k.flag]} mb-1`}
              >
                {k.value}
              </p>
              <p className="font-mono text-[10px] sm:text-xs text-slate-400">{k.sub}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <TrendIcon t={k.trend} f={k.flag} />
                <span className={`font-mono text-xs ${FLAG_TEXT[k.flag]}`}>
                  {k.note}
                </span>
              </div>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-1 rounded-full transition-all ${k.flag === "green" ? "bg-green-400 w-4/5" : k.flag === "yellow" ? "bg-amber-400 w-3/5" : "bg-red-400 w-2/5"}`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 p-4 border-b border-gray-100 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-48">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar agente..."
                  className="w-full h-9 pl-8 pr-3 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50 focus:bg-white transition-all"
                />
              </div>
              {/* Filters */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`font-mono text-xs px-3 py-1.5 border rounded-xl whitespace-nowrap transition-colors flex-shrink-0 ${
                      filter === f
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            {/* Action buttons and stats */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
              <span className="font-mono text-xs text-slate-400">
                {filtered.length} agentes
              </span>
              <button
                onClick={() => toast.success("Exportando tabla...")}
                className="font-mono text-xs px-3 py-1.5 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Download size={12} /> Exportar
              </button>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {[
                    { k: "id", l: "#" },
                    { k: "name", l: "Agente" },
                    { k: "status", l: "Estado" },
                    { k: "tmeN", l: "TME" },
                    { k: "nsN", l: "Nv.Servicio" },
                    { k: "pauses", l: "Pausas" },
                    { k: "calls", l: "Llamadas" },
                  ].map((c) => (
                    <th
                      key={c.k}
                      onClick={() => handleSort(c.k as keyof Agent)}
                      className={`font-mono text-xs font-semibold text-gray-500 px-4 py-3 border-r border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors select-none whitespace-nowrap ${sortKey === c.k ? "bg-blue-50 text-blue-600" : ""}`}
                    >
                      <span className="flex items-center gap-1">
                        {c.l}
                        {sortKey === c.k ? (
                          <ArrowUpDown size={11} className="text-blue-500" />
                        ) : (
                          <ArrowUpDown size={11} className="text-gray-300" />
                        )}
                      </span>
                    </th>
                  ))}
                  <th className="font-mono text-xs font-semibold text-gray-500 px-4 py-3">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr
                    key={a.id}
                    onClick={() => setSelectedAgent(a)}
                    className={`border-b border-gray-50 hover:bg-blue-50/50 cursor-pointer transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/20"}`}
                  >
                    <td className="font-mono text-xs text-gray-400 px-4 py-3 border-r border-gray-50">
                      {a.id}
                    </td>
                    <td className="font-mono text-xs font-medium text-gray-800 px-4 py-3 border-r border-gray-50">
                      <span className="flex items-center gap-2.5">
                        <ProtoAvatar name={a.name} flag={a.flag} size="sm" />
                        {a.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-r border-gray-50">
                      <span
                        className={`font-mono text-xs px-2.5 py-1 border rounded-full ${FLAG_BADGE[a.flag]}`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td
                      className={`font-mono text-xs px-4 py-3 border-r border-gray-50 font-semibold ${FLAG_TEXT[a.flag]}`}
                    >
                      {a.tme}
                    </td>
                    <td
                      className={`font-mono text-xs px-4 py-3 border-r border-gray-50 font-semibold ${FLAG_TEXT[a.flag]}`}
                    >
                      {a.ns}
                    </td>
                    <td className="font-mono text-xs px-4 py-3 border-r border-gray-50 text-center">
                      <span
                        className={`font-semibold ${a.pauses >= 4 ? "text-red-600" : a.pauses >= 2 ? "text-amber-500" : "text-gray-500"}`}
                      >
                        {a.pauses}
                      </span>
                    </td>
                    <td className="font-mono text-xs px-4 py-3 border-r border-gray-50 text-center text-gray-600">
                      {a.calls}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAgent(a);
                        }}
                        className="font-mono text-xs px-3 py-1.5 border border-blue-200 text-blue-600 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        Ver →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="md:hidden divide-y divide-gray-50">
            {filtered.map((a) => (
              <div
                key={a.id}
                onClick={() => setSelectedAgent(a)}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <ProtoAvatar name={a.name} flag={a.flag} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                    {a.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`font-mono text-xs px-2 py-0.5 border rounded-full ${FLAG_BADGE[a.flag]}`}
                    >
                      {a.status}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p
                    className={`font-mono text-sm font-bold ${FLAG_TEXT[a.flag]}`}
                  >
                    {a.tme}
                  </p>
                  <p className="font-mono text-xs text-gray-400">NS: {a.ns}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-gray-400" />
              <span className="font-mono text-sm font-semibold text-gray-800">
                Tendencias del Turno
              </span>
            </div>
            <div className="flex gap-1 sm:ml-auto">
              {["1h", "3h", "Turno"].map((r) => (
                <button
                  key={r}
                  onClick={() => setChartRange(r)}
                  className={`font-mono text-xs px-3 py-1.5 border rounded-xl transition-colors ${chartRange === r ? "bg-slate-900 text-white border-slate-900" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="hora"
                tick={{ fontSize: 10, fontFamily: "monospace" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                key="dash-y-l"
                yAxisId="l"
                domain={[0, 12]}
                tick={{ fontSize: 10, fontFamily: "monospace" }}
                width={28}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                key="dash-y-r"
                yAxisId="r"
                orientation="right"
                domain={[40, 100]}
                tick={{ fontSize: 10, fontFamily: "monospace" }}
                width={32}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  borderColor: "#e5e7eb",
                  borderRadius: 12,
                }}
              />
              <Line
                key="dash-tme"
                yAxisId="l"
                type="monotone"
                dataKey="tme"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 2.5, fill: "#ef4444" }}
                name="TME (min)"
              />
              <Line
                key="dash-ns"
                yAxisId="r"
                type="monotone"
                dataKey="ns"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 2.5, fill: "#3b82f6" }}
                name="NS (%)"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3">
            {[
              { c: "bg-red-400", l: "TME promedio (min)" },
              { c: "bg-blue-500", l: "Nivel de Servicio (%)" },
            ].map(({ c, l }) => (
              <span key={l} className="flex items-center gap-1.5">
                <span className={`w-4 h-1.5 rounded-full ${c}`} />
                <span className="font-mono text-xs text-gray-400">{l}</span>
              </span>
            ))}
          </div>
        </div>
      </main>

      {selectedAgent && (
        <AgentDrawer
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
      {modal.open && (
        <ManagementModal
          defaultTab={modal.tab}
          onClose={() => setModal({ open: false, tab: "historial" })}
        />
      )}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

type AppMode = "wireframes" | "prototype";
type ProtoState = "login" | "dashboard";

const DEFAULT_PROFILE: UserProfile = {
  name: "Sergio Pérez",
  email: "s.perez@century.com",
  role: "Supervisor de turno",
  shift: "Turno Mañana · 08:00–16:00",
  phone: "+52 55 1234 5678",
  avatarColor: "blue",
};

export default function App() {
  const [protoState, setProtoState] = useState<ProtoState>("login");
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          style: { fontFamily: "monospace", fontSize: 12, borderRadius: 16 },
        }}
      />

      {protoState === "login" ? (
        <ProtoLogin onLogin={() => setProtoState("dashboard")} />
      ) : (
        <ProtoDashboard
          profile={profile}
          onLogout={() => setProtoState("login")}
          onOpenProfile={() => setProfileOpen(true)}
        />
      )}
      {profileOpen && (
        <UserProfileModal
          profile={profile}
          onSave={(p) => {
            setProfile(p);
          }}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </>
  );
}
