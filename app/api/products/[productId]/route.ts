import Collection from "@/lib/models/collection";
import Product from "@/lib/models/product";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest,{params}:{params:{productId:string}}) => {
    console.log("product",params.productId)

    try {
        await connectDB();
        const product = await Product.findById(params.productId).sort({createAt:"desc"}).populate({path:"collections",model:Collection});
        if (!product) {
            return new NextResponse(JSON.stringify({message:'Product not found by this id'}),{status:404})
        }
        return new NextResponse (JSON.stringify(product),{
          status:200,
          headers: {
            "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
          
        )
    } catch (error) {
        console.log('[product_GET] ',error);
        return new NextResponse('Internal Error',{status:500})
    }
}

// export const POST = async(req:NextRequest,{params}:{params:{productId:string}}) => {
//     try {
//         const {userId} = auth();
//           if (!userId) {
//             return new NextResponse("Unauthorized",{status:401})
//           }
//           await connectDB();
//           const {
//             title,
//             description,
//             media,
//             category,
//             collections,
//             tags,
//             sizes,
//             colors,
//             price,
//             expense,
//           } = await req.json();
//           if (!title || !description || !media || !category || !price || !expense) {
//             return new NextResponse("Not enough data to create a product", {
//               status: 400,
//             });
//           }
//           let product = await Product.findById(params.productId);
//           const addedCollections = collections.filter((collectionId:string) => !product.collections.includes(collectionId));
//           const removedCollections = product.collections.filter((collectionId:string) => !collections.includes(collectionId));

//           await Promise.all([
//             ...addedCollections.map((collectionId:string)=>Collection.findByIdAndUpdate(collectionId,{
//                 $push:{products:product._id}
//             })),
//             ...removedCollections.map((collectionId:string) => Collection.findByIdAndUpdate(collectionId,{
//                 $pull:{products:product._id}
//             }))
//           ])
//           const updatedProduct = await Product.findByIdAndUpdate(
//             product._id,
//             {
//               title,
//               description,
//               media,
//               category,
//               collections,
//               tags,
//               sizes,
//               colors,
//               price,
//               expense,
//             },
//             { new: true }
//           ).populate({ path: "collections", model: Collection });
      
//           await updatedProduct.save();
      
//           return NextResponse.json(updatedProduct, { status: 200 });
//     } catch (error) {
//         console.log('[product_POST_UPDATE] ',error);
//         return new NextResponse('Internal Error',{status:500})
//     }
// }
export const POST = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
  ) => {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      await connectDB();
  
      const product = await Product.findById(params.productId);
  
      if (!product) {
        return new NextResponse(
          JSON.stringify({ message: "Product not found" }),
          { status: 404 }
        );
      }
  
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
        return new NextResponse("Not enough data to create a new product", {
          status: 400,
        });
      }
  
      const addedCollections = collections.filter(
        (collectionId: string) => !product.collections.includes(collectionId)
      );
  
      const removedCollections = product.collections.filter(
        (collectionId: string) => !collections.includes(collectionId.toString())
      );
      console.log("req collections",collections);
      console.log("Added collections",addedCollections);
      console.log("Removed collections",removedCollections);
      console.log("Product collections",product.collections);
      
      addedCollections.forEach(async(collectionId:string)=>{
            const collection = await Collection.findById(collectionId);
            collection.products.push(product._id);
            await collection.save();
      })
      removedCollections.forEach(async(collectionId:string) => {
        const collection = await Collection.findById(collectionId);
        collection.products.splice(collection.products.indexOf(product._id),1)
        await collection.save();

      })
    //   // Update collections
    //   await Promise.all([
    //     // Update added collections with this product
    //     ...addedCollections.map((collectionId: string) =>
    //       Collection.findByIdAndUpdate(collectionId, {
    //         $push: { products: product._id },
    //       })
    //     ),
        
    //     // Update removed collections without this product
    //     ...removedCollections.map((collectionId: string) =>
    //       Collection.findByIdAndUpdate(collectionId, {
    //         $pull: { products: product._id },
    //       })
    //     ),
    //   ]);
  
      // Update product
      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        {
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
        },
        { new: true }
      ).populate({ path: "collections", model: Collection });
  
      await updatedProduct.save();
  
      return NextResponse.json(updatedProduct, { status: 200 });
    } catch (err) {
      console.log("[productId_POST]", err);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  



  




export const DELETE = async(req:NextRequest,{params}:{params:{productId:string}}) => {
    try {
        const {userId} = auth();
        if (!userId) {
            return new NextResponse("Unauthorized",{status:401})
        }
        const product = await Product.findById(params.productId);
        if (!product) {
            return new NextResponse(
              JSON.stringify({ message: "Product not found" }),
              { status: 404 }
            );
          }
      
        await Product.findByIdAndDelete(product._id);
        await Promise.all(product.collections.map((collectionId:string) => Collection.findByIdAndUpdate(collectionId,{$pull:{products:product._id}})))
        return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
            status: 200,
          });
    } catch (error) {
        console.log('[product_DELETE] ',error);
        return new NextResponse('Internal Error',{status:500})
    }
}

export const dynamic = "force-dynamic";