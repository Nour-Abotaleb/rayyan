"use client";

import { useId } from "react";

export default function CardBg({ className }: { className?: string }) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 395 242"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g clipPath={`url(#${uid}-c0)`}>
        <g clipPath={`url(#${uid}-c1)`}>
          <path
            opacity="0.58"
            d="M395 226C395 234.837 387.837 242 379 242H184.354C175.517 242 168.354 234.837 168.354 226V224C168.354 210.745 157.609 200 144.354 200H16C7.16342 200 0 192.837 0 184V16C0 7.16344 7.16345 0 16 0H379C387.837 0 395 7.16344 395 16V226Z"
            fill={`url(#${uid}-p0)`}
            fillOpacity="0.2"
          />
          <mask id={`${uid}-m0`} style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="395" height="242">
            <path
              opacity="0.58"
              d="M379 241H184.354C176.069 241 169.354 234.284 169.354 226V222C169.354 208.193 158.161 197 144.354 197H16C7.71574 197 1 190.284 1 182V16C1 7.71574 7.71574 1 16 1H379C387.284 1 394 7.71572 394 16V226C394 234.284 387.284 241 379 241Z"
              fill={`url(#${uid}-p1)`}
              fillOpacity="0.2"
              stroke={`url(#${uid}-p2)`}
              strokeWidth="2"
            />
          </mask>
          <g mask={`url(#${uid}-m0)`}>
            <g filter={`url(#${uid}-f1)`}>
              <path
                d="M182.147 198.899C176.857 198.899 171.663 199.464 166.596 200.547C167.729 203.335 168.354 206.384 168.354 209.579V226C168.354 234.836 175.517 242 184.354 242H254.898C236.762 215.486 210.88 198.899 182.147 198.899Z"
                fill="#060606"
              />
            </g>
            <g filter={`url(#${uid}-f2)`}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M339.654 239.634C281.438 207.856 229.625 197.735 223.928 217.027C222.061 223.35 225.378 232.046 232.73 242H343.924C342.51 241.206 341.088 240.416 339.654 239.634Z"
                fill={`url(#${uid}-p3)`}
              />
            </g>
            <g filter={`url(#${uid}-f3)`}>
              <path
                d="M144.257 0C142.348 59.775 207.08 143.956 300.058 198.064C331.562 216.399 362.667 229.159 391.21 236.34C393.574 233.551 395 229.942 395 226V16C395 7.16344 387.837 0 379 0H144.257Z"
                fill="#8DB7B6"
                fillOpacity="0.12"
              />
            </g>
            <g filter={`url(#${uid}-f4)`}>
              <path
                d="M308.945 0C315.886 49.1585 347.689 86.2998 385.871 86.2998C388.959 86.2998 392.005 86.0556 395 85.583V16C395 7.16344 387.837 0 379 0H308.945Z"
                fill="#64B8D9"
                fillOpacity="0.14"
              />
            </g>
          </g>
          <path
            d="M200.102 128.376L107.109 64.2915C103.856 62.0493 99.5394 62.0493 96.2857 64.2915L3.2928 128.376M225 137L107.113 55.6744C103.858 53.4287 99.5374 53.4287 96.2818 55.6744L-21.6048 137M224.605 128.376L106.718 47.0506C103.463 44.8049 99.1422 44.8049 95.8866 47.0506L-22 128.376M224.605 119.752L106.718 38.4269C103.463 36.1812 99.1422 36.1812 95.8866 38.4269L-22 119.752M224.605 111.129L106.718 29.8031C103.463 27.5574 99.1422 27.5574 95.8866 29.8031L-22 111.129M224.605 102.505L106.718 21.1793C103.463 18.9336 99.1422 18.9336 95.8866 21.1793L-22 102.505M224.605 93.8812L106.718 12.5556C103.463 10.3099 99.1422 10.3099 95.8866 12.5556L-22 93.8812M224.605 85.2574L106.718 3.93181C103.463 1.6861 99.1422 1.6861 95.8866 3.93181L-22 85.2574M224.605 76.6337L106.718 -4.69196C103.463 -6.93766 99.1422 -6.93766 95.8866 -4.69196L-22 76.6337M224.605 68.0099L106.718 -13.3157C103.463 -15.5614 99.1422 -15.5614 95.8866 -13.3157L-22 68.0099"
            stroke={`url(#${uid}-p4)`}
            strokeWidth="1.16487"
          />
        </g>
      </g>
      <defs>
        <filter id={`${uid}-f1`} x="50.7624" y="83.0661" width="319.969" height="274.767" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="57.9167" result="effect1_foregroundBlur" />
        </filter>
        <filter id={`${uid}-f2`} x="107.583" y="91.4106" width="352.174" height="266.423" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="57.9167" result="effect1_foregroundBlur" />
        </filter>
        <filter id={`${uid}-f3`} x="28.3815" y="-115.833" width="482.452" height="468.007" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="57.9167" result="effect1_foregroundBlur" />
        </filter>
        <filter id={`${uid}-f4`} x="222.07" y="-86.875" width="259.805" height="260.05" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="43.4375" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id={`${uid}-p0`} x1="197.5" y1="242" x2="197.5" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#488981" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${uid}-p1`} x1="197.5" y1="242" x2="197.5" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#6E6E6E" />
        </linearGradient>
        <linearGradient id={`${uid}-p2`} x1="340" y1="251.039" x2="255.31" y2="-38.4189" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CBCBCB" stopOpacity="0" />
          <stop offset="1" stopColor="#AEAEAE" />
        </linearGradient>
        <linearGradient id={`${uid}-p3`} x1="445.646" y1="319.885" x2="236.837" y2="271.504" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E4ECEE" />
          <stop offset="1" stopColor="#488981" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${uid}-p4`} cx="0" cy="0" r="1" gradientTransform="matrix(166 271.5 -486.077 302.658 -22 -190.5)" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopColor="#E4ECEE" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${uid}-c0`}>
          <rect width="395" height="242" rx="16" fill="white" />
        </clipPath>
        <clipPath id={`${uid}-c1`}>
          <rect width="395" height="242" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
