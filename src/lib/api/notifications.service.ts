import { api } from "@/lib/api/client";

export type NotificationItemType = "warning" | "info" | string;

export interface NotificationItem {
  /** Some APIs return numeric ids as strings in JSON */
  id: number | string;
  user_id: number | null;
  title: string;
  message: string;
  type: NotificationItemType;
  /** API uses 0 / 1 */
  is_read: number;
  created_at: string;
}

export function listNotifications() {
  return api.get<NotificationItem[]>("/notifications");
}

export interface MarkNotificationReadResponse {
  message: string;
}

function coerceNotificationId(id: NotificationItem["id"]): number | null {
  if (typeof id === "number" && Number.isFinite(id)) return id;
  const n = Number.parseInt(String(id), 10);
  return Number.isFinite(n) ? n : null;
}

/** PUT `/notifications/:id/read` */
export async function markNotificationRead(id: NotificationItem["id"]) {
  const numericId = coerceNotificationId(id);
  if (numericId === null) {
    return {
      ok: false as const,
      error: "Invalid notification id",
      status: 0,
    };
  }
  const path = `/notifications/${numericId}/read`;
  return api.put<MarkNotificationReadResponse>(path, {});
}

/** Handles numeric 0/1 and occasional string/boolean shapes from the API */
export function isNotificationUnread(n: NotificationItem) {
  const r = n.is_read as unknown;
  if (typeof r === "boolean") return !r;
  const num = Number(r);
  if (Number.isNaN(num)) return false;
  return num === 0;
}

/** Stable map/set key so string vs numeric `id` from JSON always matches */
export function notificationRowKey(n: Pick<NotificationItem, "id">): string {
  return String(n.id);
}
