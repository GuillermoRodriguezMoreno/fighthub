"use client";
import { useEffect, useState } from "react";
import { Check, ChevronDown, Flame, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StyleResponse } from "@/domains/style";

type MultiSelectStyleProps = {
  styles: StyleResponse[];
  fighterStyles?: StyleResponse[];
  onSelect: (selectedStyles: StyleResponse[]) => void;
};

export default function MultiSelectStyle({
  styles,
  fighterStyles = [],
  onSelect,
}: MultiSelectStyleProps) {
  const [selected, setSelected] = useState<StyleResponse[]>(fighterStyles);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (style: StyleResponse) => {
    setSelected((prev) =>
      prev.some((s) => s.id === style.id)
        ? prev.filter((s) => s.id !== style.id)
        : [...prev, style],
    );
  };

  const removeItem = (styleId: number) => {
    setSelected((prev) => prev.filter((s) => s.id !== styleId));
  };

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="space-y-2">
        <Label htmlFor="styleId" className="text-right">
          <Flame size={16} /> Styles
        </Label>
        <Popover open={isOpen} onOpenChange={setIsOpen} modal>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isOpen}
              className="w-full justify-between min-h-[40px] h-auto"
            >
              <div className="flex flex-wrap gap-1">
                {selected.length === 0 ? (
                  <span className="text-muted-foreground">
                    Select styles...
                  </span>
                ) : (
                  selected.map((style) => (
                    <Badge
                      key={style.id}
                      variant="secondary"
                      className="text-xs"
                    >
                      {style.name}
                      <button
                        className="ml-1 hover:bg-muted rounded-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeItem(style.id || 0);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <div className="max-h-60 overflow-auto">
              {styles.map((style) => (
                <div
                  key={style.id}
                  className={cn(
                    "flex items-center px-3 py-2 cursor-pointer hover:bg-accent",
                    selected.some((s) => s.id === style.id) && "bg-accent",
                  )}
                  onClick={() => handleToggle(style)}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <div
                      className={cn(
                        "w-4 h-4 border rounded flex items-center justify-center",
                        selected.some((s) => s.id === style.id)
                          ? "bg-primary border-primary"
                          : "border-input",
                      )}
                    >
                      {selected.some((s) => s.id === style.id) && (
                        <Check className="h-3 w-3 text-primary-foreground" />
                      )}
                    </div>
                    <span className="text-sm">{style.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
