"use client";
import React, { useEffect, useRef, useState } from "react";
import CourseCard from "./courses/CourseCard";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const AudioSearch = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
  const [transcript, setTanscript] = useState<string>("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchedCourses, setMatchedCourses] = useState<any[]>([]);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/fetched");
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

  const startRecording = () => {
    setIsRecording(true);

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];
      setTanscript(transcript);
    };
    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecordingComplete(true);
      matchCourses(transcript);
    }
    setIsRecording(false);
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const matchCourses = (transcript: string) => {
    const ignoredWords = [
      "can",
      "you",
      "give",
      "the",
      "me",
      "a",
      "and",
      "provide",
      "course",
      "courses",
      "display",
      "show",
    ];

    const words = transcript
      .toLowerCase()
      .split(" ")
      .filter((word) => !ignoredWords.includes(word));

    const transcriptPhrase = words.join(" ");
    const matchedCourses: any[] = [];

    courses.forEach((course) => {
      const courseTitle = course.title.toLowerCase();
      const isExactMatch = courseTitle.includes(transcriptPhrase);

      if (isExactMatch) {
        matchedCourses.push(course);
      }
    });

    setMatchedCourses(matchedCourses);
    console.log("matched courses", transcriptPhrase, matchedCourses);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen w-full px-6 py-3 bg-[#030014]">
      <h3 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-50 to-cyan-500 py-2 text-center mb-2">
        Search by audio- Provide course Title/name
      </h3>

      <div className="w-full flex flex-col items-center mb-4">
        {isRecording || transcript ? (
          <div className="w-auto  m-auto rounded-md border p-4 text-center">
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium mb-1">
                {recordingComplete ? "Recorded" : "Recording..."}
              </p>
              <p className="text-sm mb-2">
                {recordingComplete
                  ? "Thanks for your input"
                  : "Start speaking..."}
              </p>
              {isRecording && (
                <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
              )}
            </div>

            {transcript && (
              <div className="mt-4 text-gray-700">
                <p>{transcript}</p>
              </div>
            )}
          </div>
        ) : null}

        <button
          onClick={handleToggleRecording}
          className={`mt-3 flex justify-center items-center ${
            isRecording
              ? "bg-red-400 hover:bg-red-500"
              : "bg-blue-400 hover:bg-blue-500"
          } rounded-full w-20 h-20`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            viewBox="0 0 56 56"
          >
            <path
              fill="currentColor"
              d="M36.543 26.852V12.109c0-5.414-3.492-9.187-8.531-9.187c-5.04 0-8.532 3.773-8.532 9.187v14.743c0 5.39 3.493 9.187 8.532 9.187s8.53-3.797 8.53-9.187m-3.54 0c0 3.468-1.991 5.695-4.991 5.695c-3 0-4.992-2.227-4.992-5.695V12.109c0-3.468 1.992-5.695 4.992-5.695s4.992 2.227 4.992 5.695ZM17.536 49.539a1.76 1.76 0 0 0-1.758 1.781a1.74 1.74 0 0 0 1.758 1.758h20.953a1.74 1.74 0 0 0 1.758-1.758a1.76 1.76 0 0 0-1.758-1.78H29.77v-5.462c8.953-.75 15-7.172 15-16.383v-4.757a1.74 1.74 0 0 0-1.758-1.758a1.76 1.76 0 0 0-1.782 1.758v4.617c0 7.992-5.203 13.289-13.218 13.289c-8.016 0-13.242-5.297-13.242-13.29v-4.616a1.74 1.74 0 0 0-1.758-1.758a1.76 1.76 0 0 0-1.782 1.758v4.757c0 9.211 6.07 15.633 15 16.383v5.461Z"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-6 justify-center w-full">
        {!loading && matchedCourses.length > 0 ? (
          matchedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className=" text-lg " style={{ color: "palevioletred" }}>
            No matching courses found
          </p>
        )}
      </div>
    </div>
  );
};

export default AudioSearch;
