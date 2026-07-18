import { useState } from "react";
import { toast } from "sonner";
import { X, Save } from "lucide-react";
import { UserProfile } from "../types";
import { AVATAR_COLORS } from "../constants";

export function UserProfileModal({
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
