import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  History as HistoryIcon,
  FileBarChart2,
  Settings2,
  LogOut,
  Bell,
  ChevronDown,
  Download,
  ArrowUpDown,
  X,
  Menu,
  User,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Phone,
} from "lucide-react";
import { UserProfile, Agent } from "../types";
import {
  AGENTS,
  CHART,
  AVATAR_COLORS,
  FLAG_BORDER_L,
  FLAG_TEXT,
  FLAG_BADGE,
} from "../constants";
import { ProtoAvatar } from "./ProtoAvatar";
import { AgentDrawer } from "./AgentDrawer";
import { ManagementModal } from "./ManagementModal";

export function ProtoDashboard({
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
      ) {
        setUserMenuOpen(false);
      }
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
    if (t === "up") {
      return (
        <TrendingUp
          size={12}
          className={f === "red" ? "text-red-500" : "text-amber-500"}
        />
      );
    }
    if (t === "down") {
      return (
        <TrendingDown
          size={12}
          className={f === "yellow" ? "text-amber-500" : "text-green-500"}
        />
      );
    }
    return <Minus size={12} className="text-gray-400" />;
  };

  const filtered = (
    filter === "Todos" ? AGENTS : AGENTS.filter((a) => a.status === filter)
  )
    .filter(
      (a) => !search || a.name.toLowerCase().includes(search.toLowerCase())
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
              icon: <HistoryIcon size={13} />,
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
              className={`font-mono text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                n.active ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
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
                  className={`h-1 rounded-full transition-all ${
                    k.flag === "green" ? "bg-green-400 w-4/5" : k.flag === "yellow" ? "bg-amber-400 w-3/5" : "bg-red-400 w-2/5"
                  }`}
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
                      className={`font-mono text-xs font-semibold text-gray-500 px-4 py-3 border-r border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors select-none whitespace-nowrap ${
                        sortKey === c.k ? "bg-blue-50 text-blue-600" : ""
                      }`}
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
                    className={`border-b border-gray-50 hover:bg-blue-50/50 cursor-pointer transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                    }`}
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
                      <span className={`font-mono text-xs px-2.5 py-1 border rounded-full ${FLAG_BADGE[a.flag]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className={`font-mono text-xs px-4 py-3 border-r border-gray-50 font-semibold ${FLAG_TEXT[a.flag]}`}>
                      {a.tme}
                    </td>
                    <td className={`font-mono text-xs px-4 py-3 border-r border-gray-50 font-semibold ${FLAG_TEXT[a.flag]}`}>
                      {a.ns}
                    </td>
                    <td className="font-mono text-xs px-4 py-3 border-r border-gray-50 text-center font-semibold">
                      <span className={a.pauses >= 4 ? "text-red-600" : a.pauses >= 2 ? "text-amber-500" : "text-gray-500"}>
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
                    <span className={`font-mono text-xs px-2 py-0.5 border rounded-full ${FLAG_BADGE[a.flag]}`}>
                      {a.status}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-mono text-sm font-bold ${FLAG_TEXT[a.flag]}`}>{a.tme}</p>
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
                  className={`font-mono text-xs px-3 py-1.5 border rounded-xl transition-colors ${
                    chartRange === r ? "bg-slate-900 text-white border-slate-900" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
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
