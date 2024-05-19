"use client"
import {ColumnDef} from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Sifariş ID",
    cell:({row}) => <Link className='hover:text-red-1' href={`/orders/${row.original._id}`}><p>{row.original._id}</p></Link>
  },
  {
    accessorKey: "customer",
    header: "Müştəri",
  },
  {
    accessorKey: "products",
    header: "Mıhsullar",
  },
  {
    accessorKey: "totalAmount",
    header: "Yekun Məbləğ",
  },
  {
    accessorKey: "createdAt",
    header: "Sifariş saatı",
  },
]