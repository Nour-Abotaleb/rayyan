"use client";

import { useId } from "react";

export type ProposalTabBgVariant = "ALL" | "Completed" | "Processing" | "Failed";

/** Path geometry per tab — exported from `all-bg.svg`, `completed-bg.svg`, `processing-bg.svg`, `failed-bg.svg`. */
const TAB_PATHS: Record<ProposalTabBgVariant, string> = {
  ALL: "M32 1H70.8643C82.7864 1 93.6523 7.837 98.8115 18.585L105.385 32.2803C110.877 43.7219 122.444 51 135.136 51H877C894.121 51 908 64.8792 908 82V244C908 261.121 894.121 275 877 275H32C14.8792 275 1 261.121 1 244V32C1 14.8792 14.8792 1 32 1Z",
  Completed:
    "M135.136 1H209.864C221.786 1 232.652 7.837 237.812 18.585L244.385 32.2803C249.877 43.7219 261.444 51 274.136 51H877C894.121 51 908 64.8792 908 82V244C908 261.121 894.121 275 877 275H32C14.8792 275 1 261.121 1 244V82C1.00001 64.8792 14.8792 51 32 51H70.8643C83.5557 51 95.1233 43.7219 100.615 32.2803L107.188 18.585C112.348 7.83701 123.214 1 135.136 1Z",
  Processing:
    "M274.136 1H375.864C387.786 1 398.652 7.837 403.812 18.585L410.385 32.2803C415.877 43.7219 427.444 51 440.136 51H877C894.121 51 908 64.8792 908 82V244C908 261.121 894.121 275 877 275H32C14.8792 275 1 261.121 1 244V82L1.00977 81.2002C1.434 64.449 15.1466 51 32 51H209.864C222.556 51 234.123 43.7219 239.615 32.2803L246.188 18.585C251.267 8.00504 261.875 1.2146 273.577 1.00488L274.136 1Z",
  Failed:
    "M440.136 1H485.864C497.786 1 508.652 7.837 513.812 18.585L520.385 32.2803C525.877 43.7219 537.444 51 550.136 51H877C894.121 51 908 64.8792 908 82V244C908 261.121 894.121 275 877 275H32C14.8792 275 1 261.121 1 244V82C1.00001 64.8792 14.8792 51 32 51H375.864C388.556 51 400.123 43.7219 405.615 32.2803L412.188 18.585C417.348 7.83701 428.214 1 440.136 1Z",
};

type Props = {
  variant: ProposalTabBgVariant;
  className?: string;
};

/**
 * Tab strip background (matches exported Figma SVGs). Override tint/stroke via CSS:
 * `--proposal-tab-tint`, `--proposal-tab-stroke` (defaults match light mode art).
 */
export default function ProposalTabBgSvg({ variant, className }: Props) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  const fillId = `${uid}-fill`;
  const strokeId = `${uid}-stroke`;

  return (
    <svg
      className={className}
      viewBox="0 0 909 276"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={fillId}
          x1="3.96432e-06"
          y1="-6"
          x2="45.1005"
          y2="478.673"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.64" />
          <stop
            offset="1"
            stopColor="var(--proposal-tab-tint, #D9FFFA)"
          />
        </linearGradient>
        <linearGradient
          id={strokeId}
          x1="24.24"
          y1="-1.1213"
          x2="67.2776"
          y2="480.479"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--proposal-tab-stroke, white)" />
          <stop offset="1" stopColor="var(--proposal-tab-stroke, white)" />
        </linearGradient>
      </defs>
      <path
        d={TAB_PATHS[variant]}
        fill={`url(#${fillId})`}
        fillOpacity={0.7}
        stroke={`url(#${strokeId})`}
        strokeWidth={2}
      />
    </svg>
  );
}
