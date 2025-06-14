// components/LuchadorAutocomplete.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FighterProfileResponse } from "@/domains/fighter-profile";
import { useFindFightersProfilesByName } from "@/hooks/fighter_profile/use-find-fighter-profiles-by-name";

interface SearchFighterByNameAutocompleteProps {
  onSelect: (fighter: FighterProfileResponse) => void;
}

export function SearchFighterByNameAutocomplete({
  onSelect,
}: SearchFighterByNameAutocompleteProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] =
    useState<FighterProfileResponse | null>(null);

  const { data: items = [], isLoading } =
    useFindFightersProfilesByName(inputValue);
  const handleSelect = (item: FighterProfileResponse) => {
    setInputValue(item.name);
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <Command className="pt-5">
      <CommandInput
        placeholder={"Search for a fighter..."}
        value={inputValue}
        onValueChange={setInputValue}
        autoFocus
      />
      <CommandList>
        {isLoading && <div className="p-2">Loading...</div>}
        {!isLoading && items.length === 0 && !selectedItem && (
          <CommandEmpty className="text-start py-5">No results.</CommandEmpty>
        )}
        {items.length > 0 && (
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.name}
                onSelect={() => handleSelect(item)}
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
