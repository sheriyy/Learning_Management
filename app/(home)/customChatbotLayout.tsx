import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const CustomChatbotLayout = ({ courses }) => {
  const [updatedCourses, setUpdatedCourses] = useState([]);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async (course) => {
      try {
        const response = await fetch(`/api/audio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(course),
        });
        const data = await response.json();
        return {
          ...course,
          instructor: data.instructor.fullName,
          averageRating: data.averageRating,
        };
      } catch (error) {
        console.error(
          `Error fetching course data for course ${course.title}:`,
          error
        );
        return course;
      }
    };

    const updateCourses = async () => {
      const updatedCoursesData = await Promise.all(
        courses.map((course) => fetchCourseDetails(course))
      );
      setUpdatedCourses(updatedCoursesData);
    };

    if (courses.length) {
      updateCourses();
    }
  }, [courses]);

  const generateAnswer = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAuIMKPwI1j_N1yUeGC-1a2QKCN8GIinWs",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Find all courses in the following array where the title contains "${question}" (including multiple if they exist). For the course where the title contains "${question}", give me the instructorName, course price, rating, categoryName, and subtitle. Format the response as: "instructor: {instructor}, course price: {price}, subtitle: {subtitle}, categoryName:{category.name}, course rating: {averageRating},". Don't show any courses where the title does not contain "${question}", and provide the exact rating without any extra characters like newlines. If the rating is 4 or more, add the recommendation: "Good course .", and if the rating is less than 4, add: "Not recommended course .", . Here is the courses array: ${JSON.stringify(
                    updatedCourses
                  )}`,
                },
                // {
                //   text: `Find all courses in the following array where the title contains ""${question}"" (including multiple if they exist). For the course where the title contains ""${question}"" , give me the instructorName, course price, rating, categoryName, and subtitle. Format the response as: "instructor: {instructor}, course price: {price}, subtitle: {subtitle}, categoryName:{category.name}, course rating: {averageRating}" and dont show any of those course where the title does not contains ""${question}"" and provide exact rating  without any extra characters like (\n) or newlines and if rating is 4 or more than 4 then in response also add recommendation : "Good course" and if the course rating is less than 4 then in response add recommendation:"Not recommended course". Here is the courses array: ${JSON.stringify(
                //     updatedCourses
                //   )}`,
                // },
              ],
            },
          ],
        },
      });

      const generatedAnswer =
        response.data.candidates[0]?.content?.parts[0]?.text || "No result";

      console.log(
        "res",
        generatedAnswer,
        "and",
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
      setResponse(generatedAnswer);
    } catch (error) {
      console.error("Error generating answer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: "darkblue" }}
      className="fixed bottom-0 text-black right-0 w-[30%] max-w-[30%] p-4  shadow-lg rounded-t-lg border-t border-gray-200 z-50 mb-[40px]  flex flex-col"
    >
      <div className="flex-shrink-0">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          cols="30"
          rows="3"
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Bot, Provide Course Name and get info .."
        />
        <Button
          onClick={generateAnswer}
          className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow-md"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Generate Response"
          )}
        </Button>
      </div>
      <div className="flex-1 mt-2 overflow-y-auto">
        {response && (
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 text-black">
            <p className="font-semibold mb-2">
              Related course from {question}:
            </p>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomChatbotLayout;
