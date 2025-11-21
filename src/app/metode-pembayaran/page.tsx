import React from "react";
import { getPaymentMethods } from "./queries";
import { Metadata } from "next";
import TableSection from "./components/table";

export const metadata: Metadata = {
  title: `${
    (process.env.NEXT_PUBLIC_APP_NAME as string).replaceAll(".", "") ?? ``
  } - Users`,
};
const Page = async () => {
  const { data } = await getPaymentMethods();
  return (
    <div className="container mx-auto py-10">
      <div className="w-full">
        <TableSection data={data ?? []} />
      </div>
    </div>
  );
};

export default Page;
