"use client";

import { BarChart4, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const sidebarRoutes = [
    { icon: <MonitorPlay />, label: "Courses", path: "/instructor/courses" },
    {
      icon: <BarChart4 />,
      label: "Performance",
      path: "/instructor/performance",
    },
  ];
  return (
    <div className="max-sm:hidden flex flex-col w-64 border-r shadow-md px-4 mx-4 gap-4 text-sm font-medium my-20">
      {sidebarRoutes.map((routes) => (
        <Link
          href={routes.path}
          key={routes.path}
          className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#0499fd]
                ${
                  pathname.startsWith(routes.path) &&
                  "bg-[#0499fd] hover:bg-[#0499fd]/70"
                }`}
        >
          {routes.icon} {routes.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
