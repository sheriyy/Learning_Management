"use client";
import React, { useState } from "react";
import TextAnalysisButton from "@/components/TextAnalysisButton";

const LanguageInput = ({ description }: { description: string }) => {
  const [language, setLanguage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim().slice(0, 2);
    setLanguage(trimmedValue);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <TextAnalysisButton description={description} language={language} />
    </div>
  );
};

export default LanguageInput;
