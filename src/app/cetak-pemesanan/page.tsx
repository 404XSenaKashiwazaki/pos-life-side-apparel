import React from "react";
import { Metadata } from "next";
import PrintSection from "./components/print";

export const metadata: Metadata = {
  title: `${
    (process.env.NEXT_PUBLIC_APP_NAME as string).replaceAll(".", "") ?? ``
  } - Cetak Laporan`,
};

export interface PageProps {
  searchParams?: {
    id?: string | string[];
    status: string;
    [key: string]: string | string[] | undefined;
  };
}
export default function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const ids = searchParams?.id;
  const status = searchParams?.status;

  const toArray = (value: string | string[] | undefined): string[] => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  };

  return (
    <div className="container mx-auto py-10">
      <PrintSection id={toArray(ids)} status={status as string ?? ""} />
    </div>
  );
}
