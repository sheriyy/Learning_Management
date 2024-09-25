"use client";

import React, { useState } from "react";
import axios from "axios";

interface AccordionProps {
  title: string;
  description: string;
  showPlainText?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  description,
  showPlainText = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [plainTextDescription, setPlainTextDescription] = useState<
    string | null
  >(null);
  const [textData, setTextData] = useState<string | null>(null);

  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const extractTextContent = (htmlContent: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const handleToggle = async () => {
    setIsOpen(!isOpen);
    if (!isOpen && !plainTextDescription) {
      const plainText = extractTextContent(description);
      setPlainTextDescription(plainText);

      const response = await axios.post("http://localhost:5001/synthesize", {
        description: plainText,
      });

      console.log(response);
      const audio = `data:audio/mp3;base64,${response.data.audioContent}`;
      setAudioSrc(audio);
    }
  };

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        <p className="font-semibold">{title}</p>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <div className="mt-2">
          {audioSrc && <audio controls src={audioSrc} />}

          {showPlainText && plainTextDescription && (
            <p className="text-sm m-1">{plainTextDescription}</p>
          )}

          {textData && <div>{/* Render here the fetched daaata */}</div>}
        </div>
      )}
    </div>
  );
};

export default Accordion;
