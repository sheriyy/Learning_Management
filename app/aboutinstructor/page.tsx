import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import CourseCard from "@/components/courses/CourseCard";
import Image from "next/image";
import { useParams } from "next/navigation";

const AboutInstructorPage = async ({
  searchParams,
}: {
  searchParams: { instructorId: string };
}) => {
  //  instructor ID from the query params
  const instructorId = searchParams.instructorId;

  const instructor = await clerkClient.users.getUser(instructorId);

  const courses = await db.course.findMany({
    where: {
      instructorId: instructorId,
      isPublished: true,
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-center gap-4 mb-2 fixed top-0 w-full py-2 shadow-lg z-50">
        <Image
          src={
            instructor.imageUrl
              ? instructor.imageUrl
              : "/avatar_placeholder.jpg"
          }
          alt={instructor.fullName ? instructor.fullName : "Instructor photo"}
          width={70}
          height={70}
          className="rounded-full"
        />
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-50 to-cyan-500 text-center">
          Instructor: {instructor.fullName}
        </h1>
      </div>

      <div className="mt-[70px]">
        <p className="mb-6">
          {`About ${instructor.fullName}: [I am an  masters student in Applied Computer Science  from Srh hoschshule heideleberg:
          I have a strong foundation in programming languages such as JavaScript, React and NextJs, and I’m proficient in frameworks like React, Node.js, and Django. My expertise spans across frontend, backend, and database management, allowing me to create complete and scalable solutions. I also have experience with DevOps and CI/CD pipelines, ensuring smooth and efficient deployment of projects.

          As a Tutor:
          I am deeply passionate about teaching and mentoring aspiring developers. I’ve created numerous courses that cater to different skill levels—from beginners looking to write their first line of code, to professionals aiming to enhance their knowledge in many advanced topics....]`}
        </p>

        <h2 className="text-xl font-semibold mb-4">
          Courses by {instructor.fullName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutInstructorPage;
