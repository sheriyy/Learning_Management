"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PublishButtonProps {
  disabled: boolean;
  courseId: string;
  sectionId?: string;
  isPublished: boolean;
  page: string;
}
const PublishButton = ({
  disabled,
  courseId,
  sectionId,
  isPublished,
  page,
}: PublishButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    let url = `/api/courses/${courseId}`;
    if (page === "Section") {
      url += `/sections/${sectionId}`;
    }

    try {
      setIsLoading(true);
      isPublished
        ? await axios.post(`${url}/unpublish`)
        : await axios.post(`${url}/publish`);
      toast.success(`${page} ${isPublished ? "unpublished" : "published"}`);
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(
        `Falied to ${isPublished ? "unpublish" : "publish"} ${page}`,
        err
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={disabled || isLoading}
      onClick={onClick}
      className="text-black hover:bg-black hover:text-white"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : isPublished ? (
        "UnPublish"
      ) : (
        "Publish"
      )}
    </Button>
  );
};

export default PublishButton;
