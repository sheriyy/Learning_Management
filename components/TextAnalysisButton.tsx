"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const extractPlainText = (htmlContent: string): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  return tempDiv.textContent || tempDiv.innerText || "";
};

interface TextAnalysisButtonProps {
  description: string;
}

const TextAnalysisButton: React.FC<TextAnalysisButtonProps> = ({
  description,
}) => {
  const [synthesisData, setSynthesisData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("");

  const handleClick = async () => {
    try {
      const trimmedLanguage = language.trim().slice(0, 2).toLowerCase();

      if (trimmedLanguage === "") {
        setError("Please enter a valid language code.");
        return;
      }

      const plainTextDescription = extractPlainText(description);

      const response = await axios.post("http://localhost:5001/translate", {
        description: plainTextDescription,
        language: trimmedLanguage,
      });

      console.log("res", response);
      setSynthesisData(response.data.translation);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to translate the description. Please try again.");
      setSynthesisData(null);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="language" className="block font-medium mb-2">
          Enter target language code (e.g., en, fr, es):
        </label>
        <input
          type="text"
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 border rounded text-black"
          placeholder="Enter language code"
        />
      </div>

      <Button onClick={handleClick} className="w-auto px-4 py-2">
        Translate Course Description
      </Button>

      {synthesisData && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-black">
          <h3 className="font-semibold">Translated Description:</h3>
          <p>{synthesisData}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
    </div>
  );
};

export default TextAnalysisButton;
