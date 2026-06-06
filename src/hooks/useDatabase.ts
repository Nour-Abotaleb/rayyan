"use client";

import { useCallback, useEffect, useState } from "react";
import { documentsService, type Document, type DocumentCategory } from "@/lib/api/documents.service";

export function useDatabase(categories: DocumentCategory[]) {
  const [items, setItems] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const key = categories.join(",");

  useEffect(() => {
    setLoading(true);
    setItems([]);
    Promise.all(categories.map((cat) => documentsService.getDocuments(cat))).then((results) => {
      setItems(results.flatMap((r) => (r.ok ? r.data.documents : [])));
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const upload = useCallback(async (category: DocumentCategory, files: File[]) => {
    const res = await documentsService.uploadDocument(category, files);
    if (res.ok) setItems((prev) => [...prev, ...res.data.documents]);
    return res;
  }, []);

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
