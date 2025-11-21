"use client";
import { Calendar, DollarSign, PhoneCall, Tag, User2Icon } from "lucide-react";
import {
  IconAddressBook,
  IconBuilding,
  IconBuildingStore,
  IconMail,
  IconNotebook,
  IconPackage,
  IconPencil,
  IconPhone,
  IconShield,
  IconShieldExclamation,
  IconUserCircle,
} from "@tabler/icons-react";
import React, { useEffect, useState, useTransition } from "react";

import { format } from "date-fns";
import { formatCurrency } from "@/lib/formatCurrency";
import { Customer, PaymentMethods, User } from "@prisma/client";
import { getPaymentMethodsById } from "../queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface DetailPembelianProps {
  id: string | null;
}

const DetailPage = ({ id }: DetailPembelianProps) => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<PaymentMethods | null>(null);
  useEffect(() => {
    startTransition(async () => {
      if (id) {
        const { data } = await getPaymentMethodsById(id);
        setData(data ?? null);
      }
    });
  },[]);

  // const produk = pembelian?.detailpembelian.map(e=> ({...e.}))
if(isPending) return <Skeleton className="w-full h-52"/>
  if (!data) return <div>Tidak Ada Data.</div>;
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex flex-col sm:flex-row gap-1 items-center justify-between text-sm ">
          <span className="flex items-center gap-1 text-muted-foreground  w-full">
          Nama
          </span>
          <span className="font-xs text-primary  w-full  flex items-start gap-1"><p>:</p><p className="capitalize">{data.name ?? "-"}</p></span>
        </div>
         <div className="flex flex-col sm:flex-row gap-1 items-center justify-between text-sm ">
          <span className="flex items-center gap-1 text-muted-foreground  w-full">
           Email
          </span>
          <span className="font-xs text-primary  w-full  flex items-start gap-1"><p>:</p><p>{data.no ?? "-"}</p></span>
        </div>
         <div className="flex flex-col sm:flex-row gap-1 items-center justify-between text-sm ">
          <span className="flex items-center gap-1 text-muted-foreground  w-full">
           Deskripsi
          </span>
          <span className="font-xs text-primary  w-full  flex items-start gap-1"><p>:</p><p>{data.description ?? "-"}</p></span>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
