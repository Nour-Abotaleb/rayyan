"use client";

import type { ReactNode } from "react";

export type ProposalStep = {
  number: number;
  title: string;
  subtitle: string;
};

export default function ProposalStepsSidebar({
  title,
  description,
  steps,
  activeStep,
  progress,
}: {
  title: string;
  description: string;
  steps: ProposalStep[];
  activeStep: number;
  progress: number;
}) {
  return (
    <aside className="hidden shrink-0 overflow-hidden rounded-[24px] border border-[#F1F2F9] bg-white px-7 py-7 shadow-[0px_1px_8px_0px_rgba(25,33,61,0.06)] dark:border-[#171717] dark:bg-[#0D0D0D] lg:flex lg:h-[87vh] lg:min-h-0 lg:max-h-[87vh] lg:w-82 lg:flex-col lg:self-stretch">
      <h2 className="text-lg md:text-xl font-bold text-black dark:text-white">
        {title}
      </h2>
      <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-[#666666] md:text-sm">
        {description}
      </p>

      <div className="mt-2.5 flex items-center gap-3 border-b border-[#F1F2F9] pb-5 dark:border-[#171717]">
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#E3EBEA] p-0.5 dark:bg-[#1F2B29]">
          <div
            className="h-full rounded-full bg-primary transition-all dark:bg-[#519A91]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="shrink-0 text-sm font-semibold text-black dark:text-white">
          {progress}%
        </span>
      </div>

      <div className="mt-8 flex flex-col">
        {steps.map((step, idx) => {
          const isCompleted = step.number < activeStep;
          const isActive = step.number === activeStep;

          return (
            <div key={step.number}>
              <div className="flex items-start gap-4">
                {isCompleted ? (
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E4ECEE] bg-white dark:border-[#1B272B] dark:bg-[#0D0D0D]"
                    aria-label={`Step ${step.number} completed`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM11.76 5.74222L7.81333 11.2178C7.69578 11.3765 7.52421 11.4867 7.331 11.5276C7.13778 11.5686 6.93626 11.5374 6.76445 11.44L4.49778 10.1156C4.3139 10.0048 4.18156 9.82544 4.12988 9.61707C4.07821 9.40869 4.11142 9.18833 4.22222 9.00444C4.33303 8.82056 4.51234 8.68822 4.72071 8.63655C4.92908 8.58487 5.14945 8.61809 5.33333 8.72889L6.94222 9.68889L10.4978 4.80889C10.6297 4.67669 10.8038 4.59483 10.9898 4.57751C11.1758 4.56018 11.3619 4.60848 11.516 4.71403C11.6702 4.81959 11.7825 4.97574 11.8335 5.15541C11.8846 5.33509 11.8711 5.52696 11.7956 5.69778L11.76 5.74222Z"
                        fill="#488981"
                      />
                    </svg>
                  </div>
                ) : isActive ? (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E4ECEE] bg-linear-to-b from-[#8DB7B6] to-primary text-sm font-bold text-white dark:border-[#191919] dark:text-black">
                    {step.number}
                  </div>
                ) : (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E4ECEE] bg-white text-sm font-bold text-black dark:border-[#1B272B] dark:bg-[#0D0D0D] dark:text-white">
                    {step.number}
                  </div>
                )}

                <div className="pt-1">
                  <p className="text-sm font-bold tracking-wide text-black dark:text-white">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-xs font-light tracking-wide text-[#666666]">
                    {step.subtitle}
                  </p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="ms-4.25 my-2 flex flex-col">
                  <div
                    className={[
                      "h-10 w-0.5 rounded-full",
                      isCompleted
                        ? "bg-linear-to-b from-[#8DB7B6] to-primary dark:bg-[#519A91]"
                        : "",
                      isActive
                        ? "rounded-full bg-linear-to-b from-primary from-50% to-[#E4ECEE] to-50% dark:from-[#519A91] dark:to-[#1B272B]"
                        : "",
                      !isCompleted && !isActive
                        ? "bg-[#E4ECEE] dark:bg-[#1B272B]"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

