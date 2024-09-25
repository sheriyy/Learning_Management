import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    const { courseId } = params;
    console.log("rate")
    const { userId } = auth();

    if (!userId) {
        return NextResponse.redirect("/sign-in");
    }

    const { rating } = await req.json();

    if (rating < 1 || rating > 5) {
        return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const existingRating = await db.rating.findUnique({
        where: { userId_courseId: { userId, courseId } },
    });

    if (existingRating) {

        await db.rating.update({
            where: { userId_courseId: { userId, courseId } },
            data: { rating },
        });
    } else {

        await db.rating.create({
            data: {
                rating,
                userId,
                courseId,
            },
        });
    }

    return NextResponse.json({ message: "Rating submitted successfully" });
}
