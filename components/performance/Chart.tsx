"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export const Chart = ({
  data,
}: {
  data: { name: string; total: number }[];
}) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={390}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="888888"
            fontSize={14}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="888888"
            fontSize={14}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `€${value}`}
          />
          <Tooltip />
          <Bar dataKey="total" fill="#0499fd" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
