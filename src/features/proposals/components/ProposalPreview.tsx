"use client";

import { useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProposalSection {
  title: string;
  content?: string;
  chips?: string[];
}

export interface ProposalTeamMember {
  name: string;
  role: string;
  experience?: string;
  yearsOfExperience?: string;
  keySkills?: string;
}

export interface ProposalGanttCard {
  title: string;
  from: string;
  to: string;
}

export interface ProposalDeliverable {
  name: string;
  description?: string;
  quantity?: number;
  unitPrice?: number;
  unit?: string;
  subtotal?: number;
}

export interface ProposalPaymentTerm {
  title: string;
  dueDate?: string;
  percentage?: number;
  amount?: number;
}

// kept for backwards compat with existing [id] page mapper
export interface ProposalMilestone {
  title: string;
  dueDate: string;
  percentage?: number;
}

export interface ProposalPreviewData {
  id: string;
  title: string;
  clientName: string;
  projectName: string;
  sector: string;
  language: string;
  startDate: string;
  endDate: string;
  type: "Technical" | "Financial" | "Visualization";
  preparedBy?: string;
  companyName?: string;
  executiveSummary?: string;
  additionalDetails?: string;
  // Technical
  sections?: ProposalSection[];
  team?: ProposalTeamMember[];
  ganttCards?: ProposalGanttCard[];
  milestones?: ProposalMilestone[]; // legacy / generic fallback
  // Financial
  deliverables?: ProposalDeliverable[];
  paymentTerms?: ProposalPaymentTerm[];
  totalAmount?: number;
  currency?: string;
  taxRate?: number;
  boqType?: string;
  projectType?: string;
  terms?: string;
  // Visualization / Prompt
  generatedContent?: string;
  // Visualization structured data
  teamStructure?: {
    projectManager: string;
    technicalLead: string;
    developers: { name: string; position: string }[];
  };
  skillset?: { name: string; description: string; level: number }[];
  phases?: { title: string; duration: string; description: string }[];
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_TECHNICAL: ProposalPreviewData = {
  id: "PROP-994371-202",
  title: "Digital Transformation Initiative",
  clientName: "Al Noor Holdings",
  projectName: "Enterprise ERP Implementation",
  sector: "Technology",
  language: "English",
  startDate: "2026-07-01",
  endDate: "2026-12-31",
  type: "Technical",
  preparedBy: "Rayyan AI",
  companyName: "Rayyan Solutions",
  executiveSummary:
    "This proposal outlines a comprehensive digital transformation roadmap for Al Noor Holdings, covering the full lifecycle implementation of an enterprise ERP system. Our approach combines proven methodology with cutting-edge AI tools to deliver measurable outcomes within the agreed timeline and budget.",
  additionalDetails:
    "All deliverables are subject to client sign-off before progression to the next phase. Weekly status reports will be provided throughout the engagement.",
  sections: [
    {
      title: "Administrative & Compliance",
      chips: ["ISO 27001", "GDPR Compliance", "Data Residency", "Audit Trails"],
      content:
        "The solution adheres to all applicable regulatory and data protection standards. A compliance matrix will be maintained and reviewed at each project milestone.",
    },
    {
      title: "Technical Methodology",
      chips: ["Agile/Scrum", "CI/CD Pipeline", "Microservices", "API-First"],
      content:
        "We adopt an Agile delivery model with two-week sprints, continuous stakeholder feedback loops, and iterative releases. Risk management checkpoints are embedded at each phase gate.",
    },
    {
      title: "Management & Resources",
      chips: [
        "PMO Support",
        "Resource Planning",
        "Risk Register",
        "Change Management",
      ],
      content:
        "A dedicated PMO will oversee project governance, resource allocation, and stakeholder communications throughout the engagement lifecycle.",
    },
  ],
  ganttCards: [
    { title: "Requirements & Discovery", from: "2026-07-01", to: "2026-07-20" },
    {
      title: "System Design & Architecture",
      from: "2026-07-21",
      to: "2026-08-15",
    },
    { title: "Development Phase 1", from: "2026-08-16", to: "2026-10-01" },
    { title: "Development Phase 2", from: "2026-10-02", to: "2026-11-10" },
    { title: "UAT & Go-Live", from: "2026-11-11", to: "2026-12-31" },
  ],
  team: [
    {
      name: "Ahmad Al-Rashid",
      role: "Project Manager",
      yearsOfExperience: "12 years",
      keySkills: "PMP, Agile, Risk Management",
    },
    {
      name: "Sara Mahmoud",
      role: "Solution Architect",
      yearsOfExperience: "9 years",
      keySkills: "Cloud Architecture, ERP, API Design",
    },
    {
      name: "Khalid Nasser",
      role: "Lead Developer",
      yearsOfExperience: "7 years",
      keySkills: "React, Node.js, PostgreSQL",
    },
    {
      name: "Fatima Al-Zahra",
      role: "Business Analyst",
      yearsOfExperience: "6 years",
      keySkills: "Requirements, BPMN, UAT",
    },
  ],
};

const SAMPLE_FINANCIAL: ProposalPreviewData = {
  id: "PROP-887234-101",
  title: "Enterprise Cloud Migration",
  clientName: "Gulf Tech Industries",
  projectName: "Infrastructure Modernization",
  sector: "Information Technology",
  language: "English",
  startDate: "2026-08-01",
  endDate: "2027-01-31",
  type: "Financial",
  preparedBy: "Rayyan AI",
  companyName: "Rayyan Solutions",
  boqType: "Fixed Price",
  projectType: "Infrastructure",
  executiveSummary:
    "This financial proposal details the complete cost structure for migrating Gulf Tech Industries' on-premise infrastructure to a hybrid cloud environment. All pricing is inclusive of implementation, licensing, training, and 12-month support.",
  terms:
    "Payment is due within 30 days of invoice date. All prices are exclusive of VAT unless stated. Any change requests outside the agreed scope will be quoted separately.",
  deliverables: [
    {
      name: "Cloud Infrastructure Setup",
      description: "AWS/Azure environment provisioning",
      quantity: 1,
      unitPrice: 85000,
      unit: "Project",
      subtotal: 85000,
    },
    {
      name: "Data Migration Services",
      description: "Migration of 50TB legacy data",
      quantity: 50,
      unitPrice: 1200,
      unit: "TB",
      subtotal: 60000,
    },
    {
      name: "Application Modernization",
      description: "Containerization of 12 core apps",
      quantity: 12,
      unitPrice: 15000,
      unit: "App",
      subtotal: 180000,
    },
    {
      name: "Security & Compliance Setup",
      description: "Zero-trust security framework",
      quantity: 1,
      unitPrice: 45000,
      unit: "Project",
      subtotal: 45000,
    },
    {
      name: "Training & Handover",
      description: "5-day on-site training for 3 teams",
      quantity: 3,
      unitPrice: 8000,
      unit: "Team",
      subtotal: 24000,
    },
  ],
  paymentTerms: [
    { title: "Project Kickoff", percentage: 30, dueDate: "2026-08-01" },
    {
      title: "Milestone 1 — Infrastructure Ready",
      percentage: 25,
      dueDate: "2026-09-15",
    },
    {
      title: "Milestone 2 — Migration Complete",
      percentage: 25,
      dueDate: "2026-11-01",
    },
    {
      title: "Final Delivery & Sign-off",
      percentage: 20,
      dueDate: "2027-01-31",
    },
  ],
  totalAmount: 394000,
  currency: "SAR",
  taxRate: 15,
};

const SAMPLE_VISUALIZATION: ProposalPreviewData = {
  id: "PROP-551892-303",
  title: "Smart City Dashboard",
  clientName: "Riyadh Municipality",
  projectName: "Urban Data Visualization Platform",
  sector: "Government",
  language: "English",
  startDate: "2026-09-01",
  endDate: "2026-12-31",
  type: "Visualization",
  preparedBy: "Rayyan AI",
  companyName: "Rayyan Solutions",
  executiveSummary:
    "This proposal presents the development of an interactive smart city dashboard for Riyadh Municipality, unifying data from 14 city departments into a single real-time visualization platform accessible to decision-makers.",
  teamStructure: {
    projectManager: "Ahmed Khalid",
    technicalLead: "Ali Mahmoud",
    developers: [
      { name: "Sara Nasser", position: "Frontend Dev" },
      { name: "Omar Faris", position: "Backend Dev" },
      { name: "Lina Khalid", position: "Data Engineer" },
      { name: "Tariq Hassan", position: "DevOps" },
    ],
  },
  skillset: [
    {
      name: "Technical Skills",
      description:
        "Delivering robust B2B architectures and automated data infrastructures",
      level: 95,
    },
    {
      name: "Communication",
      description:
        "Aligning cross-functional engineering teams with enterprise stakeholder goals",
      level: 93,
    },
    {
      name: "Leadership",
      description:
        "Guiding complex digital products from inception to market delivery",
      level: 90,
    },
    {
      name: "Problem Solving",
      description:
        "Overcoming structural architectural bottlenecks and optimizing legacy system flows",
      level: 47,
    },
    {
      name: "Project Management",
      description:
        "Orchestrating enterprise project lifecycles under strict, efficient delivery timelines",
      level: 42,
    },
    {
      name: "Innovation",
      description:
        "Deploying cutting-edge AI features to redefine standard corporate workflows",
      level: 70,
    },
  ],
  phases: [
    {
      title: "Requirements & Discovery",
      duration: "2 weeks",
      description: "Stakeholder interviews, system mapping, wireframes",
    },
    {
      title: "Design & Architecture",
      duration: "3 weeks",
      description: "UI/UX design, API contracts, DB schema",
    },
    {
      title: "Core Development",
      duration: "6 weeks",
      description: "Dashboard, map layers, API integrations",
    },
    {
      title: "Testing & UAT",
      duration: "2 weeks",
      description: "QA cycles, user acceptance testing",
    },
    {
      title: "Deployment & Handover",
      duration: "1 week",
      description: "Go-live, training, documentation",
    },
  ],
  generatedContent: `## Objectives

The platform will provide real-time visibility into city operations including traffic flow, utility consumption, public safety incidents, and citizen service requests.

## Proposed Solution

We will deliver a web-based platform built on modern visualization libraries (D3.js, Mapbox) with REST API integrations to existing municipal data systems. Key features include:

**Live city map** with layered data overlays for traffic, utilities, and incidents.

**KPI dashboard** with 40+ configurable metrics and drill-down capability.

**Predictive analytics** module powered by historical trend analysis.

**Alert system** for anomaly detection with configurable thresholds.

**Role-based access** for department heads and senior management.

## Technical Stack

The platform is built on Next.js frontend with a Python/FastAPI backend, PostgreSQL time-series database, and Redis caching layer. All infrastructure is hosted on a private government cloud environment meeting CITC compliance requirements.

## Delivery Plan

Phase 1 (Weeks 1–4): Requirements gathering, wireframes, and stakeholder approvals.

Phase 2 (Weeks 5–10): Core platform development and API integrations.

Phase 3 (Weeks 11–14): Testing, UAT with municipality teams, and deployment.

Phase 4 (Weeks 15–16): Training, documentation, and handover.`,
  sections: [
    {
      title: "Data Sources & Integrations",
      content:
        "The platform will integrate with 14 municipal data sources including SCADA systems, CRM platforms, IoT sensor networks, and third-party traffic management APIs. All integrations use secure OAuth 2.0 and encrypted data pipelines.",
    },
    {
      title: "Security & Compliance",
      content:
        "The solution meets CITC and NCA cybersecurity requirements. All data is encrypted at rest and in transit. Role-based access control ensures data segregation between departments.",
    },
  ],
  team: [
    {
      name: "Omar Al-Farsi",
      role: "Data Visualization Lead",
      yearsOfExperience: "8 years",
      keySkills: "D3.js, Mapbox, Tableau",
    },
    {
      name: "Nora Khalid",
      role: "Backend Engineer",
      yearsOfExperience: "6 years",
      keySkills: "Python, FastAPI, PostgreSQL",
    },
    {
      name: "Tariq Hassan",
      role: "UX Designer",
      yearsOfExperience: "5 years",
      keySkills: "Figma, User Research, Accessibility",
    },
  ],
};

export const SAMPLE_DATA_MAP = {
  Technical: SAMPLE_TECHNICAL,
  Financial: SAMPLE_FINANCIAL,
  Visualization: SAMPLE_VISUALIZATION,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatCurrency(amount: number, currency = "SAR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-5 w-1 shrink-0 rounded-full bg-[#1C4D3E]" />
        <h2 className="text-base font-bold text-[#111827]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-widest text-white/50">
        {label}
      </span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#1C4D3E]/10 px-2.5 py-1 text-[11px] font-medium text-[#1C4D3E]">
      {label}
    </span>
  );
}

function TeamGrid({ team }: { team: ProposalTeamMember[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {team.map((m, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1C4D3E]/10 text-xs font-bold text-[#1C4D3E]">
            {initials(m.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#111827]">{m.name}</p>
            <p className="text-xs text-[#6b7280]">{m.role}</p>
            {(m.yearsOfExperience ?? m.experience) && (
              <p className="mt-0.5 text-[11px] text-[#9ca3af]">
                {m.yearsOfExperience ?? m.experience} experience
              </p>
            )}
            {m.keySkills && (
              <p className="mt-1 text-[11px] text-[#6b7280]">{m.keySkills}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Gantt Timeline ───────────────────────────────────────────────────────────

const GANTT_COLORS = [
  "#1C4D3E",
  "#488981",
  "#5aab9e",
  "#34A853",
  "#50aed4",
  "#366b65",
];

function GanttTimeline({ cards }: { cards: ProposalGanttCard[] }) {
  const parsed = cards.map((c) => ({
    ...c,
    fromMs: new Date(c.from).getTime(),
    toMs:   new Date(c.to).getTime(),
  }));

  const minMs   = Math.min(...parsed.map((c) => c.fromMs));
  const maxMs   = Math.max(...parsed.map((c) => c.toMs));
  const spanMs  = maxMs - minMs || 1;

  // Build month header ticks
  const months: { label: string; left: number; width: number }[] = [];
  const start = new Date(minMs);
  start.setDate(1);
  const cursor = new Date(start);
  while (cursor.getTime() <= maxMs) {
    const mStart = Math.max(cursor.getTime(), minMs);
    const next   = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
    const mEnd   = Math.min(next.getTime() - 1, maxMs);
    const left   = ((mStart - minMs) / spanMs) * 100;
    const width  = ((mEnd - mStart) / spanMs) * 100;
    months.push({
      label: cursor.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
      left,
      width,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return (
    <div className="flex flex-col gap-0 overflow-hidden rounded-xl border border-[#e5e7eb]">
      {/* Month header */}
      <div className="relative flex h-7 bg-[#f3f4f6]">
        {months.map((m, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 flex items-center justify-center border-r border-[#e5e7eb] last:border-r-0"
            style={{ left: `${m.left}%`, width: `${m.width}%` }}
          >
            <span className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wide truncate px-1">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* Month column grid lines */}
      <div className="relative">
        {/* vertical grid lines */}
        {months.map((m, i) => (
          <div
            key={i}
            className="pointer-events-none absolute top-0 bottom-0 border-r border-[#f3f4f6]"
            style={{ left: `${m.left + m.width}%` }}
          />
        ))}

        {/* Task rows */}
        {parsed.map((card, i) => {
          const left  = ((card.fromMs - minMs) / spanMs) * 100;
          const width = Math.max(2, ((card.toMs - card.fromMs) / spanMs) * 100);
          const color = GANTT_COLORS[i % GANTT_COLORS.length];

          return (
            <div
              key={i}
              className={`relative flex items-center px-3 py-2 ${
                i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
              } border-b border-[#f3f4f6] last:border-b-0`}
              style={{ minHeight: "40px" }}
            >
              {/* Row number */}
              <span
                className="absolute left-0 flex h-full w-8 shrink-0 items-center justify-center text-[10px] font-bold"
                style={{ color }}
              >
                {i + 1}
              </span>

              {/* Gantt bar area */}
              <div className="relative ml-6 flex-1" style={{ height: "22px" }}>
                <div
                  className="absolute top-0 bottom-0 flex items-center rounded-full px-2.5 shadow-sm"
                  style={{ left: `${left}%`, width: `${width}%`, backgroundColor: color }}
                >
                  <span className="truncate text-[10px] font-semibold text-white leading-none">
                    {card.title}
                  </span>
                </div>
              </div>

              {/* Date range label — right side */}
              <div className="ml-3 shrink-0 text-right">
                <span className="block text-[9px] text-[#9ca3af] leading-tight whitespace-nowrap">
                  {new Date(card.from).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                </span>
                <span className="block text-[9px] text-[#9ca3af] leading-tight whitespace-nowrap">
                  {new Date(card.to).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Type-specific section renderers ─────────────────────────────────────────

function TechnicalBody({ data }: { data: ProposalPreviewData }) {
  return (
    <>
      {data.executiveSummary && (
        <Section title="Executive Summary">
          <p className="text-sm leading-relaxed text-[#374151]">
            {data.executiveSummary}
          </p>
        </Section>
      )}

      {data.sections?.map((s, i) => (
        <Section key={i} title={s.title}>
          {s.chips && s.chips.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {s.chips.map((c, ci) => (
                <Chip key={ci} label={c} />
              ))}
            </div>
          )}
          {s.content && (
            <p className="text-sm leading-relaxed text-[#374151]">
              {s.content}
            </p>
          )}
        </Section>
      ))}

      {data.ganttCards && data.ganttCards.length > 0 && (
        <Section title="Project Timeline">
          <GanttTimeline cards={data.ganttCards} />
        </Section>
      )}

      {/* Legacy milestones fallback */}
      {!data.ganttCards?.length &&
        data.milestones &&
        data.milestones.length > 0 && (
          <Section title="Project Milestones">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                    Milestone
                  </th>
                  <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.milestones.map((m, i) => (
                  <tr key={i} className="border-b border-[#f3f4f6]">
                    <td className="py-2.5 text-[#111827]">
                      <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1C4D3E]/10 text-[10px] font-bold text-[#1C4D3E]">
                        {i + 1}
                      </span>
                      {m.title}
                    </td>
                    <td className="py-2.5 text-[#6b7280]">
                      {formatDate(m.dueDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

      {data.team && data.team.length > 0 && (
        <Section title="Project Team">
          <TeamGrid team={data.team} />
        </Section>
      )}

      {data.additionalDetails && (
        <Section title="Additional Notes">
          <p className="text-sm leading-relaxed text-[#374151]">
            {data.additionalDetails}
          </p>
        </Section>
      )}
    </>
  );
}

function FinancialBody({ data }: { data: ProposalPreviewData }) {
  const subtotal =
    data.totalAmount ??
    data.deliverables?.reduce((s, d) => s + (d.subtotal ?? 0), 0) ??
    0;
  const tax = data.taxRate ? subtotal * (data.taxRate / 100) : 0;
  const grand = subtotal + tax;

  return (
    <>
      {data.executiveSummary && (
        <Section title="Executive Summary">
          <p className="text-sm leading-relaxed text-[#374151]">
            {data.executiveSummary}
          </p>
        </Section>
      )}

      {(data.boqType || data.projectType || data.taxRate !== undefined) && (
        <Section title="Project Information">
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 text-sm sm:grid-cols-4">
            {data.boqType && <InfoPair label="BOQ Type" value={data.boqType} />}
            {data.projectType && (
              <InfoPair label="Project Type" value={data.projectType} />
            )}
            {data.taxRate !== undefined && (
              <InfoPair label="VAT Rate" value={`${data.taxRate}%`} />
            )}
            {data.currency && (
              <InfoPair label="Currency" value={data.currency} />
            )}
          </div>
        </Section>
      )}

      {data.deliverables && data.deliverables.length > 0 && (
        <Section title="Deliverables & Pricing">
          <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
            <table className="w-full text-sm">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                    Deliverable
                  </th>
                  <th className="px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                    Qty
                  </th>
                  <th className="px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                    Unit
                  </th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                    Unit Price
                  </th>
                  <th className="px-4 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.deliverables.map((d, i) => (
                  <tr key={i} className="border-t border-[#f3f4f6]">
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-[#111827]">{d.name}</p>
                      {d.description && (
                        <p className="text-[11px] text-[#9ca3af]">
                          {d.description}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center text-[#374151]">
                      {d.quantity ?? "—"}
                    </td>
                    <td className="px-3 py-2.5 text-center text-[#374151]">
                      {d.unit ?? "—"}
                    </td>
                    <td className="px-3 py-2.5 text-right text-[#374151]">
                      {d.unitPrice
                        ? formatCurrency(d.unitPrice, data.currency)
                        : "—"}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-[#111827]">
                      {d.subtotal
                        ? formatCurrency(d.subtotal, data.currency)
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {data.paymentTerms && data.paymentTerms.length > 0 && (
        <Section title="Payment Schedule">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb]">
                <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  Milestone
                </th>
                <th className="pb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  %
                </th>
                <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  Due Date
                </th>
                <th className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.paymentTerms.map((pt, i) => {
                const amount =
                  pt.amount ??
                  (pt.percentage ? subtotal * (pt.percentage / 100) : null);
                return (
                  <tr key={i} className="border-b border-[#f3f4f6]">
                    <td className="py-2.5 text-[#111827]">
                      <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1C4D3E]/10 text-[10px] font-bold text-[#1C4D3E]">
                        {i + 1}
                      </span>
                      {pt.title}
                    </td>
                    <td className="py-2.5 text-center text-[#6b7280]">
                      {pt.percentage ? `${pt.percentage}%` : "—"}
                    </td>
                    <td className="py-2.5 text-[#6b7280]">
                      {pt.dueDate ? formatDate(pt.dueDate) : "—"}
                    </td>
                    <td className="py-2.5 text-right font-medium text-[#111827]">
                      {amount ? formatCurrency(amount, data.currency) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Section>
      )}

      <Section title="Financial Summary">
        <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
          <div className="flex justify-between px-5 py-3 text-sm">
            <span className="text-[#6b7280]">Subtotal</span>
            <span className="font-medium text-[#111827]">
              {formatCurrency(subtotal, data.currency)}
            </span>
          </div>
          {data.taxRate !== undefined && (
            <div className="flex justify-between border-t border-[#f3f4f6] px-5 py-3 text-sm">
              <span className="text-[#6b7280]">VAT ({data.taxRate}%)</span>
              <span className="font-medium text-[#111827]">
                {formatCurrency(tax, data.currency)}
              </span>
            </div>
          )}
          <div
            className="flex justify-between border-t border-[#e5e7eb] bg-[#1C4D3E] px-5 py-3"
            style={{
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            }}
          >
            <span className="text-sm font-bold text-white">Total Amount</span>
            <span className="text-sm font-bold text-white">
              {formatCurrency(grand, data.currency)}
            </span>
          </div>
        </div>
      </Section>

      {data.terms && (
        <Section title="Terms & Conditions">
          <p className="text-sm leading-relaxed text-[#374151]">{data.terms}</p>
        </Section>
      )}
    </>
  );
}

const PHASE_COLORS = [
  "#1C4D3E",
  "#488981",
  "#5aab9e",
  "#34A853",
  "#50aed4",
  "#51d1b8",
];

function parseDurationDays(dur: string): number {
  const lower = (dur || "").toLowerCase().trim();
  const num = parseFloat(lower) || 1;
  if (lower.includes("month")) return num * 30;
  if (lower.includes("week")) return num * 7;
  return num;
}

function OrgPdfNode({
  name,
  role,
  small = false,
}: {
  name: string;
  role: string;
  small?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-xl border border-[#e5e7eb] bg-[#f9fafb] ${small ? "px-2 py-2 min-w-[80px]" : "px-4 py-3 min-w-[130px]"}`}
    >
      <div
        className={`flex items-center justify-center rounded-full bg-[#1C4D3E]/10 ${small ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs"} font-bold text-[#1C4D3E]`}
      >
        {name
          ? name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
          : "?"}
      </div>
      <p
        className={`mt-1 font-semibold text-[#111827] text-center ${small ? "text-[10px]" : "text-xs"}`}
      >
        {name || "—"}
      </p>
      <p
        className={`text-[#6b7280] text-center ${small ? "text-[9px]" : "text-[10px]"}`}
      >
        {role}
      </p>
    </div>
  );
}

function VisualizationBody({ data }: { data: ProposalPreviewData }) {
  return (
    <>
      {data.executiveSummary && (
        <Section title="Executive Summary">
          <p className="text-sm leading-relaxed text-[#374151]">
            {data.executiveSummary}
          </p>
        </Section>
      )}

      {/* Team Structure / Org Chart */}
      {data.teamStructure && (
        <Section title="Team Structure">
          <div className="flex flex-col items-center gap-0 py-2">
            <OrgPdfNode
              name={data.teamStructure.projectManager}
              role="Project Manager"
            />
            <div className="h-5 w-px border-l-2 border-dashed border-[#488981]" />
            <OrgPdfNode
              name={data.teamStructure.technicalLead}
              role="Technical Lead"
            />
            {data.teamStructure.developers.length > 0 && (
              <>
                <div className="h-4 w-px bg-[#488981]" />
                <div className="relative w-full">
                  {data.teamStructure.developers.length > 1 && (
                    <div
                      className="absolute top-0 h-px bg-[#488981]"
                      style={{
                        left: `calc(100% / ${Math.min(4, data.teamStructure.developers.length) * 2})`,
                        right: `calc(100% / ${Math.min(4, data.teamStructure.developers.length) * 2})`,
                      }}
                    />
                  )}
                  <div
                    className="grid gap-2 pt-0"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(4, data.teamStructure.developers.length)}, 1fr)`,
                    }}
                  >
                    {data.teamStructure.developers.map((dev, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#488981]" />
                          <div className="h-3 w-px bg-[#488981]" />
                        </div>
                        <OrgPdfNode
                          name={dev.name}
                          role={dev.position || "Developer"}
                          small
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Section>
      )}

      {/* Skillset Visualization */}
      {data.skillset && data.skillset.length > 0 && (
        <Section title="Skillset Visualization">
          <div className="flex flex-col gap-2">
            {data.skillset.map((skill, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-right text-[11px] font-medium text-[#111827]">
                  {skill.name}
                </span>
                <div
                  className="flex-1 overflow-hidden rounded-full bg-[#e5e7eb]"
                  style={{ height: "16px" }}
                >
                  <div
                    className="h-full rounded-full bg-[#1C4D3E]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="w-7 shrink-0 text-right text-[11px] font-bold text-[#1C4D3E]">
                  {skill.level}
                </span>
              </div>
            ))}
            <div className="ms-35 flex justify-between text-[10px] text-[#9ca3af] border-t border-[#e5e7eb] pt-1">
              {[0, 25, 50, 75, 100].map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Project Timeline */}
      {data.phases && data.phases.length > 0 && (
        <Section title="Project Timeline">
          {(() => {
            const durations = data.phases!.map((p) =>
              parseDurationDays(p.duration),
            );
            const total = durations.reduce((a, b) => a + b, 0) || 1;
            return (
              <div className="flex flex-col gap-2">
                {data.phases!.map((phase, i) => {
                  const pct = Math.max(5, (durations[i] / total) * 100);
                  const offset =
                    (durations.slice(0, i).reduce((a, b) => a + b, 0) / total) *
                    100;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-32 shrink-0 truncate text-[11px] font-medium text-[#111827]">
                        {phase.title}
                      </span>
                      <div
                        className="relative flex-1 overflow-hidden rounded-full bg-[#e5e7eb]"
                        style={{ height: "22px" }}
                      >
                        <div
                          className="absolute top-0 bottom-0 rounded-full flex items-center px-2"
                          style={{
                            left: `${offset}%`,
                            width: `${pct}%`,
                            backgroundColor:
                              PHASE_COLORS[i % PHASE_COLORS.length],
                            opacity: 0.9,
                          }}
                        >
                          <span className="truncate text-[10px] font-semibold text-white">
                            {phase.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </Section>
      )}

      {/* Generated content fallback */}
      {data.generatedContent && !data.teamStructure && (
        <Section title="Proposal Details">
          <div className="flex flex-col gap-2 text-sm leading-relaxed text-[#374151]">
            {data.generatedContent.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h3
                    key={i}
                    className="mt-2 text-[13px] font-bold text-[#111827]"
                  >
                    {block.replace("## ", "")}
                  </h3>
                );
              }
              const parts = block.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i}>
                  {parts.map((part, j) =>
                    j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
                  )}
                </p>
              );
            })}
          </div>
        </Section>
      )}

      {data.sections?.map((s, i) => (
        <Section key={i} title={s.title}>
          {s.content && (
            <p className="text-sm leading-relaxed text-[#374151]">
              {s.content}
            </p>
          )}
        </Section>
      ))}
    </>
  );
}

function InfoPair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-[#9ca3af]">
        {label}
      </p>
      <p className="font-semibold text-[#111827]">{value}</p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  data?: ProposalPreviewData;
}

export default function ProposalPreview({ data = SAMPLE_TECHNICAL }: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#e8e8e8] dark:bg-[#1a1a1a] py-8 px-4">
      {/* Toolbar */}
      <div className="print:hidden mx-auto mb-6 flex max-w-[794px] items-center justify-between">
        <p className="text-sm text-black/50 dark:text-white/50">
          Proposal ID:{" "}
          <span className="font-semibold text-black/70 dark:text-white/70">
            {data.id}
          </span>
        </p>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-full bg-[#1C4D3E] px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
        >
          <PrintIcon />
          Print / Save as PDF
        </button>
      </div>

      {/* A4 Page */}
      <div
        ref={printRef}
        id="proposal-print"
        className="mx-auto w-full max-w-[794px] bg-white shadow-xl print:shadow-none print:max-w-none"
      >
        {/* Cover */}
        <div
          className="relative overflow-hidden bg-[#1C4D3E] px-10 pt-10 pb-14"
          style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -right-4 top-20 h-32 w-32 rounded-full bg-white/5" />

          <div className="relative flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5aab9e]">
                {data.companyName ?? "Your Company"}
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight text-white">
                {data.title}
              </h1>
              <p className="mt-1 text-base text-white/70">{data.projectName}</p>
            </div>
            <span className="mt-1 shrink-0 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              {data.type} Proposal
            </span>
          </div>

          <div className="relative mt-8 flex flex-wrap gap-6 border-t border-white/15 pt-6">
            <MetaItem label="Prepared for" value={data.clientName} />
            <MetaItem label="Sector" value={data.sector} />
            <MetaItem label="Language" value={data.language} />
            <MetaItem label="Start Date" value={formatDate(data.startDate)} />
            <MetaItem label="End Date" value={formatDate(data.endDate)} />
            <MetaItem label="Proposal ID" value={data.id} />
          </div>
        </div>

        {/* Body */}
        <div className="px-10 py-8 flex flex-col gap-8">
          {data.type === "Technical" && <TechnicalBody data={data} />}
          {data.type === "Financial" && <FinancialBody data={data} />}
          {data.type === "Visualization" && <VisualizationBody data={data} />}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#e5e7eb] px-10 py-5">
          <p className="text-xs text-[#9ca3af]">
            Prepared by{" "}
            <span className="font-semibold text-[#1C4D3E]">
              {data.preparedBy ?? data.companyName}
            </span>
          </p>
          <p className="text-xs text-[#9ca3af]">
            Generated on {formatDate(new Date().toISOString())}
          </p>
          <p className="text-xs text-[#9ca3af]">{data.id}</p>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #proposal-print, #proposal-print * { visibility: visible; }
          #proposal-print {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            box-shadow: none;
          }
          #proposal-print * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}

function PrintIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}
