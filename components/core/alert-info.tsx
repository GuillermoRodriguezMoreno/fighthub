import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { JSX } from "react";

export interface AlertInfoProps {
  variant?: "default" | "destructive";
  description?: string;
  title: string;
}

export function AlertInfo({
  variant = "default",
  description,
  title,
}: AlertInfoProps): JSX.Element {
  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
