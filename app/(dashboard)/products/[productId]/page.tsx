"use client"
import Loader from '@/components/custom ui/Loader';
import ProductForm from '@/components/products/ProductForm';
import React, { useEffect, useState } from 'react'

const ProductDetails = ({params}:{params:{productId:string}}) => {
  const [loading,setLoading] = useState(true);
  const [product,setProduct] = useState<ProductType | null>(null);
  const getProductById = async() => {
        const res = await fetch(`/api/products/${params.productId}`,{method:"GET"});
        const data = await res.json();
        setProduct(data);
        setLoading(false);
  }
  useEffect(()=>{getProductById()},[])
  console.log('PRODUCT',params.productId);
  
  return (
    <div>
        {
            loading? <Loader/>:<ProductForm initialData={product}/>
        }
        
    </div>
  )
}

export default ProductDetails