"use client";
import React from "react";
import ProjectCard from "../sub/ProjectCard";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/utils/motion";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r
          from-purple-50 to-cyan-500 py-20
          "
      >
        My Projects
      </h1>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInFromRight(1)}
        className="h-full w-full flex flex-col md:flex-row gap-10 px-10"
      >
        <ProjectCard
          src="/NextWebsite.png"
          title="Modern nextjs portfolio"
          description="Creating a compelling courses description is crucial to attract and inform potential students."
        />
        <ProjectCard
          src="/CardImage.png"
          title="Interactive website cards"
          description="Creating a compelling courses description is crucial to attract and inform potential students."
        />
        <ProjectCard
          src="/SpaceWebsite.png"
          title="Spaced themed website"
          description="Creating a compelling courses description is crucial to attract and inform potential students."
        />
      </motion.div>
    </div>
  );
};

export default Projects;
