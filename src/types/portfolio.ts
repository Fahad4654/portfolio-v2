import React from "react";
import {
  User,
  Shapes,
  GraduationCap,
  BriefcaseBusiness,
  FileText,
  Send,
} from "lucide-react";

export type Section =
  | "profile"
  | "skills"
  | "experience"
  | "portfolio"
  | "education"
  | "contact";

export const links: { id: Section; icon: React.ElementType; text: string }[] = [
  { id: "profile", icon: User, text: "Personal Info" },
  { id: "skills", icon: Shapes, text: "Technical Skills" },
  { id: "education", icon: GraduationCap, text: "Education" },
  { id: "experience", icon: BriefcaseBusiness, text: "Work Experience" },
  { id: "portfolio", icon: FileText, text: "Projects" },
  { id: "contact", icon: Send, text: "Contact Me" },
];
