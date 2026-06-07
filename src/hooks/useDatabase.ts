"use client";

import { useCallback, useEffect, useState } from "react";
import { documentsService, type Document, type DocumentCategory } from "@/lib/api/documents.service";

export function useDatabase(categories: DocumentCategory[]) {
  const [items, setItems] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const key = categories.join(",");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const results = await Promise.all(categories.map((cat) => documentsService.getDocuments(cat)));
    const all = results.flatMap((r) => (r.ok ? r.data.documents : []));
    setItems(all.filter((doc, i, arr) => arr.findIndex((d) => d.id === doc.id) === i));
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    setItems([]);
    fetchAll();
  }, [fetchAll]);

  const upload = useCallback(async (category: DocumentCategory, files: File[]) => {
    const res = await documentsService.uploadDocument(category, files);
    if (res.ok) await fetchAll();
    return res;
  }, [fetchAll]);

  const deleteDoc = useCallback(async (id: string) => {
    const res = await documentsService.deleteDocument(id);
    if (res.ok) setItems((prev) => prev.filter((d) => d.id !== id));
    return res;
  }, []);

  const viewDoc = useCallback((id: string) => {
    documentsService.viewDocument(id);
  }, []);

  return { items, loading, upload, deleteDoc, viewDoc };
}
