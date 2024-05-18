'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'

interface DeleteProps{
    id:string;
    item?:string
}
const Delete:React.FC<DeleteProps> = ({id,item}) => {
  const itemType = item === 'product'?'products' : 'collections';
  const [loading,setLoading] = useState(false);
  const onDelete = async() => {
    try {
        setLoading(true)
        const res = await fetch(`/api/${itemType}/${id}`,{
            method:"DELETE"
        })
        if(res.ok){
           setLoading(false);
           window.location.href =  (`${itemType}`);
           toast.success(`${item} has deleted`);
        }
    } catch (error) {
        console.log('Something went wrong',error);
        toast.error('Something went wrong');
    }
  }
  return (
    <AlertDialog>
    <AlertDialogTrigger className='text-red-1' asChild>
    <Button className='bg-red-1 text-white'>
        <Trash className='w-4 h-4'/>
    </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className='bg-white text-grey-1'>
      <AlertDialogHeader>
        <AlertDialogTitle className='text-red-1'>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          {item}.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onDelete} className='bg-red-1 text-white-1'>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default Delete