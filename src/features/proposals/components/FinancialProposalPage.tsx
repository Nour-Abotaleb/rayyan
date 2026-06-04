"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProposalStepsSidebar from "@/features/proposals/components/ProposalStepsSidebar";
import FinancialReadinessStep from "@/features/proposals/components/FinancialReadinessStep";
import FinancialProjectInfoStep from "@/features/proposals/components/FinancialProjectInfoStep";
import FinancialDeliverablesStep from "@/features/proposals/components/FinancialDeliverablesStep";
import FinancialPaymentTermsStep from "@/features/proposals/components/FinancialPaymentTermsStep";
import FinancialFinalReviewStep from "@/features/proposals/components/FinancialFinalReviewStep";

export default function FinancialProposalPage() {
  const { t } = useLanguage();
  const fp = t.dashboard.financialProposal;

  const [phase, setPhase] = useState<"readiness" | "steps">("readiness");
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { number: 1, title: fp.steps.projectInfoTitle, subtitle: fp.steps.projectInfoSubtitle },
    { number: 2, title: fp.steps.deliverablesTitle, subtitle: fp.steps.deliverablesSubtitle },
    { number: 3, title: fp.steps.paymentTermsTitle, subtitle: fp.steps.paymentTermsSubtitle },
    { number: 4, title: fp.steps.finalReviewTitle, subtitle: fp.steps.finalReviewSubtitle },
  ];

  const progress = useMemo(
    () => Math.min(100, Math.round((activeStep / steps.length) * 100)),
    [activeStep],
  );

  if (phase === "readiness") {
    return <FinancialReadinessStep onPass={() => setPhase("steps")} />;
  }

  return (
    <div className="layout-shell-x flex h-full min-h-0 flex-1 flex-col gap-3 overflow-x-hidden md:gap-6 lg:flex-row lg:items-stretch lg:overflow-hidden">
      <ProposalStepsSidebar
        title={fp.sidebar.title}
        description={fp.sidebar.description}
        steps={steps}
        activeStep={activeStep}
        progress={progress}
      />

      <div className="scrollbar-hide flex min-h-0 min-w-0 flex-1 flex-col gap-6 overflow-y-auto pb-4 pt-1">
        {activeStep === 1 && (
          <FinancialProjectInfoStep
            onBack={() => setPhase("readiness")}
            onNext={() => setActiveStep(2)}
          />
        )}
        {activeStep === 2 && (
          <FinancialDeliverablesStep
            onBack={() => setActiveStep(1)}
            onNext={() => setActiveStep(3)}
          />
        )}
        {activeStep === 3 && (
          <FinancialPaymentTermsStep
            onBack={() => setActiveStep(2)}
            onNext={() => setActiveStep(4)}
          />
        )}
        {activeStep === 4 && (
          <FinancialFinalReviewStep
            onBack={() => setActiveStep(3)}
            onSubmit={() => {}}
          />
        )}
      </div>
    </div>
  );
}
