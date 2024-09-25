"use client";
import React, { useMemo, useState } from "react";
import { useAuth, useUser, UserButton } from "@clerk/nextjs";
import { Menu, Search } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  const { user } = useUser();

  const allowedInstructorIds = [
    "user_2lEyOW6cXVf9eTMotFdpPvVeJge",
    "user_2lVa0ZxO3xOAUu31LMfmJdPMefI",
  ];
  const topRoutes = useMemo(() => {
    const instructorPath = allowedInstructorIds.includes(user?.id)
      ? "/instructor/courses"
      : "/";

    console.log("Rendering topRoutes with user id:", user?.id, [
      { label: "Instructor", path: instructorPath },
      { label: "Learners", path: "/" },
    ]);

    return [
      { label: "Instructor", path: instructorPath },
      { label: "Learners", path: "/" },
      { label: "Skills", path: "#skills" },
      { label: "Courses", path: "#courses" },
    ];
  }, [user?.id, allowedInstructorIds]);

  const sidebarRoutes = useMemo(
    () => [
      { label: "Courses", path: "/instructor/courses" },
      { label: "Performance", path: "/instructor/performance" },
    ],
    []
  );

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }
    setSearchInput("");
  };

  return (
    <div
      className="flex justify-between items-center p-3 mb-3
      // fixed z-[9999]  left-[16px] right-[16px]"
    >
      <Link href="/" className=" flex flex-row items-center justify-between">
        <Image src="/Navlogo.png" alt="logo" width={70} height={4} />
        <span className="font-bold ml-[10px]  md:block text-transparent bg-clip-text bg-gradient-to-r from-purple-50 to-cyan-500">
          LearnMate
        </span>
      </Link>
      <div className="max-md:hidden w-[400px] rounded-full flex">
        <input
          className="flex-grow bg-[#0499fd]/30 rounded-l-full border-none outline-none text-sm pl-4 py-3"
          placeholder="search courses"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="bg-[#0499fd]/80 rounded-r-full border-none outline-none cursor-pointer px-4 px-3"
          disabled={searchInput.trim() === ""}
          onClick={handleSearch}
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {topRoutes.map((route, index) => (
            <Link
              href={route.path}
              key={index}
              className="text-sm   font-medium hover:text-[#0499fd] m-2"
            >
              {/* <span className="text-white hover:text-[#0499fd]"> */}{" "}
              {route.label}
            </Link>
          ))}
        </div>
        <div className="w-full max-w-[196px] z-18 sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-4 h-4" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-5">
              {topRoutes.map((route, index) => (
                <Link
                  href={route.path}
                  key={index}
                  className="text-sm   font-medium  m-2"
                >
                  {/* <span className="text-white hover:text-[#0499fd]"> */}{" "}
                  {route.label}
                </Link>
              ))}
              {pathName.startsWith("/instructor") && (
                <div className="flex flex-col gap-5">
                  {sidebarRoutes.map((route, index) => (
                    <Link
                      href={route.path}
                      key={index}
                      className="text-sm  font-medium hover:text-[#0499fd] m-2"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
