import { api } from "@/lib/api/client";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  messageId: number;
}

/** POST `/contact` — public, no auth */
export function submitContact(body: ContactPayload) {
  return api.post<ContactResponse>("/contact", body, undefined, {
    auth: false,
  });
}
