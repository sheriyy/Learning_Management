import React from "react";
import CourseCard from "./courses/CourseCard";

const MatchedCourses = ({ matchedCourses }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-6 justify-center">
        {matchedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MatchedCourses;
