import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { JSX } from "react";

export interface AlertInfoProps {
  description: string;
}

export function AlertInfo({ description }: AlertInfoProps): JSX.Element {
  return (
    <Alert variant="default">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
