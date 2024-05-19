"use client"
import { columns } from '@/components/collections/CollectionColumn';
import { DataTable } from '@/components/custom ui/DataTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
const Collections = () => {
    const [loading,setLoading] = useState(true);
    const [collections,setCollections] = useState([]);
    const router = useRouter();
    // const getCollections = async():Promise<void> => {
    //     try {
    //         const res = await fetch('/api/collections',{
    //             method:"GET"
    //         })
    //         const data = await res.json();
    //         data && setCollections(data);
    //         setLoading(false);
    //     } catch (error) {
    //         console.log('[collections_GET]',error);
    //     }
    // }
    const getCollections = async () => {
        try {
          const res = await fetch("/api/collections", {
            method: "GET",
          });
          const data = await res.json();
          setCollections(data);
          setLoading(false);
        } catch (err) {
          console.log("[collections_GET]", err);
        }
      };
    useEffect(()=>{getCollections()},[]);
    console.log(collections);
    
  return (
    <div className='px-10 py-5'>
     <div className='flex justify-between items-center'>
        <p className='text-heading2-bold'>Kolleksiyalar</p>
        <Button onClick={()=>router.push('/collections/new')} className='bg-blue-1 text-white'>
          <Plus className='h-4 w-4 mr-2'/>
           Yeni kolleksiya yarat
        </Button>
     </div>
      <Separator className='bg-grey-1 my-4'/>
      <DataTable columns={columns} data={collections} searchKey='title'/>
    </div>
  )
}

export default Collections