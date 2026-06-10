"use client";

import { useEffect, useId, useRef, useState } from "react";

export type ProposalTabBgVariant =
  | "ALL"
  | "Technical"
  | "Financial"
  | "Visualization";

// Original viewBox dimensions
const VB_W = 909;
const VB_H = 276;

// Each path shares the same bottom chunk — only the corner radius start/end changes with height.
// Original: bottom outer y=275, corner-start y=244 (radius=31), control offset=13.879
function buildPath(variant: ProposalTabBgVariant, vbH: number): string {
  const bOuter = vbH - 1;
  const bInner = vbH - 31;
  const bCtrl  = bOuter - 13.879;
  const bottom = `V${bInner}C908 ${bCtrl} 894.121 ${bOuter} 877 ${bOuter}H32C14.8792 ${bOuter} 1 ${bCtrl} 1 ${bInner}`;

  switch (variant) {
    case "ALL":
      return `M32 1H70.8643C82.7864 1 93.6523 7.837 98.8115 18.585L105.385 32.2803C110.877 43.7219 122.444 51 135.136 51H877C894.121 51 908 64.8792 908 82${bottom}V32L1.00977 31.2002C1.43398 14.449 15.1466 1 32 1Z`;
    case "Technical":
      return `M135.136 1H209.864C221.786 1 232.652 7.837 237.812 18.585L244.385 32.2803C249.877 43.7219 261.444 51 274.136 51H877C894.121 51 908 64.8792 908 82${bottom}V82L1.00977 81.2002C1.434 64.449 15.1466 51 32 51H70.8643C83.5557 51 95.1233 43.7219 100.615 32.2803L107.188 18.585C112.348 7.83701 123.214 1 135.136 1Z`;
    case "Financial":
      return `M274.136 1H375.864C387.786 1 398.652 7.837 403.812 18.585L410.385 32.2803C415.877 43.7219 427.444 51 440.136 51H877C894.121 51 908 64.8792 908 82${bottom}V82L1.00977 81.2002C1.434 64.449 15.1466 51 32 51H209.864C222.556 51 234.123 43.7219 239.615 32.2803L246.188 18.585C251.267 8.00504 261.875 1.2146 273.577 1.00488L274.136 1Z`;
    case "Visualization":
      return `M440.136 1H485.864C497.786 1 508.652 7.837 513.812 18.585L520.385 32.2803C525.877 43.7219 537.444 51 550.136 51H877C894.121 51 908 64.8792 908 82${bottom}V82L1.00977 81.2002C1.434 64.449 15.1466 51 32 51H375.864C388.556 51 400.123 43.7219 405.615 32.2803L412.188 18.585C417.348 7.83701 428.214 1 440.136 1Z`;
  }
}

type Props = {
  variant: ProposalTabBgVariant;
  className?: string;
};

export default function ProposalTabBgSvg({ variant, className }: Props) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [vbHeight, setVbHeight] = useState(VB_H);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width) return;
      const svgUnitsH = Math.max(VB_H, height * (VB_W / width));
      setVbHeight(svgUnitsH);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fillId = `${uid}-fill`;
  const strokeId = `${uid}-stroke`;
  const blurClipId = `${uid}-blur-clip`;
  const path = buildPath(variant, vbHeight);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        viewBox={`0 0 ${VB_W} ${vbHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin meet"
        className={["w-full h-full", className].filter(Boolean).join(" ")}
        aria-hidden
      >
        <defs>
          <clipPath id={blurClipId} transform="translate(12 12)">
            <path d={path} />
          </clipPath>
          <linearGradient
            id={fillId}
            x1="2.75014e-06"
            y1="-6"
            x2="45.1005"
            y2="478.673"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.2" />
            <stop offset="1" stopColor="#58A19A" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id={strokeId}
            x1="24.24"
            y1="-1.1213"
            x2="67.2776"
            y2="480.479"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
        <foreignObject x="-12" y="-12" width="933" height={vbHeight + 24}>
          <div
            style={{
              backdropFilter: "blur(6px)",
              clipPath: `url(#${blurClipId})`,
              height: "100%",
              width: "100%",
            }}
          />
        </foreignObject>
        <path
          data-figma-bg-blur-radius="12"
          d={path}
          fill={`url(#${fillId})`}
          fillOpacity={0.7}
          stroke={`url(#${strokeId})`}
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}
