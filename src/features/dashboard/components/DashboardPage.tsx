"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import OverviewBg from "./OverviewBg";
import ProposalTypeIcon from "@/icons/ProposalTypeIcon";
import ArrowDownCircleIcon from "@/icons/ArrowDownCircleIcon";
import ProposalDetailsModal from "@/features/dashboard/components/ProposalDetailsModal";
import CreateProposalModal from "@/features/dashboard/components/CreateProposalModal";

// ── Icons ──────────────────────────────────────────────────────────
function AttachIcon() {
  return (
    <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
      <path
        d="M13.8794 7.68305C13.9375 7.7411 13.9836 7.81003 14.0151 7.8859C14.0465 7.96178 14.0627 8.04311 14.0627 8.12524C14.0627 8.20738 14.0465 8.28871 14.0151 8.36458C13.9836 8.44045 13.9375 8.50938 13.8794 8.56743L7.46925 14.9737C6.64863 15.7942 5.53568 16.2551 4.37522 16.255C3.21477 16.255 2.10187 15.7939 1.28136 14.9733C0.460845 14.1527 -7.32354e-05 13.0397 8.72804e-09 11.8793C7.32529e-05 10.7188 0.461132 9.60591 1.28175 8.7854L9.03644 0.916649C9.6223 0.330168 10.4171 0.000439978 11.2461 4.39999e-07C12.0751 -0.000439098 12.8703 0.328446 13.4568 0.914305C14.0432 1.50016 14.373 2.29501 14.3734 3.12398C14.3738 3.95295 14.045 4.74814 13.4591 5.33462L5.70284 13.2034C5.3506 13.5556 4.87286 13.7535 4.37472 13.7535C3.87657 13.7535 3.39883 13.5556 3.04659 13.2034C2.69435 12.8511 2.49647 12.3734 2.49647 11.8752C2.49647 11.3771 2.69435 10.8994 3.04659 10.5471L9.55441 3.93618C9.61141 3.87537 9.68001 3.82657 9.75616 3.79266C9.83231 3.75876 9.91447 3.74043 9.99781 3.73875C10.0811 3.73707 10.164 3.75208 10.2414 3.7829C10.3189 3.81371 10.3894 3.85971 10.4488 3.91818C10.5082 3.97665 10.5553 4.04641 10.5874 4.12336C10.6194 4.20031 10.6357 4.2829 10.6354 4.36625C10.635 4.44961 10.618 4.53205 10.5853 4.60873C10.5526 4.68541 10.5049 4.75477 10.445 4.81274L3.93644 11.4307C3.87816 11.4885 3.83185 11.5572 3.80013 11.633C3.76842 11.7087 3.75193 11.7899 3.7516 11.872C3.75127 11.9541 3.76712 12.0354 3.79823 12.1114C3.82934 12.1873 3.87511 12.2564 3.93292 12.3147C3.99073 12.373 4.05946 12.4193 4.13517 12.451C4.21088 12.4827 4.2921 12.4992 4.37419 12.4995C4.45627 12.4999 4.53762 12.484 4.61358 12.4529C4.68954 12.4218 4.75863 12.376 4.81691 12.3182L12.5724 4.45337C12.9246 4.10185 13.1228 3.62481 13.1233 3.12718C13.1238 2.62955 12.9266 2.15209 12.5751 1.79985C12.2236 1.44761 11.7465 1.24944 11.2489 1.24892C10.7513 1.24841 10.2738 1.4456 9.92159 1.79712L2.16847 9.66274C1.87802 9.95273 1.64754 10.2971 1.49017 10.6761C1.3328 11.0552 1.25164 11.4615 1.25131 11.872C1.25099 12.2824 1.3315 12.6889 1.48827 13.0682C1.64503 13.4475 1.87497 13.7922 2.16495 14.0827C2.45494 14.3731 2.79929 14.6036 3.17835 14.761C3.55741 14.9183 3.96376 14.9995 4.37419 14.9998C4.78461 15.0001 5.19109 14.9196 5.5704 14.7629C5.94971 14.6061 6.29443 14.3762 6.58488 14.0862L12.9958 7.67993C13.1134 7.56322 13.2726 7.49799 13.4383 7.49858C13.6039 7.49916 13.7626 7.56552 13.8794 7.68305Z"
        fill="#A0A3BD"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 19" fill="none">
      <path
        d="M7.87695 0.046875C8.01869 0.0468753 8.15912 0.0746125 8.29004 0.128906C8.38851 0.169793 8.48051 0.225415 8.5625 0.292969L8.64062 0.364258L15.3906 7.11426C15.491 7.21428 15.5706 7.33304 15.625 7.46387C15.6794 7.59492 15.708 7.73603 15.708 7.87793C15.708 8.01976 15.6794 8.16002 15.625 8.29102C15.5842 8.38926 15.5293 8.48066 15.4619 8.5625L15.3906 8.6416C15.2905 8.7421 15.1711 8.82157 15.04 8.87598C14.9091 8.93033 14.7688 8.95898 14.627 8.95898C14.4851 8.95898 14.3449 8.93033 14.2139 8.87598C14.0828 8.82157 13.9634 8.7421 13.8633 8.6416L8.95605 3.73438V17.6289C8.956 17.9146 8.84251 18.1885 8.64062 18.3906C8.43845 18.5928 8.16385 18.707 7.87793 18.707C7.59199 18.707 7.31742 18.5928 7.11523 18.3906C6.91332 18.1885 6.79986 17.9146 6.7998 17.6289V3.73438L6.71973 3.81445L1.89062 8.6416C1.68808 8.8441 1.41337 8.95801 1.12695 8.95801C0.840539 8.95801 0.565827 8.8441 0.363281 8.6416C0.160767 8.43909 0.0469192 8.16432 0.046875 7.87793C0.046875 7.59151 0.160779 7.3168 0.363281 7.11426L7.11328 0.364258C7.21344 0.263748 7.33282 0.183321 7.46387 0.128906C7.59479 0.074613 7.73522 0.046875 7.87695 0.046875Z"
        fill="white"
        stroke="white"
        strokeWidth="0.09375"
      />
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const attachInputRef = useRef<HTMLInputElement>(null);

  const types = [
    { key: "technical", label: t.dashboard.overview.typesTechnical },
    { key: "financial", label: t.dashboard.overview.typesFinancial },
    { key: "visualization", label: t.dashboard.overview.typesVisualization },
  ];

  function openAttachPicker() {
    attachInputRef.current?.click();
  }

  function handleAttachFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    setAttachedFiles((prev) => [...prev, ...files]);
    event.target.value = "";
  }

  return (
    <div className="relative flex h-full min-h-0 flex-1 items-center justify-center">
      {/* Background — fixed so it extends behind the sticky navbar */}
      <OverviewBg className="fixed inset-0 z-0 h-full w-full" />

      {/* Centered content */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        <input
          ref={attachInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleAttachFiles}
        />

        {/* Title */}
        <h1
          className="mb-8 text-center text-xl font-semibold text-transparent md:text-2xl lg:text-[32px] tracking-[0.4px]"
          style={{
            background:
              "linear-gradient(to top, #51D1B8 0%, #58A19A 54%, #488981 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextStroke: "0.5px #0B605544",
          }}
        >
          {t.dashboard.overview.promptTitle}
        </h1>

        {/* Textarea card */}
        <div
          className="rounded-3xl p-px"
          style={{
            backgroundImage:
              "linear-gradient(to top right, rgba(255, 255, 255, 0.2) 0%, rgba(88, 161, 154, 0.2) 100%), linear-gradient(to bottom, rgba(230, 230, 230, 0.7) 0%, rgba(81, 209, 184, 0.7) 100%)",
          }}
        >
          <div className="relative rounded-[23px] bg-white shadow-sm dark:bg-[#111]">
            <textarea
              rows={2}
              placeholder={t.dashboard.overview.promptPlaceholder}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="block w-full resize-none rounded-[23px] bg-[#F6F6F6] dark:bg-[#1a1a1a] !font-[300] tracking-wide px-4 pb-14 pt-4 text-sm text-black placeholder:text-[#A0A3BD] focus:outline-none dark:text-white dark:placeholder:text-[#A0A3BD]"
            />

            {/* Actions inside textarea */}
            <div className="absolute bottom-3 end-3 flex items-center gap-2">
              <button
                type="button"
                onClick={openAttachPicker}
                className="flex h-8 w-8 md:h-10 md:w-10 bg-white dark:bg-white/10 rounded-full items-center justify-center text-[#A0A3BD] transition-colors hover:text-primary cursor-pointer"
                aria-label={
                  attachedFiles.length
                    ? `Attach file (${attachedFiles.length} selected)`
                    : "Attach file"
                }
              >
                <AttachIcon />
              </button>
              <button
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark cursor-pointer"
                aria-label="Send"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Type chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
          {types.map((type) => {
            const active = selectedType === type.key;
            return (
              <button
                key={type.key}
                type="button"
                onClick={() => setSelectedType(active ? null : type.key)}
                className={`chip-btn flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm lg:text-base font-[450] backdrop-blur-sm transition-colors cursor-pointer ${
                  active
                    ? "border-primary text-primary"
                    : "border-[#D8E9E780] text-black hover:border-primary hover:text-primary dark:text-white dark:hover:border-primary dark:hover:text-primary"
                }`}
              >
                <ProposalTypeIcon />
                {type.label}
              </button>
            );
          })}
          <button
            type="button"
            className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-[#D8E9E7] bg-white/70 text-[#A0A3BD] backdrop-blur-sm transition-colors hover:border-primary hover:text-primary dark:border-[rgba(72,137,129,0.45)] dark:bg-[rgba(72,137,129,0.12)] dark:text-[#8DB7B6] dark:hover:border-primary dark:hover:text-primary cursor-pointer"
            aria-label="More"
          >
            <ArrowDownCircleIcon size={20} />
          </button>
        </div>

        {/* Create Manual Proposal button */}
        <div className="mt-5 flex justify-center max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="w-full rounded-full bg-primary px-10 py-3 text-sm md:text-[15px] font-semibold tracking-wide text-white transition-colors hover:bg-primary-dark cursor-pointer"
          >
            {t.dashboard.overview.createManualProposal}
          </button>
        </div>
      </div>

      {showDetailsModal && (
        <ProposalDetailsModal
          prompt={prompt}
          initialFiles={attachedFiles}
          proposalType={selectedType ?? undefined}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
      {showCreateModal && (
        <CreateProposalModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
