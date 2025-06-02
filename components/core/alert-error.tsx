import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { JSX } from "react";

export interface AlertErrorProps {
  description: string;
}

export function AlertError({ description }: AlertErrorProps): JSX.Element {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
