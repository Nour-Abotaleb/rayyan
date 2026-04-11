import LeftPanel from './LeftPanel'
import StatsCards from './StatsCards'
import DocumentsSection from './DocumentsSection'
import ProposalsTable from './ProposalsTable'

// TODO: replace with real session data
const mockUser = { name: 'Ahmed' }

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* Left dark panel */}
      <LeftPanel />

      {/* Main content */}
      <main className="flex flex-1 flex-col gap-6 overflow-y-auto bg-screen py-4 md:py-6 px-3 dark:bg-zinc-950">
        {/* Welcome */}
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Welcome Back, {mockUser.name}
          </h1>
          <p className="mt-1 text-sm text-paragraph dark:text-zinc-400">
            Generate, Manage, And Track Your AI Proposals
          </p>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Document uploads */}
        <DocumentsSection />

        {/* Proposals list */}
        <ProposalsTable />
      </main>
    </div>
  )
}
