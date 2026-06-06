import { api } from "@/lib/api/client";

export interface OptionsResponse {
  options: string[];
}

export const optionsService = {
  getOptions(endpoint: string) {
    return api.get<OptionsResponse>(`/${endpoint}`);
  },
};
