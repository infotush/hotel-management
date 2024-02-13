import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins.js";

export const useCabin = () => {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, error, isLoading };
};
