"use client";

import { useEffect, useState } from "react";
import { optionsService, OptionItem } from "@/lib/api/options.service";

const cache = new Map<string, OptionItem[]>();
const pending = new Map<string, Promise<OptionItem[]>>();

export function useOptions(type: string) {
  const [options, setOptions] = useState<OptionItem[]>(() => cache.get(type) ?? []);
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
        const opts = res.ok ? (res.data.data ?? []) : [];
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
