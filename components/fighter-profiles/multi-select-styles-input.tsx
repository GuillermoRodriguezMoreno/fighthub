"use client";
import { useState } from "react";
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
};
export default function MultiSelectStyle({
  styles,
  fighterStyles = [],
}: MultiSelectStyleProps) {
  const fighterStyleIds = fighterStyles.map((style) => String(style.id));
  console.log("styleIds", styles);

  const [selected, setSelected] = useState<string[]>(fighterStyleIds);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (styleId: string) => {
    setSelected((prev) =>
      prev.includes(styleId)
        ? prev.filter((id) => id !== styleId)
        : [...prev, styleId],
    );
  };

  const removeItem = (styleId: string) => {
    setSelected((prev) => prev.filter((id) => id !== styleId));
  };

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
                  selected.map((styleId) => {
                    const style = styles.find((s) => String(s.id) === styleId);
                    return (
                      <Badge
                        key={styleId}
                        variant="secondary"
                        className="text-xs"
                      >
                        {style?.name}
                        <button
                          className="ml-1 hover:bg-muted rounded-full"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeItem(styleId);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })
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
                    selected.includes(String(style.id)) && "bg-accent",
                  )}
                  onClick={() => handleToggle(String(style.id))}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <div
                      className={cn(
                        "w-4 h-4 border rounded flex items-center justify-center",
                        selected.includes(String(style.id))
                          ? "bg-primary border-primary"
                          : "border-input",
                      )}
                    >
                      {selected.includes(String(style.id)) && (
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
