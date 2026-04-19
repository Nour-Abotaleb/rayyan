"use client";

import { useId } from "react";

export default function Card1Illustration({
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
      viewBox="0 0 214 301"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[className, "origin-[88%_100%] scale-[1.22]"].filter(Boolean).join(" ")}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden
    >
      <style>{`
        /* White card + gray accents: lift → reveal paths one by one → settle */
        @keyframes ${uid}-stack {
          0%, 100% {
            transform: translateY(0);
          }
          /* quick hide grays before lift so only the white card reads as rising */
          3% {
            transform: translateY(0);
          }
          14% {
            transform: translateY(-30px);
          }
          /* hold elevated while paths appear */
          52% {
            transform: translateY(-30px);
          }
          /* all three back down */
          72% {
            transform: translateY(0);
          }
        }
        @keyframes ${uid}-accent1 {
          0%, 100% {
            opacity: 1;
          }
          4% {
            opacity: 0;
          }
          18% {
            opacity: 0;
          }
          26% {
            opacity: 1;
          }
        }
        @keyframes ${uid}-accent2 {
          0%, 100% {
            opacity: 1;
          }
          4% {
            opacity: 0;
          }
          28% {
            opacity: 0;
          }
          38% {
            opacity: 1;
          }
        }
      `}</style>
      <path
        d="M165.486 126.036L40.7779 142.64C31.9 143.822 25.8682 152.26 27.6238 161.043L52.0132 283.041C53.6149 291.052 61.1594 296.445 69.2576 295.367L177.958 280.894C186.056 279.816 191.927 272.637 191.377 264.485L182.996 140.356C182.402 131.56 174.613 125.06 165.901 125.987L165.486 126.036Z"
        fill={`url(#${uid}-p0)`}
        stroke={`url(#${uid}-p1)`}
      />
      <g clipPath={`url(#${uid}-p2-clip)`} data-figma-skip-parse="true">
        <g transform="matrix(-0.0717288 0.00955009 0.00929877 0.0698412 113.37 211.234)">
          <foreignObject x="-1000" y="-1000" width="2000" height="2000">
            <div
              style={{
                background:
                  "conic-gradient(from 90deg,rgba(141, 183, 182, 0.2216) 0deg,rgba(141, 183, 182, 0.89) 315deg,rgba(141, 183, 182, 0.13) 316.825deg,rgba(141, 183, 182, 0.2216) 360deg)",
                height: "100%",
                width: "100%",
                opacity: 1,
              }}
            />
          </foreignObject>
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M176.947 148.881C176.326 139.656 168.037 132.876 158.872 134.097L49.2703 148.689C40.105 149.909 33.8789 158.622 35.693 167.688L57.1073 274.713C58.7617 282.982 66.5493 288.547 74.9079 287.434L170.43 274.716C178.788 273.603 184.848 266.194 184.282 257.781L176.947 148.881Z"
        data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.55294120311737061,&#34;g&#34;:0.71764707565307617,&#34;b&#34;:0.71372550725936890,&#34;a&#34;:0.12999999523162842},&#34;position&#34;:0.88006919622421265},{&#34;color&#34;:{&#34;r&#34;:0.55294120311737061,&#34;g&#34;:0.71764707565307617,&#34;b&#34;:0.71372550725936890,&#34;a&#34;:0.88999998569488525},&#34;position&#34;:0.8750}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.55294120311737061,&#34;g&#34;:0.71764707565307617,&#34;b&#34;:0.71372550725936890,&#34;a&#34;:0.12999999523162842},&#34;position&#34;:0.88006919622421265},{&#34;color&#34;:{&#34;r&#34;:0.55294120311737061,&#34;g&#34;:0.71764707565307617,&#34;b&#34;:0.71372550725936890,&#34;a&#34;:0.88999998569488525},&#34;position&#34;:0.8750}],&#34;transform&#34;:{&#34;m00&#34;:-143.45753479003906,&#34;m01&#34;:18.597549438476562,&#34;m02&#34;:175.79995727539062,&#34;m10&#34;:19.100187301635742,&#34;m11&#34;:139.68232727050781,&#34;m12&#34;:131.84277343750},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
      />
      <g
        style={{
          animation: `${uid}-stack 4.2s ease-in-out infinite`,
          transformBox: "fill-box",
          transformOrigin: "50% 55%",
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M157.575 103.079C155.555 97.9454 150.294 94.851 144.825 95.5791L56.7851 107.301C49.0581 108.33 44.3476 116.338 47.2027 123.591L74.0722 191.855C76.0928 196.988 81.3533 200.083 86.822 199.355L174.862 187.633C182.589 186.604 187.3 178.596 184.445 171.343L157.575 103.079Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M137.51 124.376C136.413 121.71 133.659 120.118 130.802 120.498L78.3792 127.478C74.2523 128.028 71.7628 132.334 73.3467 136.185C74.4431 138.85 77.1977 140.442 80.0547 140.062L132.477 133.082C136.604 132.533 139.093 128.226 137.51 124.376Z"
          fill="#E4ECEE"
          style={{
            animation: `${uid}-accent1 4.2s ease-in-out infinite`,
          }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M146.999 147.446C145.903 144.781 143.148 143.188 140.291 143.569L109.262 147.7C105.135 148.25 102.645 152.557 104.229 156.407C105.326 159.072 108.08 160.664 110.937 160.284L141.967 156.153C146.094 155.603 148.583 151.296 146.999 147.446Z"
          fill="#E4ECEE"
          style={{
            animation: `${uid}-accent2 4.2s ease-in-out infinite`,
          }}
        />
      </g>
      <path
        data-figma-bg-blur-radius="13.5914"
        d="M178.224 146.112L131.748 152.3C127.489 152.867 123.657 155.177 121.166 158.677L99.0208 189.791C96.3688 193.517 92.2889 195.975 87.7555 196.579L41.7939 202.698C32.6721 203.913 26.6108 212.761 28.7736 221.706L44.0125 284.728C45.8769 292.438 53.2614 297.496 61.1241 296.449L188.179 279.533C196.216 278.463 202.07 271.38 201.608 263.286L195.745 160.593C195.23 151.588 187.165 144.922 178.224 146.112Z"
        fill={`url(#${uid}-p3)`}
        stroke={`url(#${uid}-p4)`}
      />
      <rect
        width="48.2412"
        height="12.695"
        rx="5"
        transform="matrix(-0.991253 0.131977 0.131977 0.991253 178.73 163.471)"
        fill="white"
      />
      <defs>
        <clipPath id={`${uid}-p2-clip`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M176.947 148.881C176.326 139.656 168.037 132.876 158.872 134.097L49.2703 148.689C40.105 149.909 33.8789 158.622 35.693 167.688L57.1073 274.713C58.7617 282.982 66.5493 288.547 74.9079 287.434L170.43 274.716C178.788 273.603 184.848 266.194 184.282 257.781L176.947 148.881Z"
          />
        </clipPath>
        <radialGradient
          id={`${uid}-p0`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-144.511 29.6524 29.4395 141.005 171.545 139.136)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4ECEE" />
          <stop offset="1" stopColor="#488981" />
        </radialGradient>
        <linearGradient
          id={`${uid}-p1`}
          x1="221.338"
          y1="179.859"
          x2="134.125"
          y2="268.702"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.29535} />
          <stop offset="1" stopColor="white" stopOpacity={0.01} />
        </linearGradient>
        <radialGradient
          id={`${uid}-p3`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-53.6454 125.299 160.304 31.9052 183.361 154.177)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.801593} />
          <stop offset="1" stopColor="#488981" stopOpacity={0.52} />
        </radialGradient>
        <radialGradient
          id={`${uid}-p4`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-24.5983 76.9268 149.809 19.9587 179.989 158.541)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity={0.973411} />
          <stop offset="1" stopColor="white" stopOpacity={0.01} />
        </radialGradient>
      </defs>
    </svg>
  );
}
