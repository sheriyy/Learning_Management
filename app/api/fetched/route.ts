import { NextResponse } from 'next/server';
import getCoursesByCategory from '@/app/actions/getCourses';

export async function GET() {
    try {
        const courses = await getCoursesByCategory(null);
        return NextResponse.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.error();
    }
}


