"use client"
import {ColumnDef} from '@tanstack/react-table';
import Delete from '../custom ui/Delete';
import Link from 'next/link';

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Məhsul adı",
    cell:({row}) => <Link className='hover:text-red-1' href={`/products/${row.original._id}`}><p>{row.original.title}</p></Link>
  },
  {
    accessorKey: "category",
    header: "Kateqoriya",
  },
  {
    accessorKey: "collections",
    header: "Kolleksitalar",
    cell:({row}) => row.original.collections.map((collection)=>collection.title).join(',')
  },
  {
    accessorKey: "price",
    header: "Qiymət AZN()",
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
  },
  { 
    id:'actions',
    cell:({row})=><Delete item="product" id={row.original._id}/> 
  }
]