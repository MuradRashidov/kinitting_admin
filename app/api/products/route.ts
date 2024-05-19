import Collection from "@/lib/models/collection";
import Product from "@/lib/models/product";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest) => {
        try {
          const {userId} = auth();
          if (!userId) {
            return new NextResponse("Unauthorized",{status:401})
          }
          await connectDB();
          const {
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
          } = await req.json();
          if (!title || !description || !media || !category || !price || !expense) {
            return new NextResponse("Not enough data to create a product", {
              status: 400,
            });
          }
          const product = await Product.create({
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
          });
          if (collections) {
            for(const collectionId of collections){
                const collection = await Collection.findById(collectionId);
                if(collection){
                  collection.products.push(product._id);
                  await collection.save();
                }
            }
          }
          await product.save();
          return NextResponse.json(product,{status:200})
        } catch (error) {
           console.log('[products_POST]',error);
           return new NextResponse("Internal Error",{status:500});
        }
}
export const dynamic = "force-dynamic";
export const GET = async (req:NextRequest) => {
    try {
      const { searchParams } = req.nextUrl;
      const searchQuery = searchParams.get('query');
      console.log("Query parameter: ", searchQuery);
      let filter;
      if (searchQuery === "undefined") {
        filter = {};
      }
      else {
        filter = {
          $or:[
            {title:{$regex:searchQuery,$options:"i"}},
            {category:{$regex:searchQuery,$options:"i"}},
            {tags:{$in:[new RegExp(searchQuery as string,"i")]}},
          ]
        }
      }
      await connectDB();
      const products = await Product.find(searchQuery?filter:{}).sort({createdAt:"desc"}).populate({path:'collections',model:Collection})
      return NextResponse.json(products,{
        status:200,
        headers: {
          "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        }

      })
    } catch (error) {
      console.log('[products_get]',error);
      return new NextResponse("Internal Error",{status:500});
    }
}

