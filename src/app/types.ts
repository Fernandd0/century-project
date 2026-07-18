export interface UserProfile {
  name: string;
  email: string;
  role: string;
  shift: string;
  phone: string;
  avatarColor: string;
}

export interface Agent {
  id: number;
  name: string;
  status: string;
  tme: string;
  tmeN: number;
  ns: string;
  nsN: number;
  pauses: number;
  flag: string;
  calls: number;
}
