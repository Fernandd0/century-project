import { useState } from "react";
import { Toaster } from "sonner";
import { UserProfile } from "./types";
import { ProtoLogin } from "./components/ProtoLogin";
import { ProtoDashboard } from "./components/ProtoDashboard";
import { UserProfileModal } from "./components/UserProfileModal";

const DEFAULT_PROFILE: UserProfile = {
  name: "Sergio Pérez",
  email: "s.perez@century.com",
  role: "Supervisor de turno",
  shift: "Turno Mañana · 08:00–16:00",
  phone: "+52 55 1234 5678",
  avatarColor: "blue",
};

export default function App() {
  const [protoState, setProtoState] = useState<"login" | "dashboard">("login");
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
