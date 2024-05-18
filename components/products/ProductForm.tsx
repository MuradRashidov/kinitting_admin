"use client"
import {z} from "zod";
import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import Delete from "../custom ui/Delete";
import Multitext from "../custom ui/Multitext";
import MultiSelect from "../custom ui/MultiSelect";
import Loader from "../custom ui/Loader";

const formSchema = z.object({
    title:z.string().min(2).max(20),
    description:z.string().min(2).max(500),
    media: z.array(z.string()),
    category: z.string(),
    collections: z.array(z.string()),
    tags: z.array(z.string()),
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    price: z.coerce.number().min(0.1),
    expense: z.coerce.number().min(0.1),
})
interface ProductFormProps{
  initialData?:ProductType | null
}
const ProductForm:React.FC<ProductFormProps> = ({initialData}) => {
    const router = useRouter();
    const [loading,setLoading] = useState(true);
    const [collections,setCollections] = useState<CollectionType[]>([]);
    const getCollections = async () => {
            try {
                const res = await fetch('/api/collections',{method:"GET"});
                const data = await res.json();
                setCollections(data);
                setLoading(false);
            } catch (error) {
                console.log('[Collection_GET]',error)
            }
    }
    useEffect(()=>{getCollections()},[])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData?{...initialData,collections:initialData.collections.map((collection)=>collection._id)}:{
            title: "",
            description: "",
            media: [],
            category: "",
            collections: [],
            tags: [],
            sizes: [],
            colors: [],
            price: 0.1,
            expense: 0.1,
          },
          
        
    });
const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === "Enter") {
   e.preventDefault();
  }
}
const onSubmit = async(values:z.infer<typeof formSchema>) => {
    console.log(values);
    try {
        console.log(1);
        const url = initialData?`/api/products/${initialData._id}`:`/api/products`
        const res = await fetch(url,{
            method:"POST",
            body:JSON.stringify(values)
        });
        if(res.ok){
            setLoading(false);
            router.push('/products');
            toast.success(`Product ${initialData?"updated":"created"}`);
        }
    } catch (error) {
        toast.error('Something went wrong')
        console.log('[products_POST]',error);
    }
}

  return loading?<Loader/>: (
    <div className='p-10'>
    {
      initialData
      ?(<div className='flex justify-between'>
          <p className='text-heading-bold'>Update Product</p>
          <Delete id={initialData._id}/>
      </div>)
      :(<p className="text-heading-bold">Create Product</p>)
    }
    <Separator className='bg-grey-1 mt-4 mb-7'/>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input onKeyDown={handleKeyPress}  placeholder="Title" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{field.name}</FormLabel>
          <FormControl>
            <Textarea onKeyDown={handleKeyPress}  placeholder="Description" rows={5} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="media"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <ImageUpload 
                value={field.value}
                onChange={(url)=>field.onChange([...field.value,url])}
                onRemove={(url)=>field.onChange((field.value.filter((item)=>item !== url)))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <div className="md:grid md:grid-cols-3 gap-8">
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price (AZN)</FormLabel>
          <FormControl>
            <Input type="number" onKeyDown={handleKeyPress}  placeholder="Price" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="expense"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Expense (AZN)</FormLabel>
          <FormControl>
            <Input type="number" onKeyDown={handleKeyPress}  placeholder="Expense" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Input onKeyDown={handleKeyPress}  placeholder="Category" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <Multitext 
                placeholder='Tags'
                value={field.value}
                onChange={(tag)=>field.onChange([...field.value,tag])}
                onRemove={(tag)=>field.onChange((field.value.filter((item)=>item !== tag)))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {collections.length > 0 && 
       <FormField
       control={form.control}
       name="collections"
       render={({ field }) => (
         <FormItem>
           <FormLabel>Collections</FormLabel>
           <FormControl>
             <MultiSelect 
                 placeholder='Collections'
                 collections={collections}
                 value={field.value}
                 onChange={(_id)=>field.onChange([...field.value,_id])}
                 onRemove={(_id)=>field.onChange((field.value.filter((item)=>item !== _id)))}
             />
           </FormControl>
           <FormMessage />
         </FormItem>
       )}
     />
    }
    <FormField
      control={form.control}
      name="colors"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Colors</FormLabel>
          <FormControl>
            <Multitext 
                placeholder='Colors'
                value={field.value}
                onChange={(color)=>field.onChange([...field.value,color])}
                onRemove={(color)=>field.onChange((field.value.filter((item)=>item !== color)))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="sizes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sizes</FormLabel>
          <FormControl>
            <Multitext 
                placeholder='Sizes'
                value={field.value}
                onChange={(size)=>field.onChange([...field.value,size])}
                onRemove={(size)=>field.onChange((field.value.filter((item)=>item !== size)))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    </div>
    <div className="flex gap-10">
        <Button className='bg-blue-1 text-white' type="submit">Submit</Button>
        <Button 
            className='bg-blue-1 text-white' 
            type="button" onClick={()=>router.push("/products")}>
                Discard
        </Button>
    </div>
  </form>
</Form>
</div>
         )
}

export default ProductForm