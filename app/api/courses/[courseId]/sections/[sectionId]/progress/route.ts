import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req: NextRequest, { params }: { params: { courseId: string, sectionId: string } }) => {


    try {
        const { userId } = auth();
        const { isCompleted } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { courseId, sectionId } = params;

        const course = await db.course.findUnique({
            where: {
                id: courseId,

            }
        });
        if (!course) {
            return new NextResponse("Course not found", { status: 404 })
        }

        const section = await db.section.findUnique({
            where: {
                id: sectionId,
                courseId
            },

        })

        if (!section) {
            return new NextResponse("Section not found", { status: 404 })
        }

        const progress = await db.progress.upsert({
            where: {
                studentId_sectionId: {
                    studentId: userId,
                    sectionId
                }
            },
            update: {
                isCompleted,
            },
            create: {
                studentId: userId,
                sectionId,
                isCompleted
            }
        })
        return NextResponse.json(progress, { status: 200 });
    } catch (err) {
        console.log("[sectionId_Progress_POST");
        return new NextResponse("Internal server error", { status: 500 })
    }
}


