import Collection from "@/lib/models/collection";
import Product from "@/lib/models/product";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest,{params}:{params:{collectionId:string}}) => {
    try {
        await connectDB();
        const collection = await Collection.findById(params.collectionId).populate({path:"products",model:Product});
        if (!collection) {
            return new NextResponse(JSON.stringify({message:'Collection not found by this id'}),{status:404})
        }
        return NextResponse.json(collection,{status:200})
    } catch (error) {
        console.log('[collectionId_GET] ',error);
        return new NextResponse('Internal Error',{status:500})
    }
}

export const POST = async(req:NextRequest,{params}:{params:{collectionId:string}}) => {
        try {
            const userId = auth();
            if (!userId) {
                return new NextResponse('Unothorized',{status:401})
            }
            await connectDB();
            const {title,description,image} = await req.json();
            if (!title || !image){
                return new NextResponse('title and image are required',{status:500})
            }
            const collection = await Collection.findByIdAndUpdate(params.collectionId,{
                title,
                description,
                image
            },{new:true});
            if (!collection) {
                return new NextResponse("Collection not found", { status: 404 });
            }            
            await collection.save();
            return NextResponse.json(collection, { status: 200 });

        } catch (error) {
            console.log('[collectionId_UPDATE] ',error);
            return new NextResponse('Internal Error',{status:500})
        }
}

export const DELETE = async(req:NextRequest,{params}:{params:{collectionId:string}}) => {
     try {
        const userId = auth();
        if (!userId) {
            return new NextResponse('Unothorized',{status:401})
        }
        await connectDB();
        await Collection.findByIdAndDelete(params.collectionId);
        await Product.updateMany({collections:params.collectionId},{$pull:{collections:params.collectionId}});
        return new NextResponse('Collection has deleted',{status:200})
     } catch (error) {
            console.log('[collectionId_DELETE] ',error);
            return new NextResponse('Internal Error',{status:500})
       }
}
export const dynamic = "force-dynamic";