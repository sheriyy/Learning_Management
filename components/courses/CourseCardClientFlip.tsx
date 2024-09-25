"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Gem, Star } from "lucide-react";
import "./flipCard.css";
import Accordion from "../Accordion";

interface CourseCardClientProps {
  course: {
    id: string;
    title: string;
    imageUrl: string;
    price: string;
    description: string;
  };
  instructor: {
    fullName: string;
    imageUrl: string;
  };
  level: {
    name: string;
  } | null;
  userId: string | undefined;
  averageRating: number;
}

const CourseCardClient = ({
  course,
  instructor,
  level,
  userId,
  averageRating,
}: CourseCardClientProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleFlip = () => {
    if (isNavigating) return;
    setIsFlipped(!isFlipped);
  };

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsNavigating(true);
      setTimeout(() => {
        window.location.href =
          userId === "user_2lEyOW6cXVf9eTMotFdpPvVeJge" ||
          userId === "user_2lVa0ZxO3xOAUu31LMfmJdPMefI"
            ? `/`
            : `/courses/${course.id}/overview`;
      }, 15000); // time delay if necessary
    }
  };

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front" onClick={handleFlip}>
          <Image
            src={course.imageUrl || "/image_placeholder.webp"}
            alt={course.title}
            layout="intrinsic"
            width={300}
            height={300}
            className="rounded-t-xl"
          />
          <div className="px-4 py-2 flex flex-col gap-2">
            <h3 className="text-md font-bold text-blue-600 cursor-pointer text-black">
              {course.title}
            </h3>
            <div className="flex justify-between text-sm">
              {instructor && (
                <div className="flex gap-3 items-center">
                  <Image
                    src={instructor.imageUrl || "/avatar_placeholder.jpg"}
                    alt={instructor.fullName || "Instructor photo"}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <p className="font-bold text-white">{instructor.fullName}</p>
                </div>
              )}
              {level && (
                <div className="flex gap-3 items-center">
                  <Gem size={20} />
                  <p className="text-white">{level.name}</p>
                </div>
              )}
            </div>
            <p className="text-sm font-bold text-white">{course.price}€</p>

            <div className="flex items-center">
              <p className="text-white mr-2">Rating:</p>
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    averageRating > index ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="flip-card-back"
          onClick={handleFlip}
          style={{
            backgroundColor: "cornflowerblue",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <h3 className="text-lg font-bold mb-4">{course.title}</h3>
          <Accordion
            title="Course Description:"
            description={course.description}
            showPlainText={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCardClient;
