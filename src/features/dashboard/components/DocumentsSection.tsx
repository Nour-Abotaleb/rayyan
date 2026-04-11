import Image from 'next/image'
import doc1 from '@src/assets/dashboard/doc-1.svg'
import doc2 from '@src/assets/dashboard/doc-2.svg'

interface DocumentCardProps {
  title: string
  description: string
  preview: typeof doc1
}

function DocumentCard({ title, description, preview }: DocumentCardProps) {
  return (
    <div className="grid flex-1 grid-cols-[1.2fr_1fr] items-stretch gap-6 rounded-[12px] bg-white p-4 dark:bg-zinc-900">
      <div className="flex min-w-0 flex-col gap-3">
        <p className="text-base md:text-[20px] font-semibold text-black/80 dark:text-zinc-100">{title}</p>
        <p className="text-sm leading-relaxed text-black/60 font-medium dark:text-zinc-400">
          {description}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <button className="text-nowrap rounded-full bg-primary px-4 py-2.5 text-xs cursor-pointer font-semibold text-white transition-colors hover:bg-primary-dark">
            From Computer
          </button>
          <button className="text-nowrap text-xs font-medium text-black bg-[#F6F6F6] cursor-pointer rounded-full px-4 py-2.5 hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light">
            From Google Drive
          </button>
        </div>
      </div>
      <div className="flex h-full min-h-0 flex-col py-2">
        <div className="relative min-h-0 w-full flex-1">
          <Image src={preview} alt={title} fill className="object-contain object-center" />
        </div>
      </div>
    </div>
  )
}

export default function DocumentsSection() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <DocumentCard
        title="CV/Resume"
        description="Upload your CV or resume for personalized proposals"
        preview={doc1}
      />
      <DocumentCard
        title="Team Documents"
        description="Upload team member profiles and qualifications"
        preview={doc2}
      />
    </div>
  )
}
