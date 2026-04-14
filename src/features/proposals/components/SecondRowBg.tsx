"use client";

import { useId } from "react";

export default function SecondRowBg({
  className,
  preserveAspectRatio = "none",
}: {
  className?: string;
  preserveAspectRatio?: string;
}) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  const fillId = `${uid}-fill`;
  const strokeId = `${uid}-stroke`;

  return (
    <svg
      viewBox="0 0 481 274"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden
    >
      <g data-figma-bg-blur-radius="0.3">
        <path
          d="M0 16C0 7.16344 7.16344 0 16 0H256.061C259.178 0 262.227 0.910308 264.833 2.61911L293.452 21.3809C296.059 23.0897 299.107 24 302.224 24H387.444H465C473.837 24 481 31.1634 481 40V258C481 266.837 473.837 274 465 274H16C7.16345 274 0 266.837 0 258V16Z"
          fill={`url(#${fillId})`}
          fillOpacity={0.7}
        />
        <path
          d="M16 0.5H256.062C259.081 0.500071 262.035 1.38177 264.56 3.03711L293.178 21.7988C295.866 23.561 299.01 24.5 302.225 24.5H465C473.56 24.5 480.5 31.4396 480.5 40V258C480.5 266.56 473.56 273.5 465 273.5H16C7.43959 273.5 0.5 266.56 0.5 258V16L0.504883 15.5996C0.717243 7.22424 7.57345 0.5 16 0.5Z"
          stroke={`url(#${strokeId})`}
          strokeOpacity={0.7}
        />
      </g>
      <defs>
        <linearGradient
          id={fillId}
          x1="0"
          y1="0"
          x2="36.628"
          y2="316.991"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.35} />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id={strokeId}
          x1="12.8267"
          y1="3.20567"
          x2="47.7918"
          y2="318.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset="1" stopColor="#EFEFEF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
