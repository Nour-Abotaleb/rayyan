"use client";

import { useState } from "react";
import PersonIcon from "@/icons/PersonIcon";
import FlowDiagramIcon from "@/icons/FlowDiagramIcon";
import PlusIcon from "@/icons/PlusIcon";
import CloseIcon from "@/icons/CloseIcon";

export interface Developer {
  id: number;
  name: string;
  position: string;
}

export interface TeamStepData {
  projectManager: string;
  technicalLead: string;
  developers: Omit<Developer, "id">[];
}

function OrgNode({
  name,
  role,
  small = false,
}: {
  name: string;
  role: string;
  small?: boolean;
}) {
  const empty = !name.trim();
  return (
    <div
      className={`flex flex-col items-center rounded-2xl border border-[#E5E7EB] bg-white dark:border-[#1B272B] dark:bg-[#0D0D0D] shadow-sm ${
        small ? "px-3 py-3 min-w-[110px]" : "px-6 py-4 min-w-[160px]"
      }`}
    >
      <FlowDiagramIcon size={small ? 22 : 28} />
      <p className={`mt-1.5 font-semibold text-[#111827] dark:text-white text-center ${small ? "text-xs" : "text-sm"}`}>
        {empty ? <span className="text-[#9ca3af] italic">{role}</span> : name}
      </p>
      <p className={`text-[#6b7280] dark:text-zinc-400 text-center ${small ? "text-[10px]" : "text-xs"}`}>{role}</p>
    </div>
  );
}

interface Props {
  data: TeamStepData;
  onChange: (data: TeamStepData) => void;
}

export default function VisualizationTeamStep({ data, onChange }: Props) {
  function setManager(v: string) { onChange({ ...data, projectManager: v }); }
  function setLead(v: string) { onChange({ ...data, technicalLead: v }); }

  function addDev() {
    onChange({
      ...data,
      developers: [...data.developers, { name: "", position: "" }],
    });
  }

  function removeDev(idx: number) {
    if (data.developers.length <= 1) return;
    onChange({ ...data, developers: data.developers.filter((_, i) => i !== idx) });
  }

  function updateDev(idx: number, field: "name" | "position", value: string) {
    onChange({
      ...data,
      developers: data.developers.map((d, i) => i === idx ? { ...d, [field]: value } : d),
    });
  }

  const cols = Math.min(4, data.developers.length);

  return (
    <div className="flex flex-col gap-6">
      {/* Form */}
      <div>
        {/* Project Manager + Technical Lead */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Project Manager"
            placeholder="ex: Ahmed Adel"
            value={data.projectManager}
            onChange={setManager}
            icon={<PersonIcon size={20} />}
          />
          <Field
            label="Technical Lead"
            placeholder="ex: Ahmed Adel"
            value={data.technicalLead}
            onChange={setLead}
            icon={<PersonIcon size={20} />}
          />
        </div>

        {/* Development Team */}
        <div className="mt-6 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-black dark:text-white">Development Team</h3>

          {data.developers.map((dev, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-1 gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={`Developer ${i + 1} name`}
                    value={dev.name}
                    onChange={(e) => updateDev(i, "name", e.target.value)}
                    className="input-style w-full rounded-[44px] py-3 ps-4 pe-10 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD]"
                  />
                  <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
                    <FlowDiagramIcon size={16} />
                  </span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={`Developer ${i + 1} position`}
                    value={dev.position}
                    onChange={(e) => updateDev(i, "position", e.target.value)}
                    className="input-style w-full rounded-[44px] py-3 ps-4 pe-10 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD]"
                  />
                  <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
                    <FlowDiagramIcon size={16} />
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeDev(i)}
                disabled={data.developers.length <= 1}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/40 transition-opacity hover:opacity-70 disabled:opacity-20 dark:border-white/10 dark:text-white/40 cursor-pointer"
              >
                <CloseIcon size={14} />
              </button>
              {i === data.developers.length - 1 && (
                <button
                  type="button"
                  onClick={addDev}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:opacity-90 transition-opacity cursor-pointer dark:text-black"
                >
                  <PlusIcon size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Org Chart Preview */}
      <div className="rounded-2xl border border-white bg-white/60 px-4 py-6 dark:border-white/10 dark:bg-white/5 overflow-x-auto">
        <div className="flex flex-col items-center gap-0 min-w-[360px]">
          {/* Project Manager */}
          <OrgNode name={data.projectManager} role="Project Manager" />

          {/* PM → TL connector */}
          <div className="flex flex-col items-center">
            <div className="h-6 w-px border-l-2 border-dashed border-[#488981]" />
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M6 8L0 0H12L6 8Z" fill="#488981" />
            </svg>
          </div>

          {/* Technical Lead */}
          <OrgNode name={data.technicalLead} role="Technical Lead" />

          {/* TL → Developers branch */}
          {data.developers.some((d) => d.name.trim() || d.position.trim()) && (
            <>
              {/* vertical stem */}
              <div className="h-6 w-px bg-[#488981]" />

              <div className="relative w-full">
                {/* horizontal branch line */}
                {data.developers.length > 1 && (
                  <div
                    className="absolute top-0 h-px bg-[#488981]"
                    style={{ left: `calc(100% / ${cols * 2})`, right: `calc(100% / ${cols * 2})` }}
                  />
                )}

                <div
                  className="grid gap-3 pt-0"
                  style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
                >
                  {data.developers.map((dev, i) => (
                    <div key={i} className="flex flex-col items-center">
                      {/* circle dot on branch + vertical drop */}
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-[#488981]" />
                        <div className="h-4 w-px bg-[#488981]" />
                      </div>
                      <OrgNode name={dev.name} role={dev.position || "Developer"} small />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  icon,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-[550] text-black dark:text-white">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-style w-full rounded-[44px] py-3.5 ps-4 pe-11 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD]"
        />
        <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-input-icon">
          {icon}
        </span>
      </div>
    </div>
  );
}
