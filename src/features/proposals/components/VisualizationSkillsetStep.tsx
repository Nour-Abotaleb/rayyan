"use client";

export interface Skill {
  id: number;
  name: string;
  description: string;
  level: number; // 0–100
}

export interface SkillsetStepData {
  skills: Skill[];
}

const DEFAULT_SKILLS: Skill[] = [
  { id: 1, name: "Technical Skills", description: "Delivering robust B2B architectures and automated data infrastructures", level: 95 },
  { id: 2, name: "Communication", description: "Aligning cross-functional engineering teams with enterprise stakeholder goals", level: 93 },
  { id: 3, name: "Leadership", description: "Guiding complex digital products from inception to market delivery", level: 90 },
  { id: 4, name: "Problem Solving", description: "Overcoming structural architectural bottlenecks and optimizing legacy system flows", level: 47 },
  { id: 5, name: "Project Management", description: "Orchestrating enterprise project lifecycles under strict, efficient delivery timelines", level: 42 },
  { id: 6, name: "Innovation", description: "Deploying cutting-edge AI features to redefine standard corporate workflows", level: 70 },
];

export const defaultSkillsetData: SkillsetStepData = { skills: DEFAULT_SKILLS };

interface Props {
  data: SkillsetStepData;
  onChange: (data: SkillsetStepData) => void;
}

function updateSkill(skills: Skill[], id: number, field: keyof Omit<Skill, "id">, value: string | number): Skill[] {
  return skills.map((s) => s.id === id ? { ...s, [field]: value } : s);
}

export default function VisualizationSkillsetStep({ data, onChange }: Props) {
  function setLevel(id: number, level: number) {
    onChange({ skills: updateSkill(data.skills, id, "level", level) });
  }

  const maxLevel = Math.max(...data.skills.map((s) => s.level), 1);

  return (
    <div className="flex flex-col gap-6">
      {/* Skill cards */}
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.skills.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col gap-2 rounded-xl border border-[#E5E7EB] bg-white p-4 dark:border-[#1B272B] dark:bg-[#0D0D0D]"
            >
              <div>
                <p className="text-sm font-bold text-[#111827] dark:text-white">{skill.name}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#6b7280] dark:text-zinc-400">
                  {skill.description}
                </p>
              </div>

              {/* Slider */}
              <div className="mt-1">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={skill.level}
                  onChange={(e) => setLevel(skill.id, Number(e.target.value))}
                  className="slider-primary w-full cursor-pointer"
                  style={{
                    accentColor: "#1C4D3E",
                    height: "4px",
                  }}
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#9ca3af]">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bar chart preview */}
      <div className="rounded-2xl border border-white bg-white/60 p-4 md:p-6 dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-3">
          {data.skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-4">
              <span className="w-36 shrink-0 text-right text-sm font-medium text-[#111827] dark:text-white">
                {skill.name}
              </span>
              <div className="flex-1 overflow-hidden rounded-full bg-[#E5E7EB] dark:bg-[#1B272B]" style={{ height: "22px" }}>
                <div
                  className="h-full rounded-full bg-[#1C4D3E] transition-all duration-300 dark:bg-[#488981]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-sm font-semibold text-[#1C4D3E] dark:text-[#488981]">
                {skill.level}
              </span>
            </div>
          ))}
          {/* X axis */}
          <div className="ms-40 flex justify-between text-[11px] text-[#9ca3af] border-t border-[#E5E7EB] dark:border-[#1B272B] pt-1">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
