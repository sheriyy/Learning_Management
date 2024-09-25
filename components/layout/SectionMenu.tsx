import { Course, Section } from "@prisma/client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

export const SectionMenu = ({
  course,
}: {
  course: Course & { sections: Section[] };
}) => {
  return (
    <div className="w-full max-w-[196px] md:hidden">
      <Sheet>
        <SheetTrigger>
          <Button className="flex justify-between">Sections</Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <Link
            href={`/courses/${course.id}/overview`}
            className="p-4 rounded-lg hover:bg-[#0499fd] mt-5"
          >
            Overview
          </Link>
          {course.sections.map((section) => (
            <Link
              key={section.id}
              href={`/courses/${course.id}/sections/${section.id}`}
              className="p-4 rounded-lg hover:bg-[#0499fd] mt-5"
            >
              {/* {console.log("section.title", section.title)} */}
              {section.title}
            </Link>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
};
