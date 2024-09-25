import CourseCard from "@/components/courses/CourseCard";
import { db } from "@/lib/db";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const queryText = searchParams.query || "";

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      OR: [{ title: { contains: queryText } }],
    },
    include: {
      category: true,
      subCategory: true,
      level: true,
      sections: {
        where: {
          isPublished: true,
        },
      },
      Rating: true,
    },
  });

  const coursesWithAvgRating = courses.map((course) => {
    const averageRating =
      course.Rating.length > 0
        ? course.Rating.reduce((sum, rating) => sum + rating.rating, 0) /
          course.Rating.length
        : null;

    return { ...course, averageRating };
  });

  const sortedCourses = coursesWithAvgRating.sort((a, b) => {
    if (a.averageRating === null) return 1;
    if (b.averageRating === null) return -1;
    return b.averageRating - a.averageRating;
  });

  return (
    <div className="px-4 py-6 md:px-9 xl:px-16">
      <p className="text-lg md:text-xl font-bold mb-9">
        Courses for {queryText}
      </p>
      <div className="flex gap-5 flex-wrap ">
        {sortedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
