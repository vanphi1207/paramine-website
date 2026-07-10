import React from "react";
import { LucideIcon } from "lucide-react";

export interface StaffMember {
  id: string;
  name: string;
  role: "Owner" | "Admin" | "Developer" | "Moderator" | "Builder" | "Helper";
  description: string;
  avatarUrl: string;
  username: string;
  contact?: string;
  discordUrl?: string;
  facebookUrl?: string;
}

export interface WikiSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface WikiCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  sections: WikiSection[];
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  details?: string;
  highlights?: string[];
  stats?: { label: string; value: string }[];
}

export type PageView = "home" | "wiki";

export interface GalleryPeriod {
  id: string;
  label: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  periodId: string;
  featured?: boolean;
}
