"use client";

import { useId } from "react";

export default function Card2Illustration({
  className,
  preserveAspectRatio = "xMaxYMax meet",
}: {
  className?: string;
  preserveAspectRatio?: string;
}) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 188 209"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden
    >
      <rect
        x="160.534"
        y="47.0167"
        width="184.981"
        height="155.418"
        rx="23.5"
        transform="rotate(75 160.534 47.0167)"
        fill={`url(#${uid}-p0)`}
        stroke={`url(#${uid}-p1)`}
      />
      <rect
        x="155.196"
        y="56.4241"
        width="41.0253"
        height="140.237"
        rx="18"
        transform="rotate(75 155.196 56.4241)"
        fill={`url(#${uid}-p2)`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M152.803 88.2118L149.971 77.6445L35.3526 108.357L38.1841 118.924L152.803 88.2118Z"
        fill="#9DC4BF"
        opacity="0.7"
      />
      <defs>
        <radialGradient
          id={`${uid}-p0`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(92.1795 100.192 -118.617 77.1941 197.512 69.6894)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4ECEE" />
          <stop offset="1" stopColor="#488981" />
        </radialGradient>
        <linearGradient
          id={`${uid}-p1`}
          x1="128.03"
          y1="88.4015"
          x2="196.964"
          y2="188.888"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.600574} />
          <stop offset="1" stopColor="white" stopOpacity={0.01} />
        </linearGradient>
        <linearGradient
          id={`${uid}-p2`}
          x1="175.709"
          y1="56.4241"
          x2="175.709"
          y2="196.661"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8DB7B6" />
          <stop offset="1" stopColor="#488981" />
        </linearGradient>
      </defs>
    </svg>
  );
}
