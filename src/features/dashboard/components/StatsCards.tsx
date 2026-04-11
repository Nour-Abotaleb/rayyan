interface StatCardProps {
  label: string
  value: number
  sub: string
  color: string
  /** stroke-dasharray out of circumference 94.25 (r=15 circle) */
  dash: number
}

const CIRCUMFERENCE = 94.25 // 2π × 15

function RingChart({ value, color, dash }: { value: number; color: string; dash: number }) {
  // End-point dot position (SVG is rotated -90deg, so no extra offset here)
  const angle = (dash / CIRCUMFERENCE) * 2 * Math.PI
  const dotX = 18 + 15 * Math.cos(angle)
  const dotY = 18 + 15 * Math.sin(angle)

  return (
    <div className="relative flex h-16 w-16 md:h-19 md:w-19 lg:h-20 lg:w-20 shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 36 36"
        className="absolute inset-0 h-full w-full -rotate-90"
        overflow="visible"
      >
        {/* Track */}
        <circle
          cx="18" cy="18" r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-white/50"
        />
        {/* Arc */}
        <circle
          cx="18" cy="18" r="15"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
          strokeLinecap="round"
        />
        {/* End-dot */}
        <circle cx={dotX} cy={dotY} r="3.5" fill={color} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      </svg>
      {/* Number inside ring */}
      <span className="relative z-10 font-[550] text-black/80 text-lg md:text-[24px]">
        {value}
      </span>
    </div>
  )
}

function StatCard({ label, value, sub, color, dash }: StatCardProps) {
  const bg12 = `${color}1F` // ~12% opacity
  return (
    <div
      className="grid h-full grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-[1fr_auto] md:grid-rows-[auto_auto] md:gap-x-3 md:gap-y-4 rounded-[12px] p-4 md:p-6 dark:bg-zinc-800/60"
      style={{ backgroundColor: bg12 }}
    >
      {/* % icon — small white circle */}
      <span className="col-start-1 row-start-1 flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-white text-[16px] font-bold">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24.6665 4.66699L27.3332 7.33366L7.33317 27.3337L4.6665 24.667L24.6665 4.66699ZM9.33317 5.33366C11.5465 5.33366 13.3332 7.12033 13.3332 9.33366C13.3332 11.547 11.5465 13.3337 9.33317 13.3337C7.11984 13.3337 5.33317 11.547 5.33317 9.33366C5.33317 7.12033 7.11984 5.33366 9.33317 5.33366ZM22.6665 18.667C24.8798 18.667 26.6665 20.4537 26.6665 22.667C26.6665 24.8803 24.8798 26.667 22.6665 26.667C20.4532 26.667 18.6665 24.8803 18.6665 22.667C18.6665 20.4537 20.4532 18.667 22.6665 18.667ZM9.33317 8.00033C8.59984 8.00033 7.99984 8.60033 7.99984 9.33366C7.99984 10.067 8.59984 10.667 9.33317 10.667C10.0665 10.667 10.6665 10.067 10.6665 9.33366C10.6665 8.60033 10.0665 8.00033 9.33317 8.00033ZM22.6665 21.3337C21.9332 21.3337 21.3332 21.9337 21.3332 22.667C21.3332 23.4003 21.9332 24.0003 22.6665 24.0003C23.3998 24.0003 23.9998 23.4003 23.9998 22.667C23.9998 21.9337 23.3998 21.3337 22.6665 21.3337Z"
            fill={color}
          />
        </svg>
      </span>

      {/* Ring chart — right on mobile (space-between row), right column on md */}
      <div className="col-start-2 row-start-1 justify-self-end self-start md:row-span-2 md:justify-self-start">
        <RingChart value={value} color={color} dash={dash} />
      </div>

      <div className="col-span-2 row-start-2 md:col-span-1 md:col-start-1 md:row-start-2">
        <p className="text-base md:text-[18px] lg:text-[20px] font-medium leading-snug text-black/80 dark:text-zinc-100">{label}</p>
        <p className="mt-0.5 text-sm md:text-base text-black/60 font-medium">{sub}</p>
      </div>
    </div>
  )
}

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {/* First card: full width on mobile, 1 col on desktop */}
      <div className="col-span-2 lg:col-span-1">
        <StatCard label="Total Proposals" value={24} sub="+3 this week"     color="#58A19A" dash={71} />
      </div>
      <StatCard label="Completed"  value={12} sub="75% success rate" color="#50AED4" dash={47} />
      <StatCard label="In Progress" value={10} sub="2 need action"   color="#51D1B8" dash={38} />
    </div>
  )
}
