
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Course } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const course: Course = await req.json();


        const instructor = await clerkClient.users.getUser(course.instructorId);


        const level = course.levelId
            ? await db.level.findUnique({ where: { id: course.levelId } })
            : null;


        const averageRating = await db.rating.aggregate({
            where: { courseId: course.id },
            _avg: { rating: true },
        });


        const user = await currentUser();

        const plainInstructor = {
            fullName: instructor.fullName,
            imageUrl: instructor.imageUrl,
        };

        const plainLevel = level ? { name: level.name } : null;

        return NextResponse.json({
            instructor: plainInstructor,
            level: plainLevel,
            averageRating: averageRating._avg.rating || 0,
            userId: user?.id || null,
        });
    } catch (error) {
        console.error("Error fetching course data:", error);
        return NextResponse.json({ error: "Failed to fetch course data" }, { status: 500 });
    }
}
