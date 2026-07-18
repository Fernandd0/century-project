import { useState } from "react";
import { toast } from "sonner";
import { X, History as HistoryIcon, SlidersHorizontal, Download } from "lucide-react";
import { ProtoAvatar } from "./ProtoAvatar";

export function ManagementModal({
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
              i: <HistoryIcon size={13} />,
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
              className={`flex-1 md:flex-none font-mono text-xs px-5 py-3 border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                tab === t.k
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
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
                      className={`font-mono text-xs px-2.5 py-1 border rounded-full flex-shrink-0 ${
                        AC[h.flag]
                      }`}
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
                        className={`font-mono text-lg font-bold ${
                          s.c === "red" ? "text-red-600" : "text-amber-600"
                        }`}
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
                      className={`w-full h-2 rounded-full cursor-pointer ${
                        s.c === "red" ? "accent-red-500" : "accent-amber-500"
                      }`}
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
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 mt-6">
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
