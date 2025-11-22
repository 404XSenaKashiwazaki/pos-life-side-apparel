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
const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const ids = await searchParams;

  const toArray = (value: string | string[] | undefined): string[] => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  };
  return (
    <div className="container mx-auto py-10">
      <PrintSection id={toArray(ids?.id) ?? []} status={ids?.status ?? ""} />
    </div>
  );
};

export default Page;
