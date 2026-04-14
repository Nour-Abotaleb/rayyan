"use client";

import { useId } from "react";

export default function Step2Bg({
  className,
  preserveAspectRatio = "none",
}: {
  className?: string;
  preserveAspectRatio?: string;
}) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  const clipId = `${uid}-clip`;
  const fillId = `${uid}-fill`;
  const strokeId = `${uid}-stroke`;

  return (
    <svg
      viewBox="0 0 316 274"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden
    >
      <foreignObject x="-0.3" y="-0.3" width="315.933" height="274.6">
        <div
          style={{
            backdropFilter: "blur(0.15px)",
            clipPath: `url(#${clipId})`,
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <g data-figma-bg-blur-radius="0.3">
        <path
          d="M0 16C0 7.16344 7.16344 0 16 0H164.373C168.616 0 172.686 1.68571 175.686 4.68629L190.314 19.3137C193.314 22.3143 197.384 24 201.627 24H254H299.333C308.17 24 315.333 31.1634 315.333 40V258C315.333 266.837 308.17 274 299.333 274H16C7.16346 274 0 266.837 0 258V16Z"
          fill={`url(#${fillId})`}
          fillOpacity={0.7}
        />
        <path
          d="M16 0.5H164.373C168.484 0.500121 172.426 2.13333 175.333 5.04004L189.96 19.667C193.054 22.7612 197.251 24.4999 201.627 24.5H299.333C307.893 24.5 314.833 31.4396 314.833 40V258C314.833 266.56 307.893 273.5 299.333 273.5H16C7.43959 273.5 0.5 266.56 0.5 258V16C0.5 7.43959 7.43959 0.5 16 0.5Z"
          stroke={`url(#${strokeId})`}
          strokeOpacity={0.7}
        />
      </g>
      <defs>
        <clipPath id={clipId} transform="translate(0.3 0.3)">
          <path d="M0 16C0 7.16344 7.16344 0 16 0H164.373C168.616 0 172.686 1.68571 175.686 4.68629L190.314 19.3137C193.314 22.3143 197.384 24 201.627 24H254H299.333C308.17 24 315.333 31.1634 315.333 40V258C315.333 266.837 308.17 274 299.333 274H16C7.16346 274 0 266.837 0 258V16Z" />
        </clipPath>
        <linearGradient
          id={fillId}
          x1="0"
          y1="0"
          x2="54.9114"
          y2="311.545"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.35} />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id={strokeId}
          x1="8.40888"
          y1="3.20567"
          x2="60.8965"
          y2="313.296"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset="1" stopColor="#EFEFEF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
