import { Agent } from "./types";

export const AGENTS: Agent[] = [
  { id: 1,  name: "Ana García",       status: "En línea",     tme: "3:45", tmeN: 3.75, ns: "92%", nsN: 92, pauses: 1, flag: "green",  calls: 41 },
  { id: 2,  name: "Carlos Ruiz",      status: "En pausa",     tme: "6:20", tmeN: 6.33, ns: "61%", nsN: 61, pauses: 3, flag: "red",    calls: 28 },
  { id: 3,  name: "María López",      status: "En línea",     tme: "4:10", tmeN: 4.17, ns: "85%", nsN: 85, pauses: 1, flag: "yellow", calls: 37 },
  { id: 4,  name: "José Martín",      status: "En línea",     tme: "3:55", tmeN: 3.92, ns: "88%", nsN: 88, pauses: 2, flag: "green",  calls: 39 },
  { id: 5,  name: "Laura Pérez",      status: "Desconectado", tme: "—",    tmeN: 0,    ns: "—",   nsN: 0,  pauses: 0, flag: "gray",   calls: 0  },
  { id: 6,  name: "Miguel Torres",    status: "En línea",     tme: "5:30", tmeN: 5.5,  ns: "72%", nsN: 72, pauses: 2, flag: "yellow", calls: 31 },
  { id: 7,  name: "Sofía Díaz",       status: "En línea",     tme: "3:20", tmeN: 3.33, ns: "94%", nsN: 94, pauses: 1, flag: "green",  calls: 44 },
  { id: 8,  name: "Roberto Silva",    status: "En pausa",     tme: "7:45", tmeN: 7.75, ns: "55%", nsN: 55, pauses: 4, flag: "red",    calls: 19 },
  { id: 9,  name: "Carmen Vega",      status: "En línea",     tme: "4:30", tmeN: 4.5,  ns: "80%", nsN: 80, pauses: 1, flag: "yellow", calls: 33 },
  { id: 10, name: "Felipe Mora",      status: "En línea",     tme: "3:10", tmeN: 3.17, ns: "96%", nsN: 96, pauses: 0, flag: "green",  calls: 47 },
  { id: 11, name: "Isabel Cruz",      status: "En línea",     tme: "5:00", tmeN: 5.0,  ns: "75%", nsN: 75, pauses: 2, flag: "yellow", calls: 29 },
  { id: 12, name: "Andrés Rojas",     status: "En pausa",     tme: "8:20", tmeN: 8.33, ns: "48%", nsN: 48, pauses: 5, flag: "red",    calls: 14 },
  { id: 13, name: "Valentina Ríos",   status: "En línea",     tme: "3:40", tmeN: 3.67, ns: "91%", nsN: 91, pauses: 1, flag: "green",  calls: 40 },
  { id: 14, name: "Diego Herrera",    status: "En línea",     tme: "4:50", tmeN: 4.83, ns: "78%", nsN: 78, pauses: 2, flag: "yellow", calls: 32 },
  { id: 15, name: "Paula Mendoza",    status: "En línea",     tme: "3:25", tmeN: 3.42, ns: "93%", nsN: 93, pauses: 1, flag: "green",  calls: 42 },
  { id: 16, name: "Sebastián Vargas", status: "Desconectado", tme: "—",    tmeN: 0,    ns: "—",   nsN: 0,  pauses: 0, flag: "gray",   calls: 0  },
  { id: 17, name: "Natalia Fuentes",  status: "En línea",     tme: "4:15", tmeN: 4.25, ns: "83%", nsN: 83, pauses: 1, flag: "yellow", calls: 35 },
  { id: 18, name: "Tomás Castillo",   status: "En línea",     tme: "6:00", tmeN: 6.0,  ns: "65%", nsN: 65, pauses: 3, flag: "red",    calls: 24 },
  { id: 19, name: "Gabriela Ponce",   status: "En línea",     tme: "3:50", tmeN: 3.83, ns: "89%", nsN: 89, pauses: 1, flag: "green",  calls: 38 },
  { id: 20, name: "Ricardo Paredes",  status: "En pausa",     tme: "9:10", tmeN: 9.17, ns: "42%", nsN: 42, pauses: 6, flag: "red",    calls: 11 },
];

export const CHART = [
  { hora: "08:00", tme: 3.2, ns: 94 },
  { hora: "09:00", tme: 3.9, ns: 89 },
  { hora: "10:00", tme: 4.6, ns: 80 },
  { hora: "11:00", tme: 5.2, ns: 73 },
  { hora: "12:00", tme: 6.1, ns: 62 },
  { hora: "13:00", tme: 5.4, ns: 70 },
  { hora: "14:00", tme: 4.8, ns: 77 },
  { hora: "15:00", tme: 4.2, ns: 82 },
  { hora: "16:00", tme: 3.9, ns: 86 },
];

export const FLAG_BORDER_L: Record<string, string> = {
  green: "border-l-4 border-l-green-500",
  yellow: "border-l-4 border-l-yellow-400",
  red: "border-l-4 border-l-red-500",
  gray: "border-l-4 border-l-gray-300",
};

export const FLAG_TEXT: Record<string, string> = {
  green: "text-green-600",
  yellow: "text-amber-600",
  red: "text-red-600",
  gray: "text-gray-400",
};

export const FLAG_DOT: Record<string, string> = {
  green: "bg-green-500",
  yellow: "bg-amber-400",
  red: "bg-red-50",
  gray: "bg-gray-350",
};

export const FLAG_BADGE: Record<string, string> = {
  green: "bg-green-50 text-green-700 border-green-200",
  yellow: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-600 border-red-200",
  gray: "bg-gray-100 text-gray-500 border-gray-200",
};

export const FLAG_AVATAR_BG: Record<string, string> = {
  green: "bg-green-500",
  yellow: "bg-amber-500",
  red: "bg-red-500",
  gray: "bg-gray-400",
};

export const FLAG_METRIC: Record<string, string> = {
  green: "bg-green-50 border-green-100",
  yellow: "bg-amber-50 border-amber-100",
  red: "bg-red-50 border-red-100",
  gray: "bg-gray-50 border-gray-100",
};

export const AVATAR_COLORS = [
  { id: "blue", cls: "bg-blue-600", label: "Azul" },
  { id: "violet", cls: "bg-violet-600", label: "Violeta" },
  { id: "teal", cls: "bg-teal-600", label: "Verde" },
  { id: "rose", cls: "bg-rose-600", label: "Rosa" },
  { id: "orange", cls: "bg-orange-500", label: "Naranja" },
  { id: "slate", cls: "bg-slate-700", label: "Gris" },
];
