"use client";

import React, { useEffect, useState } from "react";
import CourseCardClient from "./CourseCardClientFlip";
import { Course } from "@prisma/client";

const CourseCard = ({ course }: { course: Course }) => {
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const response = await fetch(`/api/audio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(course),
        });
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCourseData();
  }, [course]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!courseData) {
    return <p>Course not found</p>;
  }

  return (
    <CourseCardClient
      course={{
        id: course.id,
        title: course.title,
        imageUrl: course.imageUrl,
        price: course.price,
        description: course.description,
      }}
      instructor={courseData.instructor}
      level={courseData.level}
      userId={courseData.userId}
      averageRating={courseData.averageRating}
    />
  );
};

export default CourseCard;
