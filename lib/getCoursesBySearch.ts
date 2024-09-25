
import { db } from "@/lib/db";
import { Course, Rating } from "@prisma/client";

type CourseWithAverageRating = Course & {
    averageRating: number;
};

const getCoursesBySearch = async (query: string): Promise<CourseWithAverageRating[]> => {
    if (!query.trim()) return [];


    const courses = await db.course.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive",
            },
            isPublished: true,
        },
        include: {
            Rating: true,
        });


    const coursesWithRatings = courses.map(course => {
        const totalRating = course.Rating.reduce((acc, rating) => acc + rating.rating, 0);
        const averageRating = course.Rating.length > 0 ? totalRating / course.Rating.length : 0;
        return {
            ...course,
            averageRating,
        };
    });


    return coursesWithRatings.sort((a, b) => b.averageRating - a.averageRating);
};

export default getCoursesBySearch;
