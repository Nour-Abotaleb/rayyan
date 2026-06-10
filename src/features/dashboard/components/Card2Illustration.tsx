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
      viewBox="0 0 184 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden
    >
      <style>{`
        @keyframes ${uid}-c1 {
          0%, 10%   { opacity: 0; transform: translateY(14px); }
          22%       { opacity: 1; transform: translateY(0); }
          78%       { opacity: 1; transform: translateY(0); }
          90%, 100% { opacity: 0; transform: translateY(14px); }
        }
        @keyframes ${uid}-c2 {
          0%, 22%   { opacity: 0; transform: translateY(14px); }
          34%       { opacity: 1; transform: translateY(0); }
          78%       { opacity: 1; transform: translateY(0); }
          90%, 100% { opacity: 0; transform: translateY(14px); }
        }
        @keyframes ${uid}-c3 {
          0%, 34%   { opacity: 0; transform: translateY(14px); }
          46%       { opacity: 1; transform: translateY(0); }
          78%       { opacity: 1; transform: translateY(0); }
          90%, 100% { opacity: 0; transform: translateY(14px); }
        }
      `}</style>
      <rect
        x="161.309"
        y="39.6238"
        width="182.387"
        height="155.418"
        rx="23.5"
        transform="rotate(75 161.309 39.6238)"
        fill={`url(#${uid}-p0)`}
        stroke={`url(#${uid}-p1)`}
      />
      <rect
        x="155.941"
        y="48.9197"
        width="40.453"
        height="140.237"
        rx="18"
        transform="rotate(75 155.941 48.9197)"
        fill={`url(#${uid}-p2)`}
      />
      <foreignObject x="0" y="0" width="0" height="0">
        <div
          style={{ backdropFilter: "blur(0.15px)", clipPath: `url(#${uid}-bb0)`, height: "100%", width: "100%" }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M125.485 6.82488C129.752 5.68134 134.124 8.21798 135.268 12.4857L151.369 72.5751C152.512 76.8429 149.98 81.2296 145.712 82.3731L46.5479 108.944C42.2801 110.088 37.8946 107.559 36.751 103.291C32.99 89.255 25.1496 59.9939 22.1932 48.9604C18.5785 35.4703 30.5402 32.2652 30.5402 32.2652C30.5402 32.2652 41.3234 29.3758 71.3969 21.3177C92.4187 15.6849 114.248 9.83568 125.485 6.82488Z"
        fill="#58A19A"
        style={{ animation: `${uid}-c1 5s ease-in-out infinite`, transformBox: "fill-box", transformOrigin: "center" }}
      />
      <foreignObject x="0" y="0" width="0" height="0">
        <div
          style={{ backdropFilter: "blur(0.15px)", clipPath: `url(#${uid}-bb1)`, height: "100%", width: "100%" }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M124.966 15.3398C129.233 14.1963 133.614 16.7307 134.757 20.9984L148.764 73.2729C149.908 77.5406 147.375 81.9273 143.107 83.0709L49.1531 108.246C44.8853 109.389 40.5032 106.874 39.3596 102.606C35.9137 89.7452 29.115 64.3721 26.5184 54.6816C23.2776 42.587 34.6957 39.5276 34.6957 39.5276C34.6957 39.5276 44.9887 36.7696 73.6953 29.0777C93.5399 23.7603 114.139 18.2408 124.966 15.3398Z"
        fill="#50AED4"
        style={{ animation: `${uid}-c2 5s ease-in-out infinite`, transformBox: "fill-box", transformOrigin: "center" }}
      />
      <foreignObject x="0" y="0" width="0" height="0">
        <div
          style={{ backdropFilter: "blur(0.15px)", clipPath: `url(#${uid}-bb2)`, height: "100%", width: "100%" }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M124.455 23.8525C128.723 22.7089 133.103 25.2434 134.246 29.5111L146.159 73.9707C147.303 78.2384 144.77 82.6251 140.502 83.7686L51.7583 107.548C47.4905 108.691 43.1057 106.165 41.9622 101.898C38.8479 90.2749 33.0816 68.7546 30.8437 60.4027C27.9769 49.7037 38.8512 46.7899 38.8512 46.7899C38.8512 46.7899 48.6541 44.1633 75.9936 36.8377C94.6711 31.833 114.05 26.6404 124.455 23.8525Z"
        fill="#51D1B8"
        style={{ animation: `${uid}-c3 5s ease-in-out infinite`, transformBox: "fill-box", transformOrigin: "center" }}
      />
      <foreignObject x="22.4359" y="56.2914" width="144.594" height="68.3147">
        <div
          style={{ backdropFilter: "blur(6.8px)", clipPath: `url(#${uid}-bb3)`, height: "100%", width: "100%" }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="13.5914"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M153.438 80.3027L150.646 69.8828L36.0276 100.595L38.8196 111.015L153.438 80.3027Z"
        fill="#9DC4BF"
      />
      <defs>
        <clipPath id={`${uid}-bb0`} transform="translate(0 0)">
          <path fillRule="evenodd" clipRule="evenodd" d="M125.485 6.82488C129.752 5.68134 134.124 8.21798 135.268 12.4857L151.369 72.5751C152.512 76.8429 149.98 81.2296 145.712 82.3731L46.5479 108.944C42.2801 110.088 37.8946 107.559 36.751 103.291C32.99 89.255 25.1496 59.9939 22.1932 48.9604C18.5785 35.4703 30.5402 32.2652 30.5402 32.2652C30.5402 32.2652 41.3234 29.3758 71.3969 21.3177C92.4187 15.6849 114.248 9.83568 125.485 6.82488Z" />
        </clipPath>
        <clipPath id={`${uid}-bb1`} transform="translate(0 0)">
          <path fillRule="evenodd" clipRule="evenodd" d="M124.966 15.3398C129.233 14.1963 133.614 16.7307 134.757 20.9984L148.764 73.2729C149.908 77.5406 147.375 81.9273 143.107 83.0709L49.1531 108.246C44.8853 109.389 40.5032 106.874 39.3596 102.606C35.9137 89.7452 29.115 64.3721 26.5184 54.6816C23.2776 42.587 34.6957 39.5276 34.6957 39.5276C34.6957 39.5276 44.9887 36.7696 73.6953 29.0777C93.5399 23.7603 114.139 18.2408 124.966 15.3398Z" />
        </clipPath>
        <clipPath id={`${uid}-bb2`} transform="translate(0 0)">
          <path fillRule="evenodd" clipRule="evenodd" d="M124.455 23.8525C128.723 22.7089 133.103 25.2434 134.246 29.5111L146.159 73.9707C147.303 78.2384 144.77 82.6251 140.502 83.7686L51.7583 107.548C47.4905 108.691 43.1057 106.165 41.9622 101.898C38.8479 90.2749 33.0816 68.7546 30.8437 60.4027C27.9769 49.7037 38.8512 46.7899 38.8512 46.7899C38.8512 46.7899 48.6541 44.1633 75.9936 36.8377C94.6711 31.833 114.05 26.6404 124.455 23.8525Z" />
        </clipPath>
        <clipPath id={`${uid}-bb3`} transform="translate(-22.4359 -56.2914)">
          <path fillRule="evenodd" clipRule="evenodd" d="M153.438 80.3027L150.646 69.8828L36.0276 100.595L38.8196 111.015L153.438 80.3027Z" />
        </clipPath>
        <radialGradient
          id={`${uid}-p0`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(90.8936 100.192 -116.962 77.1941 197.776 62.2965)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4ECEE" />
          <stop offset="1" stopColor="#488981" />
        </radialGradient>
        <linearGradient
          id={`${uid}-p1`}
          x1="129.263"
          y1="81.0086"
          x2="198.541"
          y2="180.587"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.600574} />
          <stop offset="1" stopColor="white" stopOpacity={0.01} />
        </linearGradient>
        <linearGradient
          id={`${uid}-p2`}
          x1="176.168"
          y1="48.9197"
          x2="176.168"
          y2="189.157"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8DB7B6" />
          <stop offset="1" stopColor="#488981" />
        </linearGradient>
      </defs>
    </svg>
  );
}
