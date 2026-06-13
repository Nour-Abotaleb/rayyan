"use client";

import PlusIcon from "@/icons/PlusIcon";
import CloseIcon from "@/icons/CloseIcon";
import FlowDiagramIcon from "@/icons/FlowDiagramIcon";

export interface Phase {
  id: number;
  title: string;
  duration: string;
  description: string;
}

export interface TimelineStepData {
  phases: Phase[];
}

interface Props {
  data: TimelineStepData;
  onChange: (data: TimelineStepData) => void;
}

const PHASE_COLORS = [
  "#1C4D3E",
  "#488981",
  "#5aab9e",
  "#34A853",
  "#50aed4",
  "#51d1b8",
];

// Parses simple duration strings like "2 weeks", "3 days", "1 month" → number of days
function parseDurationDays(dur: string): number {
  const lower = dur.toLowerCase().trim();
  const num = parseFloat(lower) || 1;
  if (lower.includes("month")) return num * 30;
  if (lower.includes("week")) return num * 7;
  if (lower.includes("day")) return num;
  return num; // fallback: treat as days
}

export default function VisualizationTimelineStep({ data, onChange }: Props) {
  function addPhase() {
    const newId = Date.now();
    onChange({ phases: [...data.phases, { id: newId, title: "", duration: "", description: "" }] });
  }

  function removePhase(id: number) {
    if (data.phases.length <= 1) return;
    onChange({ phases: data.phases.filter((p) => p.id !== id) });
  }

  function updatePhase(id: number, field: keyof Omit<Phase, "id">, value: string) {
    onChange({ phases: data.phases.map((p) => p.id === id ? { ...p, [field]: value } : p) });
  }

  // Compute relative widths for the Gantt bars
  const durations = data.phases.map((p) => parseDurationDays(p.duration || "1"));
  const totalDays = durations.reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Phase input rows */}
      <div>
        <div className="flex flex-col gap-5">
          {data.phases.map((phase, i) => (
            <div key={phase.id} className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-black dark:text-white">Phase {i + 1}</p>
              <div className="flex items-center gap-2">
                <div className="flex flex-1 gap-2">
                  {/* Title */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Phase Title"
                      value={phase.title}
                      onChange={(e) => updatePhase(phase.id, "title", e.target.value)}
                      className="input-style w-full rounded-[44px] py-3 ps-4 pe-10 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD]"
                    />
                    <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-input-icon">
                      <FlowDiagramIcon size={16} />
                    </span>
                  </div>
                  {/* Duration */}
                  <div className="relative w-32 shrink-0">
                    <input
                      type="text"
                      placeholder="Duration"
                      value={phase.duration}
                      onChange={(e) => updatePhase(phase.id, "duration", e.target.value)}
                      className="input-style w-full rounded-[44px] py-3 ps-4 pe-10 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD]"
                    />
                    <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-input-icon">
                      <FlowDiagramIcon size={16} />
                    </span>
                  </div>
                  {/* Description */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Description"
                      value={phase.description}
                      onChange={(e) => updatePhase(phase.id, "description", e.target.value)}
                      className="input-style w-full rounded-[44px] py-3 ps-4 pe-10 text-sm text-[#A0A3BD] placeholder:text-input-icon focus:outline-none focus:ring-1 focus:ring-primary/20 dark:text-[#A0A3BD]"
                    />
                    <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-input-icon">
                      <FlowDiagramIcon size={16} />
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removePhase(phase.id)}
                  disabled={data.phases.length <= 1}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/40 transition-opacity hover:opacity-70 disabled:opacity-20 dark:border-white/10 dark:text-white/40 cursor-pointer"
                >
                  <CloseIcon size={14} />
                </button>

                {/* Add (only on last row) */}
                {i === data.phases.length - 1 && (
                  <button
                    type="button"
                    onClick={addPhase}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:opacity-90 transition-opacity cursor-pointer dark:text-black"
                  >
                    <PlusIcon size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline visual */}
      <div className="rounded-2xl border border-white bg-white/60 p-4 md:p-6 dark:border-white/10 dark:bg-white/5 overflow-x-auto">
        <div className="flex flex-col gap-2 min-w-[400px]">
          {/* Header row */}
          <div className="flex items-center gap-3 mb-2">
            <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">Phase</span>
            <div className="flex-1 flex justify-between text-[10px] text-[#9ca3af]">
              <span>Start</span>
              <span>50%</span>
              <span>End</span>
            </div>
          </div>

          {data.phases.map((phase, i) => {
            const pct = Math.max(4, (durations[i] / totalDays) * 100);
            const offset = durations.slice(0, i).reduce((a, b) => a + b, 0) / totalDays * 100;
            const color = PHASE_COLORS[i % PHASE_COLORS.length];

            return (
              <div key={phase.id} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-xs font-medium text-[#111827] dark:text-white">
                  {phase.title || `Phase ${i + 1}`}
                </span>
                <div className="relative flex-1 h-8 rounded-full bg-[#E5E7EB] dark:bg-[#1B272B] overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full flex items-center px-3 transition-all duration-300"
                    style={{
                      left: `${offset}%`,
                      width: `${pct}%`,
                      backgroundColor: color,
                      opacity: 0.85,
                    }}
                  >
                    {phase.duration && (
                      <span className="truncate text-[10px] font-semibold text-white">{phase.duration}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
