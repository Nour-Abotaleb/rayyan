'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import popupHero from '@src/assets/dashboard/popup-hero.png'
import popupBg from '@src/assets/dashboard/popup-bg.png'
import ChipIcon from '@/icons/ChipIcon'
import ArrowUpRightIcon from '@/icons/ArrowUpRightIcon'
import CloseIcon from '@/icons/CloseIcon'

interface ProposalType {
  title: string
  description: string
  tone: 'primary' | 'secondary' | 'tertiary'
}

const proposalTypes: ProposalType[] = [
  {
    title: 'Technical Proposal',
    description: 'Formulating the artistic concept, scope of work, and implementation plan using artificial intelligence.',
    tone: 'primary',
  },
  {
    title: 'Visualization',
    description: 'Visualize your data effortlessly and uncover insights that drive smarter decisions.',
    tone: 'secondary',
  },
  {
    title: 'Financial Proposal',
    description: 'Create clear, structured financial proposals that align with your business goals.',
    tone: 'tertiary',
  },
]

const toneStyles: Record<ProposalType['tone'], { arrowBg: string; chipBg: string; chipText: string }> = {
  primary: { arrowBg: 'bg-primary', chipBg: 'bg-primary/10', chipText: 'text-primary' },
  secondary: { arrowBg: 'bg-secondary', chipBg: 'bg-secondary/10', chipText: 'text-secondary' },
  tertiary: { arrowBg: 'bg-tertiary', chipBg: 'bg-tertiary/10', chipText: 'text-tertiary' },
}

interface CreateProposalModalProps {
  onClose: () => void
}

export default function CreateProposalModal({ onClose }: CreateProposalModalProps) {
  const router = useRouter()

  function handleSelect() {
    onClose()
    router.push('/dashboard/proposals/new')
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Panel */}
      <div className="relative isolate w-full max-w-[900px] max-h-[90vh] overflow-auto scrollbar-hide rounded-3xl bg-[#F8F8F8] dark:bg-zinc-900">
        {/* Background texture */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <Image
            src={popupBg}
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center opacity-35 dark:opacity-20"
            priority
          />
        </div>

        <div className="relative z-10 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Proposal Type</h2>
              <p className="mt-1 text-sm md:text-base text-black/60 dark:text-zinc-400">
                Choose your proposal type to start your journey.
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 bg-white/50 border border-white transition-colors hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              aria-label="Close"
            >
              <CloseIcon size={22} className="text-[#737373]" />
            </button>
          </div>

          {/* Hero image */}
          <div className="relative mb-6 h-44 w-full overflow-hidden rounded-2xl">
            <Image
              src={popupHero}
              alt="Proposal hero"
              fill
              className="object-contain object-center"
              priority
            />
          </div>

          {/* Proposal type cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {proposalTypes.map((type) => (
              <button
                key={type.title}
                onClick={handleSelect}
                aria-label={`Select ${type.title}`}
                className="group relative w-full overflow-visible rounded-2xl p-5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
              >
                {/* Card background texture */}
                <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden rounded-2xl">
                  <Image
                    src={popupBg}
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-contain object-center opacity-80"
                  />
                </div>

                {/* Arrow icon — outside card image (top right) */}
                <div
                  className={`pointer-events-none absolute -right-[0.1px] top-0 z-20 flex h-[52px] w-[52px] items-center justify-center rounded-full text-white cursor-pointer ${toneStyles[type.tone].arrowBg}`}
                  aria-hidden="true"
                >
                  <ArrowUpRightIcon size={20} />
                </div>

                <div className="relative z-10 flex flex-col gap-3">
                {/* Chip icon */}
                <div
                  className={`flex h-12 w-12 md:h-13 md:w-13 items-center justify-center rounded-full ${toneStyles[type.tone].chipBg} ${toneStyles[type.tone].chipText}`}
                >
                  <ChipIcon size={30} />
                </div>

                {/* Text */}
                <div className="mt-2">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{type.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-paragraph dark:text-zinc-400">
                    {type.description}
                  </p>
                </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
