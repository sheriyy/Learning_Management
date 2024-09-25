"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

const ReadText = ({ value }: { value: string }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div
      style={{
        backgroundColor: "cornflowerblue",
        // padding: "10px",
        borderRadius: "8px",
      }}
    >
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
};

export default ReadText;
