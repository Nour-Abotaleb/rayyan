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
      viewBox="0 0 246 267"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden
    >
      <rect
        x="160.965"
        y="49.5235"
        width="182.387"
        height="155.418"
        rx="23.5"
        transform="rotate(75 160.965 49.5235)"
        fill={`url(#${uid}-p0)`}
        stroke={`url(#${uid}-p1)`}
      />
      <rect
        x="155.598"
        y="58.8193"
        width="40.453"
        height="140.237"
        rx="18"
        transform="rotate(75 155.598 58.8193)"
        fill={`url(#${uid}-p2)`}
      />
      <foreignObject x="0" y="0" width="0" height="0">
        <div
          style={{
            backdropFilter: "blur(0.15px)",
            clipPath: `url(#${uid}-blur0-clip)`,
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M125.141 16.7248C129.409 15.5812 133.781 18.1179 134.924 22.3856L151.025 82.475C152.169 86.7428 149.636 91.1295 145.368 92.273L46.2041 118.844C41.9364 119.987 37.5508 117.459 36.4073 113.191C32.6463 99.1549 24.8058 69.8938 21.8494 58.8603C18.2347 45.3702 30.1965 42.1651 30.1965 42.1651C30.1965 42.1651 40.9796 39.2757 71.0532 31.2176C92.0749 25.5848 113.905 19.7356 125.141 16.7248Z"
        fill="#58A19A"
      />
      <foreignObject x="0" y="0" width="0" height="0">
        <div
          style={{
            backdropFilter: "blur(0.15px)",
            clipPath: `url(#${uid}-blur1-clip)`,
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M124.622 25.2397C128.89 24.0962 133.27 26.6306 134.413 30.8983L148.42 83.1728C149.564 87.4406 147.031 91.8272 142.763 92.9708L48.8093 118.146C44.5416 119.289 40.1594 116.774 39.0159 112.506C35.5699 99.6451 28.7712 74.272 26.1747 64.5815C22.9339 52.4869 34.352 49.4275 34.352 49.4275C34.352 49.4275 44.645 46.6695 73.3515 38.9776C93.1962 33.6602 113.795 28.1407 124.622 25.2397Z"
        fill="#50AED4"
      />
      <foreignObject x="0" y="0" width="0" height="0">
        <div
          style={{
            backdropFilter: "blur(0.15px)",
            clipPath: `url(#${uid}-blur2-clip)`,
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M124.111 33.7524C128.379 32.6088 132.759 35.1433 133.902 39.411L145.815 83.8706C146.959 88.1383 144.426 92.525 140.158 93.6685L51.414 117.447C47.1463 118.591 42.7615 116.065 41.618 111.798C38.5037 100.175 32.7373 78.6545 30.4995 70.3026C27.6326 59.6036 38.507 56.6898 38.507 56.6898C38.507 56.6898 48.3098 54.0632 75.6494 46.7376C94.3269 41.7329 113.706 36.5403 124.111 33.7524Z"
        fill="#51D1B8"
      />
      <foreignObject x="22.0937" y="66.1908" width="144.593" height="68.3147">
        <div
          style={{
            backdropFilter: "blur(6.8px)",
            clipPath: `url(#${uid}-blur3-clip)`,
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="13.5914"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M153.096 90.2021L150.304 79.7822L35.6849 110.494L38.4769 120.914L153.096 90.2021Z"
        fill="#9DC4BF"
      />
      <defs>
        <clipPath id={`${uid}-blur0-clip`} transform="translate(0 0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M125.141 16.7248C129.409 15.5812 133.781 18.1179 134.924 22.3856L151.025 82.475C152.169 86.7428 149.636 91.1295 145.368 92.273L46.2041 118.844C41.9364 119.987 37.5508 117.459 36.4073 113.191C32.6463 99.1549 24.8058 69.8938 21.8494 58.8603C18.2347 45.3702 30.1965 42.1651 30.1965 42.1651C30.1965 42.1651 40.9796 39.2757 71.0532 31.2176C92.0749 25.5848 113.905 19.7356 125.141 16.7248Z"
          />
        </clipPath>
        <clipPath id={`${uid}-blur1-clip`} transform="translate(0 0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M124.622 25.2397C128.89 24.0962 133.27 26.6306 134.413 30.8983L148.42 83.1728C149.564 87.4406 147.031 91.8272 142.763 92.9708L48.8093 118.146C44.5416 119.289 40.1594 116.774 39.0159 112.506C35.5699 99.6451 28.7712 74.272 26.1747 64.5815C22.9339 52.4869 34.352 49.4275 34.352 49.4275C34.352 49.4275 44.645 46.6695 73.3515 38.9776C93.1962 33.6602 113.795 28.1407 124.622 25.2397Z"
          />
        </clipPath>
        <clipPath id={`${uid}-blur2-clip`} transform="translate(0 0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M124.111 33.7524C128.379 32.6088 132.759 35.1433 133.902 39.411L145.815 83.8706C146.959 88.1383 144.426 92.525 140.158 93.6685L51.414 117.447C47.1463 118.591 42.7615 116.065 41.618 111.798C38.5037 100.175 32.7373 78.6545 30.4995 70.3026C27.6326 59.6036 38.507 56.6898 38.507 56.6898C38.507 56.6898 48.3098 54.0632 75.6494 46.7376C94.3269 41.7329 113.706 36.5403 124.111 33.7524Z"
          />
        </clipPath>
        <clipPath id={`${uid}-blur3-clip`} transform="translate(-22.0937 -66.1908)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M153.096 90.2021L150.304 79.7822L35.6849 110.494L38.4769 120.914L153.096 90.2021Z"
          />
        </clipPath>
        <radialGradient
          id={`${uid}-p0`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(90.8936 100.192 -116.962 77.1941 197.433 72.1962)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4ECEE" />
          <stop offset="1" stopColor="#488981" />
        </radialGradient>
        <linearGradient
          id={`${uid}-p1`}
          x1="128.92"
          y1="90.9083"
          x2="198.197"
          y2="190.487"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.600574} />
          <stop offset="1" stopColor="white" stopOpacity={0.01} />
        </linearGradient>
        <linearGradient
          id={`${uid}-p2`}
          x1="175.825"
          y1="58.8193"
          x2="175.825"
          y2="199.056"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8DB7B6" />
          <stop offset="1" stopColor="#488981" />
        </linearGradient>
      </defs>
    </svg>
  );
}
