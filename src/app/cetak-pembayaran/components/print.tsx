"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
const CardSection = dynamic(() => import("./payment"), {
  loading: () => (
    <div>
      <Skeleton className="w-full h-20 mb-1" />
    </div>
  ),
  ssr: false,
});

const PrintSection = () => {
  return <CardSection id={["cmi7rl5zo0009j7ossp0iqb95"]} status="PAID" />;
};

export default PrintSection;
