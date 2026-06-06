"use client";

import { useEffect, useState } from "react";
import { statsService, type DashboardStats } from "@/lib/api/stats.service";

export function useStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsService.getStats().then((res) => {
      if (res.ok) setStats(res.data);
      setLoading(false);
    });
  }, []);

  return { stats, loading };
}
