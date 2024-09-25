import { getPerformance } from "@/app/actions/getPerformance";
import { Chart } from "@/components/performance/Chart";
import DataCard from "@/components/performance/DataCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const PerformancePage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const { data, totalRevenue, totalSales } = await getPerformance(userId);

  return (
    <div className="p-5">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 my-20">
        <DataCard value={totalRevenue} label="Total revenue" shouldFormat />
        <DataCard value={totalSales} label="Total sales" />
        <Chart data={data} />
      </div>
    </div>
  );
};

export default PerformancePage;
