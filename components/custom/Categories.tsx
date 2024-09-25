"use client";
import { Category } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import ChatbotLayout from "@/app/(home)/chatbotLayout";

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
}

const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
  const router = useRouter();

  const onClick = (categoryId: string | null) => {
    console.log("categoryId", categoryId);
    const basePath = "/categories";
    const path = categoryId ? `${basePath}/${categoryId}` : "/";
    router.push(path);
  };

  return (
    <>
      <h1
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r
          from-purple-50 to-cyan-500 py-5 text-center"
      >
        Courses
      </h1>
      <div className="flex  flex-wrap px-5 gap-6 justify-center mb-7 py-[30px] lg:py-[0px]">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onClick(null)}
          className=" Welcome-text  Welcome-box text-[13px] px-4"
        >
          All Categories
        </Button>
        {categories
          .filter(
            (category, index, self) =>
              self.findIndex((c) => c.name === category.name) === index
          )
          .map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => onClick(category.id)}
              className="Welcome-text  Welcome-box text-[13px] px-4 "
            >
              {category.name}
            </Button>
          ))}
      </div>
    </>
  );
};

export default Categories;
