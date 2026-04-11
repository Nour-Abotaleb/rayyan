"use client";

import { useId } from "react";

interface ProposalCalendarIconProps {
  size?: number;
  className?: string;
}

export default function ProposalCalendarIcon({
  size = 10,
  className,
}: ProposalCalendarIconProps) {
  const reactId = useId();
  const maskId = `proposal-cal-${reactId.replace(/:/g, "")}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <mask
        id={maskId}
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="10"
        height="10"
      >
        <path d="M10 0H0V10H10V0Z" fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          d="M3.33301 0.833008V2.08301"
          stroke="currentColor"
          strokeWidth="0.625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66699 0.833008V2.08301"
          stroke="currentColor"
          strokeWidth="0.625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.45801 3.78711H8.54134"
          stroke="currentColor"
          strokeWidth="0.625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.25 5.42051V3.54134C1.25 2.29134 1.875 1.45801 3.33333 1.45801H6.66667C8.125 1.45801 8.75 2.29134 8.75 3.54134V7.08301C8.75 8.33301 8.125 9.16634 6.66667 9.16634H3.33333C1.875 9.16634 1.25 8.33301 1.25 7.08301"
          stroke="currentColor"
          strokeWidth="0.625"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.99817 5.70801H5.00192"
          stroke="currentColor"
          strokeWidth="0.833333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.45593 5.70801H3.45967"
          stroke="currentColor"
          strokeWidth="0.833333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.45593 6.95801H3.45967"
          stroke="currentColor"
          strokeWidth="0.833333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
