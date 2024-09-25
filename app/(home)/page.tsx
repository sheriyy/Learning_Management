import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import getCoursesByCategory from "../actions/getCourses";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";
import AnimatedCourseCardWrapper from "@/components/main/AnimatedCourseCardWrapper";

export default async function Home() {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  const courses = await getCoursesByCategory(null);
  const lastFiveCourses = courses.slice(-5); // Get last 5 courses
  const remainingCourses = courses.slice(0, -5);
  return (
    <div className="md:mt-5 md:px-9  xl:px-15 pb-15">
      <Categories categories={categories} selectedCategory={null} />
      <div className="flex flex-wrap gap-6 justify-center">
        {remainingCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
