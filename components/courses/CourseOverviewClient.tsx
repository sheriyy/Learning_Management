"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionMenu } from "@/components/layout/SectionMenu";
import Accordion from "@/components/Accordion";
import TextAnalysisButton from "@/components/TextAnalysisButton";

const CourseOverviewClient = ({
  course,
  instructor,
  level,
}: {
  course: {
    title: string;
    subtitle: string;
    price: number;
    description: string;
  };
  instructor: {
    imageUrl: string;
    fullName: string;
  };
  level: {
    name: string;
  } | null;
}) => {
  const [language, setLanguage] = useState<string>("");

  return (
    <div className="px-5 py-4 flex flex-col gap-6 text-sm">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{course.title}</h2>
        <SectionMenu course={course} />
      </div>
      <p className="font-medium">{course.subtitle}</p>
      <div className="flex gap-2 items-center">
        <Image
          src={instructor.imageUrl || "/avatar_placeholder.jpg"}
          alt={instructor.fullName || "Instructor photo"}
          width={29}
          height={29}
          className="rounded-full"
        />
        <p className="font-semibold">Instructor: </p>
        <p>{instructor.fullName}</p>
      </div>
      <div className="flex gap-3">
        <p className="font-semibold">Price(€): </p>
        <p>{course.price}</p>
      </div>
      <div className="flex gap-3">
        <p className="font-semibold">Level: </p>
        <p>{level?.name}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Accordion
          title="Course Description:"
          description={course.description}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="language" className="block font-medium">
          Enter target language code (e.g., de, fr, es):
        </label>
        <input
          type="text"
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-2 px-4 py-2 border rounded"
        />
      </div>

      <TextAnalysisButton
        description={course.description}
        language={language}
      />
    </div>
  );
};

export default CourseOverviewClient;
