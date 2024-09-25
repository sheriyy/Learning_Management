"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const SkillText = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const handleNavigate = () => {
    router.push("/audiosearch"); // Navigate to the /audiosearch page
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        // initial="hidden"
        // animate="visible"
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
          Think better with our courses
        </h1>
      </motion.div>
      <motion.div
        // initial="hidden"
        // animate="visible"
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        Learn skills with modern technologies
      </motion.div>

      <motion.div
        // initial="hidden"
        // animate="visible"
        variants={slideInFromRight(0.5)}
        className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
      >
        Awesome features- Voice-Enabled Course Exploration
      </motion.div>
      <motion.a
        variants={slideInFromLeft(1)}
        className="py-2 Welcome-box Welcome-text button-primary text-center z-10 text-white cursor-pointer rounded-lg max-w-[200px]"
        //   className=" py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
      >
        {" "}
        <SparklesIcon className="text-[#b49bff] mr-[10px] ml-[4px] h-5 w-5 mx-[2px]" />
        <a
          href="/audiosearch"
          className="Welcome-text text-[13px] px-[2px] py-[4px] mr-[2px]  "
        >
          Audio-based Search!
        </a>
      </motion.a>
      {/* <button
        onClick={handleNavigate}
        className="mt-6 cursor-pointer z-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Explore Audio Search
      </button> */}
    </div>
  );
};

export default SkillText;
