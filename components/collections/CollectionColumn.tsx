"use client"
import {ColumnDef} from '@tanstack/react-table';
import Delete from '../custom ui/Delete';
import Link from 'next/link';

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Ad",
    cell:({row}) => <Link className='hover:text-red-1' href={`/collections/${row.original._id}`}><p>{row.original.title}</p></Link>
  },
  {
    accessorKey: "products",
    header: "Məhsul sayı",
    cell:({row}) => <p>{row.original.products.length}</p>
  },
  { 
    id:'actions',
    cell:({row})=><Delete item='collection' id={row.original._id}/> 
  }
]