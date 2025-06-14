import { searchFighterByName } from "@/clients/fighter-profile-client";
import { FighterProfileResponse } from "@/domains/fighter-profile";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useFindFightersProfilesByName(search: string) {
  const [debounced, setDebounced] = useState(search);

  useEffect(() => {
    const h = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(h);
  }, [search]);

  return useQuery<FighterProfileResponse[]>({
    queryKey: ["find-fighters-profiles-by-name", debounced],
    queryFn: async () => {
      if (debounced.trim().length === 0) {
        return [];
      }
      const response = await searchFighterByName(debounced);
      return response;
    },
    enabled: debounced.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
