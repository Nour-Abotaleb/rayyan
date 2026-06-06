"use client";

import { useEffect, useState } from "react";
import { optionsService } from "@/lib/api/options.service";

const cache = new Map<string, string[]>();
const pending = new Map<string, Promise<string[]>>();

export function useOptions(type: string) {
  const [options, setOptions] = useState<string[]>(() => cache.get(type) ?? []);
  const [loading, setLoading] = useState(!cache.has(type));

  useEffect(() => {
    if (cache.has(type)) {
      setOptions(cache.get(type)!);
      setLoading(false);
      return;
    }

    let cancelled = false;

    if (!pending.has(type)) {
      const p = optionsService.getOptions(type).then((res) => {
        const opts = res.ok ? res.data.options : [];
        cache.set(type, opts);
        pending.delete(type);
        return opts;
      });
      pending.set(type, p);
    }

    pending.get(type)!.then((opts) => {
      if (!cancelled) {
        setOptions(opts);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [type]);

  return { options, loading };
}
