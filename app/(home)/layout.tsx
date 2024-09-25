"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ChatbotLayout from "./chatbotLayout";
import Hero from "@/components/main/Hero";
import Skills from "@/components/main/Skills";
import Encryption from "@/components/main/Encryption";
import { Footer } from "@/components/main/Footer";
import CustomChatbotLayout from "./customChatbotLayout";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const isCoursesPage = pathname === "/courses";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/fetched"); // Fetch from the API route
        const courseData = await response.json();
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  console.log("Current pathname:", pathname);
  console.log("Is courses page:", isCoursesPage);
  console.log("fetched course", courses);

  return (
    <>
      <main className="h-full w-full">
        <div className="flex flex-col h-[840px] gap-20">
          <Navbar />
          <Hero />
          <Skills />
          <div>
            {children}
            <div>
              <CustomChatbotLayout courses={courses} />
            </div>
          </div>
          <Encryption />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default HomeLayout;
