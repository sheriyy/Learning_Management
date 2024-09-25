import FlipCard from "@/components/FlipCard";
import React from "react";
import { FlipProjectCards } from "../../constants/index";

const FlipPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-center bg-cover">
      <div className="grid grid-cols-2 gap-5 max-w-[90%] max-h-[90%]">
        {FlipProjectCards.map((card, index) => (
          <FlipCard
            key={index}
            title={card.title}
            text={card.text}
            image={card.src}
          />
        ))}
      </div>
    </div>
  );
};

export default FlipPage;
