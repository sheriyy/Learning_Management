"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const CourseCard = dynamic(() => import("./courses/CourseCard"), {
  ssr: false,
});

const CourseCardWrapper = ({ course }: { course: any }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseCard course={course} />
    </Suspense>
  );
};

export default CourseCardWrapper;
