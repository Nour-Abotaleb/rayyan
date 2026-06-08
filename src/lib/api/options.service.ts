import { api } from "@/lib/api/client";

export interface OptionItem {
  id: string;
  label: string;
  value: string;
}

export interface OptionsResponse {
  data: OptionItem[];
}

export const optionsService = {
  getOptions(endpoint: string) {
    return api.get<OptionsResponse>(`/${endpoint}`);
  },
};
