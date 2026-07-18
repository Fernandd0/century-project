import { toast } from "sonner";
import { X, MessageSquare, Pause, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis } from "recharts";
import { Agent } from "../types";
import { CHART, FLAG_BADGE, FLAG_METRIC, FLAG_TEXT } from "../constants";
import { ProtoAvatar } from "./ProtoAvatar";

export function AgentDrawer({
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
      Math.round((agent.calls * (0.6 + Math.sin(i) * 0.4)) / 9)
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
