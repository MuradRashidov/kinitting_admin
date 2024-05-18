import Collection from "@/lib/models/collection";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
//import  Collection  from "../../../lib/models/collection"
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
   try {
    console.log(1);
    
        const {userId} = auth();
        if (!userId) {
            return new NextResponse('Unauthorized',{status:401})
        }
        await connectDB();
        const {title,description,image} = await req.json();
        if (!title || !image) {
            return new NextResponse('Title and image are required',{status:400})
        }
        const existingCollection = await Collection.findOne({title});
        if (existingCollection) {
            return new NextResponse('Collection is alredy excist',{status:400})

        }
        const newCollection = await Collection.create({
            title,
            description,
            image            
        });

        await newCollection.save();
        return NextResponse.json(newCollection, {status:200})
   } catch (error) {
        console.log('[Collection_POST]',error);
        return new NextResponse('Internal server error',{status:500})
   }
}

export const GET = async(req:NextRequest) => {
    try {
        await connectDB();
        const collections = await Collection.find().sort({createdAt:"desc"});
        return NextResponse.json(collections,{status:200})
    } catch (error) {
        console.log('[collections_GET] ',error);
        return new NextResponse('Internal server error',{status:500})        
    }
}
export const dynamic = "force-dynamic";