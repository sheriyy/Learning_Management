import getCoursesByCategory from "../app/actions/getCourses";
import CourseCard from "@/components/courses/CourseCard";

export default async function ServerCourses() {
  const courses = await getCoursesByCategory(null);

  const lastFiveCourses = courses.slice(-5);

  return (
    <div className="mt-5 px-9 pb-15">
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-50 to-cyan-500 py-5 text-center">
        Recommended Courses
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {lastFiveCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
