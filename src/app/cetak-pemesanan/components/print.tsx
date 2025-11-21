"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
const CardSection = dynamic(() => import("./order"), {
  loading: () => (
    <div>
      <Skeleton className="w-full h-20 mb-1" />
    </div>
  ),
  ssr: false,
});

const PrintSection = () => {
  return (
    <CardSection
      id={["cmi7pfufn0001j7ostonwli39", "cmi8moxm60001j77wi7qzl1xa"]}
      status="PENDING"
    />
  );
};

export default PrintSection;
