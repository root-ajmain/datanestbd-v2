import {
  MessageCircle,
  Route,
  UserCheck,
  Database,
  AlertTriangle,
  KeyRound,
  Server,
  FileSearch,
  LayoutDashboard,
  ShieldCheck,
  Eye,
  type LucideIcon,
} from 'lucide-react';
import type { WorkflowStep } from '@/components/design-system/AnimatedWorkflow';

// Consumed from Server Component pages — only plain data or already-rendered
// elements can cross into the Client Component, not bare component
// references — so every icon is instantiated up front via this helper.
function stepIcon(Icon: LucideIcon) {
  return <Icon className="h-5 w-5" aria-hidden="true" />;
}

export const projectWorkflows: Record<string, WorkflowStep[]> = {
  'whatchimp-multiagent-waba': [
    { label: 'WhatsApp Message', icon: stepIcon(MessageCircle) },
    { label: 'WhatChimp Routing', icon: stepIcon(Route) },
    { label: 'Agent Assignment', icon: stepIcon(UserCheck) },
    { label: 'CRM Record', icon: stepIcon(Database) },
    { label: 'Escalation', icon: stepIcon(AlertTriangle) },
  ],
  'cloud-saas-enterprise-portal': [
    { label: 'User Sign-In', icon: stepIcon(KeyRound) },
    { label: 'Role Check', icon: stepIcon(ShieldCheck) },
    { label: 'Tenant Query', icon: stepIcon(Server) },
    { label: 'Report Build', icon: stepIcon(Database) },
    { label: 'Dashboard', icon: stepIcon(LayoutDashboard) },
  ],
  'intelligent-lead-triage-pipeline': [
    { label: 'Inquiry Text', icon: stepIcon(FileSearch) },
    { label: 'Field Extraction', icon: stepIcon(Eye) },
    { label: 'Schema Validation', icon: stepIcon(ShieldCheck) },
    { label: 'CRM Record', icon: stepIcon(Database) },
    { label: 'Human Review', icon: stepIcon(UserCheck) },
  ],
};
