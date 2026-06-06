"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import ProposalStepsSidebar from "@/features/proposals/components/ProposalStepsSidebar";
import FinancialReadinessStep from "@/features/proposals/components/FinancialReadinessStep";
import FinancialProjectInfoStep, { type ProjectInfoStepData } from "@/features/proposals/components/FinancialProjectInfoStep";
import FinancialDeliverablesStep, { type DeliverablesStepData } from "@/features/proposals/components/FinancialDeliverablesStep";
import FinancialPaymentTermsStep, { type PaymentTermsStepData } from "@/features/proposals/components/FinancialPaymentTermsStep";
import FinancialFinalReviewStep from "@/features/proposals/components/FinancialFinalReviewStep";
import { financialProposalService } from "@/lib/api/financial-proposal.service";

export default function FinancialProposalPage() {
  const { t } = useLanguage();
  const fp = t.dashboard.financialProposal;

  const router = useRouter();
  const [phase, setPhase] = useState<"readiness" | "steps">("readiness");
  const [activeStep, setActiveStep] = useState(1);
  const [projectInfo, setProjectInfo] = useState<ProjectInfoStepData | null>(null);
  const [deliverable, setDeliverable] = useState<DeliverablesStepData | null>(null);
  const [paymentTerms, setPaymentTerms] = useState<PaymentTermsStepData[] | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!projectInfo || !deliverable || !paymentTerms) return;
    setSubmitting(true);
    const res = await financialProposalService.createProposal({
      rfpMode: projectInfo.rfpMode,
      rfpFiles: projectInfo.rfpFiles,
      rfpDocIds: projectInfo.rfpDocIds,
      clientName: projectInfo.clientName,
      projectName: projectInfo.projectName,
      numDeliverables: projectInfo.numDeliverables,
      boqType: projectInfo.boqType,
      projectType: projectInfo.projectType,
      sectorIndustry: projectInfo.sectorIndustry,
      language: projectInfo.language,
      taxRate: projectInfo.taxRate,
      startDate: projectInfo.startDate || undefined,
      endDate: projectInfo.endDate || undefined,
      terms: projectInfo.terms || undefined,
      deliverables: [deliverable],
      paymentTerms,
    });
    setSubmitting(false);
    if (res.ok) {
      router.push(`/dashboard/proposals?created=${res.data.proposalId}`);
    }
  }

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
            onNext={(data) => { setProjectInfo(data); setActiveStep(2); }}
          />
        )}
        {activeStep === 2 && (
          <FinancialDeliverablesStep
            onBack={() => setActiveStep(1)}
            onNext={(data) => { setDeliverable(data); setActiveStep(3); }}
          />
        )}
        {activeStep === 3 && (
          <FinancialPaymentTermsStep
            onBack={() => setActiveStep(2)}
            onNext={(data) => { setPaymentTerms(data); setActiveStep(4); }}
          />
        )}
        {activeStep === 4 && (
          <FinancialFinalReviewStep
            projectInfo={projectInfo}
            deliverable={deliverable}
            paymentTerms={paymentTerms}
            onBack={() => setActiveStep(3)}
            onSubmit={handleSubmit}
            loading={submitting}
          />
        )}
      </div>
    </div>
  );
}
