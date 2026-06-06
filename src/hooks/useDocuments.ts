"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  teamLoading, teamSuccess, teamFailure,
  cvLoading, cvSuccess, cvFailure,
} from "@/store/slices/documentsSlice";
import { documentsService } from "@/lib/api/documents.service";

export function useDocuments() {
  const dispatch = useDispatch<AppDispatch>();
  const { team, cv } = useSelector((s: RootState) => s.documents);

  const fetchTeamDocs = useCallback(async () => {
    if (team.items.length) return;
    dispatch(teamLoading());
    const res = await documentsService.getDocuments("team");
    if (!res.ok) {
      dispatch(teamFailure(res.error));
      return;
    }
    dispatch(teamSuccess({ items: res.data.documents, total: res.data.total }));
  }, [dispatch, team.items.length]);

  const fetchCvDocs = useCallback(async () => {
    if (cv.items.length) return;
    dispatch(cvLoading());
    const res = await documentsService.getDocuments("cv_resume");
    if (!res.ok) {
      dispatch(cvFailure(res.error));
      return;
    }
    dispatch(cvSuccess({ items: res.data.documents, total: res.data.total }));
  }, [dispatch, cv.items.length]);

  const viewDocument = useCallback((id: string) => {
    return documentsService.viewDocument(id);
  }, []);

  return {
    teamDocs: team.items,
    cvDocs: cv.items,
    teamLoading: team.loading,
    cvLoading: cv.loading,
    fetchTeamDocs,
    fetchCvDocs,
    viewDocument,
  };
}
