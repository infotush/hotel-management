import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings.js";

export const useSettings = () => {
  const {
    data: settings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, error, isLoading };
};
