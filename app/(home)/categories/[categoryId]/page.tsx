import getCoursesByCategory from "@/app/actions/getCourses";
import CourseCard from "@/components/courses/CourseCard";
import Categories from "@/components/custom/Categories";
import { db } from "@/lib/db";
import React from "react";

const CoursesByCategory = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const courses = await getCoursesByCategory(params.categoryId);

  return (
    <div className="md:mt-5 md:px-9  xl:px-15 pb-15">
      <Categories
        categories={categories}
        selectedCategory={params.categoryId}
      />
      <div className="flex flex-wrap gap-6 justify-center">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesByCategory;
