import { api } from "@/lib/api/client";

export interface DashboardStats {
  totalProposals: number;
  completed: number;
  inProgress: number;
  failed: number;
}

export const statsService = {
  getStats() {
    return api.get<DashboardStats>("/dashboard/stats");
  },
};
