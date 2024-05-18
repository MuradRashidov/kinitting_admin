"use client"

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import { FC, useEffect, useState } from "react";

const CollectionDetails = ({params}:{params:{collectionId:string}}) => {
    const [collection,setCollection] = useState<CollectionType | null>(null);
  const getCollection = async() => {
        try {
            const response = await fetch(`/api/collections/${params.collectionId}`,{method:"GET"});
            const collection = await response.json();
            setCollection(collection);
        } catch (error) {
            console.log('[collection_GET]',error)
        }
  }
  useEffect(()=>{getCollection()},[])
  return (
    <div>{collection? <CollectionForm initialData={collection}/>:<Loader/>}</div>
  )
}

export default CollectionDetails