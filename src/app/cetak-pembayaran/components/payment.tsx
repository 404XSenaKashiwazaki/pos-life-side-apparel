"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/formatCurrency";
import { Payment } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import { byPayments } from "../queries";
import { ColumnPaymentTypeDefProps } from "@/types/datatable";
import {
  IconFile,
  IconFileExport,
  IconPhone,
  IconPrinter,
} from "@tabler/icons-react";
import { useSite } from "@/components/providers/Site-provider";
import { Separator } from "@/components/ui/separator";

interface PaymentsPrintProps {
  id: string[];
  status: string;
}
const PaymentsPrint: React.FC<PaymentsPrintProps> = ({ id, status }) => {
  const sites = useSite();
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<ColumnPaymentTypeDefProps[] | null[]>([]);
  useEffect(() => {
    startTransition(async () => {
      if (id.length > 0) {
        const { data } = await byPayments({
          id,
          status,
        });
        if (data) setData(data);
      }
    });
  }, []);

  // const produk = pembelian?.detailpembelian.map(e=> ({...e?.}))
  if (isPending || !sites) return <Skeleton className="w-full h-52" />;
  if (!data || data.length === 0) return <div>Tidak Ada Data.</div>;

  return (
    <div>
      <div className="flex gap-2 items-start sm:justify-between">
        <div className="flex gap-1 mb-5 text-m font-semibold">
          <IconPrinter className="h-5 w-5" />
          Cetak Laporan
        </div>
        <div className="flex gap-1 mb-5 text-m font-semibold">
          <Button
            size={"sm"}
            variant={"default"}
            onClick={() => alert("Cetak PDF")}
          >
            <IconFileExport className="h-5 w-5" />
            PDF
          </Button>
        </div>
      </div>

      {data.length > 0 ? (
        data.map((e, i) => (
          <div className="space-y-3 mt-3 sm:mt-6" key={e?.id}>
            <div className="flex gap-1 mb-5 text-md font-medium">
              <IconPhone className="h-5 w-5" />
              Info Kontak
            </div>
            <div className="flex flex-row items-start gap-3 sm:gap-6 w-full">
              <Image
                src={sites.fileProofUrl ?? ""}
                alt={sites.filename ?? "image"}
                width={100}
                height={100}
                priority
                className="w-10 h-10 rounded-sm"
              />
              <div className="flex-4 w-full ">
                <div className="flex gap-1 text-md font-medium">
                  {sites.name ?? "-"}
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>{sites.email ?? "-"}</p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>{sites?.phone ?? "-"}</p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm ">
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>{sites.address ?? "-"}</p>
                  </span>
                </div>
              </div>
            </div>
            <Separator className="mt-2" />
            <div className="space-y-1">
              <div className="mb-1 text-md font-medium">Pembeli</div>
              <div className="flex flex-row gap-1  justify-between items-start text-sm">
                <span className="flex items-center gap-1 text-muted-foreground  w-full">
                  Nama
                </span>
                <span className="font-xs text-primary  w-full  flex items-start gap-1">
                  <p>:</p>
                  <p>{e?.order.customer.name ?? "-"}</p>
                </span>
              </div>
              <div className="flex flex-row gap-1  justify-between items-start text-sm">
                <span className="flex items-center gap-1 text-muted-foreground  w-full">
                  No Hp
                </span>
                <span className="font-xs text-primary  w-full  flex items-start gap-1">
                  <p>:</p>
                  <p>{e?.order.customer.phone ?? "-"}</p>
                </span>
              </div>

              <div className="flex flex-row gap-1  justify-between items-start text-sm">
                <span className="flex items-center gap-1 text-muted-foreground  w-full">
                  Email
                </span>
                <span className="font-xs text-primary  w-full  flex items-start gap-1">
                  <p>:</p>
                  <p>{e?.order.customer.email ?? "-"}</p>
                </span>
              </div>
              <div className="flex flex-row gap-1  justify-between items-start text-sm">
                <span className="flex items-center gap-1 text-muted-foreground  w-full">
                  Alamat
                </span>
                <span className="font-xs text-primary  w-full  flex items-start gap-1">
                  <p>:</p>
                  <p>{e?.order.customer.address ?? "-"}</p>
                </span>
              </div>
              <Separator className="mt-2" />
              <div className="mb-2 sm:mb-4 mt-3 sm:mt-6">
                <div className="mb-5 text-md font-medium">Produk</div>
                <div className="flex flex-col sm:flex-row gap-4 items-start justify-between text-sm my-3 sm:my-6">
                  <div className="w-full">
                    <Image
                      src={e?.order.items[0].products.fileUrl ?? ""}
                      alt="sfasg"
                      width={100}
                      height={100}
                      className="w-30 h-30 rounded-md"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1 ">
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Produk
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>{e?.order.items[0].products.name ?? "-"}</p>
                      </span>
                    </div>
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Tipe Sablon-Harga Dasar
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>
                          {`${e?.order.items[0].production?.sablonType?.name} `}{" "}
                          -{" "}
                          {formatCurrency(
                            e?.order.items[0].production?.sablonType
                              ?.basePrice ?? 0
                          )}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Warna
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>{e?.order.items[0].products.color ?? "-"}</p>
                      </span>
                    </div>
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Ukuran
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>{e?.order.items[0].products.size ?? "-"}</p>
                      </span>
                    </div>
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Biaya Pembelian
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>
                          {formatCurrency(
                            e?.order.items[0].products.purchaseCost ?? 0
                          )}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Harga Penjualan
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>
                          {formatCurrency(
                            e?.order.items[0].products.sellingPrice ?? 0
                          )}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Jumlah/Qty
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>{e?.order.items[0].quantity ?? "-"}</p>
                      </span>
                    </div>
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Harga Satuan
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>
                          {formatCurrency(e?.order.items[0].unitPrice ?? 0)}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Harga Biaya
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>
                          {formatCurrency(e?.order.items[0].costPrice ?? 0)}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Jumlah Biaya <span className="text-xs">Sablon</span>
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>
                          {formatCurrency(e?.order.items[0].costTotal ?? 0)}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-row gap-1  justify-between items-start text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground  w-full">
                        Jumlah Total
                      </span>
                      <span className="font-xs text-primary  w-full  flex items-start gap-1">
                        <p>:</p>
                        <p>
                          {" "}
                          {formatCurrency(e?.order.items[0].subtotal ?? 0)}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="mt-2" />
              <div className="mb-5 text-md font-medium mt-3 sm:mt-10">
                Transaksi
              </div>
              {/*  */}
              <div className="space-y-1 mt-3 sm:mt-5">
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Nomor Order
                  </span>
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <p>
                      <Button size={"sm"} variant={"default"}>
                        {e?.order.orderNumber}
                      </Button>
                    </p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Status
                  </span>

                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <p>
                      <Button
                        // variant={"destructive"}
                        size={"sm"}
                        variant={`${
                          e?.status !== "FAILED" ? "default" : "destructive"
                        }`}
                      >
                        {e?.status}
                      </Button>
                    </p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Biaya Pegiriman
                  </span>
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <p>{formatCurrency(e?.order.shippingFee ?? 0)}</p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Diskon
                  </span>
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <p>{formatCurrency(e?.order.discountAmount ?? 0)}</p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Total Pembayaran
                  </span>
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <p>{formatCurrency(e?.amount ?? 0)}</p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Kembalian
                  </span>
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <p>{formatCurrency(e?.amountReturn ?? 0)}</p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Tipe Pembayaran
                  </span>
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <p>{e?.type}</p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Metode Pembayaran
                  </span>
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <p>{e?.method}</p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Tanggal Pembayaran
                  </span>
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <p>{format(e?.paidAt ?? "", "PPP")}</p>
                  </span>
                </div>
                <div className="flex flex-row gap-1  justify-between items-start text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Catatan
                  </span>
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <p>{e?.notes}</p>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-1 items-start sm:justify-between text-sm mt-2 sm:mt-4">
                  <span className="flex items-center gap-1 text-muted-foreground  w-full">
                    Bukti Transfer
                  </span>
                  <span className="font-xs text-primary  w-full  flex items-start gap-1">
                    <p>:</p>
                    <Image
                      src={e?.reference ?? ""}
                      alt={e?.filename ?? ""}
                      width={100}
                      height={100}
                      priority
                      className="w-full h-full rounded-md"
                    />
                  </span>
                </div>
              </div>
              {/*  */}
            </div>
          </div>
        ))
      ) : (
        <div>Tidak Ada Data</div>
      )}
    </div>
  );
};

export default PaymentsPrint;
