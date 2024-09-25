import { db } from "@/lib/db";
import { Course, Section } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Progress } from "../ui/progress";

interface CourseSidebarProps {
  course: Course & { sections: Section[] };
  studentId: string;
}

const CourseSidebar = async ({ course, studentId }: CourseSidebarProps) => {
  const publishedSections = await db.section.findMany({
    where: {
      courseId: course.id,
      isPublished: true,
    },
    orderBy: {
      position: "asc",
    },
  });

  const publishedSectionIds = publishedSections.map((section) => section.id);

  const purchase = await db.purchase.findUnique({
    where: {
      customerId_courseId: {
        customerId: studentId,
        courseId: course.id,
      },
    },
  });

  const completedSections = await db.progress.count({
    where: {
      studentId,
      sectionId: {
        in: publishedSectionIds,
      },
      isCompleted: true,
    },
  });

  const progressPercentage =
    (completedSections / publishedSectionIds.length) * 100;

  return (
    <div className="hidden md:flex flex-col w-64 border-r shadow-md px-4 my-14 text-sm ">
      <h2 className="text-lg font-bold mb-3 mt-[30px]">{course.title}</h2>
      {purchase && (
        <div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm">{Math.round(progressPercentage)}% completed</p>
        </div>
      )}
      <Link
        href={`/courses/${course.id}/overview`}
        className="p-4 rounded-lg hover:bg-[#0499fd] mt-5"
      >
        Overview
      </Link>
      {publishedSections.map((section) => (
        <Link
          key={section.id}
          href={`/courses/${course.id}/sections/${section.id}`}
          className="p-4 rounded-lg hover:bg-[#0499fd] mt-5"
        >
          {section.title}
        </Link>
      ))}
    </div>
  );
};

export default CourseSidebar;
