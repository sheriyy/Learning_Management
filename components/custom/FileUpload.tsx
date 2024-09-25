"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

interface FileUploadProps {
  value: string;
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  page: string;
}
const FileUpload = ({ value, onChange, endpoint, page }: FileUploadProps) => {
  return (
    <div className="flex flex-col gap-2 ">
      {page === "Edit Course" && value !== "" && (
        <Image
          className="w-[280px] h-[200px] object-cover rounded-xl bg-white"
          src={value}
          alt="image"
          width={490}
          height={490}
        />
      )}
      {page === "Edit section" && value !== "" && (
        <p className="text-sm font-medium text-white">{value}</p>
      )}
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res ? res[0].url : undefined);
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
        className="w-[270px] h-[200px] bg-white"
      />
    </div>
  );
};

export default FileUpload;
