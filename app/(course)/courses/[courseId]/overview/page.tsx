import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import ReadText from "@/components/custom/ReadText";
import { SectionMenu } from "@/components/layout/SectionMenu";
import { Button } from "@/components/ui/button";
import TextAnalysisButton from "@/components/TextAnalysisButton";
import Accordion from "@/components/Accordion";
import LanguageInput from "@/components/LanguageInput";
import HomeLayout from "@/app/(home)/layout";
import ChatbotLayout from "@/app/(home)/chatbotLayout";

import Link from "next/link"; // Import Link from Next.js

const CourseOverview = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const instructor = await clerkClient.users.getUser(course.instructorId);
  let level;

  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  return (
    <div className="px-5 flex flex-col gap-6 text-sm my-14">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mt-[30px]">{course.title}</h2>
        <SectionMenu course={course} />
      </div>

      <p className="font-medium">{course.subtitle}</p>

      <div className="flex gap-2 items-center">
        <Link href={`/aboutinstructor?instructorId=${instructor.id}`}>
          <Image
            src={
              instructor.imageUrl
                ? instructor.imageUrl
                : "/avatar_placeholder.jpg"
            }
            alt={instructor.fullName ? instructor.fullName : "Instructor photo"}
            width={29}
            height={29}
            className="rounded-full cursor-pointer" // Add cursor-pointer to indicate clickability
          />
        </Link>
        <p className="font-semibold">Instructor: </p>
        <p>{instructor.fullName}</p>
      </div>

      {/* Other course details */}
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

      <LanguageInput description={course.description} />
      <ChatbotLayout children={undefined} />
    </div>
  );
};

export default CourseOverview;
