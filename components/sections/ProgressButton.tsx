"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";

interface ProgressButtonProps {
  courseId: string;
  sectionId: string;
  isCompleted: boolean;
}

const ProgressButton = ({
  courseId,
  sectionId,

  isCompleted,
}: ProgressButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      axios.post(`/api/courses/${courseId}/sections/${sectionId}/progress`, {
        isCompleted: !isCompleted,
      });

      toast.success("Progress updated");
      router.refresh();
    } catch (err) {
      console.log("failed to update progress", err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant={isCompleted ? "complete" : "default"} onClick={onClick}>
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : isCompleted ? (
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-3" />
          <span> Completed</span>
        </div>
      ) : (
        "Mark as complete"
      )}
    </Button>
  );
};

export default ProgressButton;
