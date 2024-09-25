"use client";

import { motion } from "framer-motion";
import { slideInFromRight } from "@/utils/motion";
import CourseCard from "@/components/courses/CourseCard";

interface AnimatedCourseCardWrapperProps {
  course: any;
}

const AnimatedCourseCardWrapper = ({
  course,
}: AnimatedCourseCardWrapperProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInFromRight(1)}
      className="h-full w-full flex flex-col md:flex-row gap-10 px-10"
    >
      <CourseCard course={course} />
    </motion.div>
  );
};

export default AnimatedCourseCardWrapper;
