import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, Terminal, Triangle, TriangleAlert } from "lucide-react";

interface AlertBannerProps {
  isCompleted: boolean;
  requiredFieldsCount: number;
  missingFieldsCount: number;
}

const AlertBanner = ({
  isCompleted,
  requiredFieldsCount,
  missingFieldsCount,
}: AlertBannerProps) => {
  return (
    <div className="my-20">
      <Alert
        className="my-5"
        variant={`${isCompleted ? "complete" : "destructive"}`}
      >
        {isCompleted ? (
          <Rocket className="h-5 w-5" />
        ) : (
          <TriangleAlert className="h-5 w-5" />
        )}
        <AlertTitle className="text-xs font-medium">
          {missingFieldsCount} missing field(s) /{requiredFieldsCount} required
          fields
        </AlertTitle>
        <AlertDescription className="text-xs">
          {isCompleted
            ? "Awesome Job! Ready to Publish"
            : "Course can be published when all required fields are completed!"}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertBanner;
