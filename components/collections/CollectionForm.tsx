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
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import Delete from "../custom ui/Delete";

const formSchema = z.object({
    title:z.string().min(2).max(20),
    description:z.string().min(2).max(50),
    image:z.string()
})
type CollectionFormType = {
  initialData?:CollectionType | null
}
const CollectionForm:React.FC<CollectionFormType> = ({initialData}) => {
    const router = useRouter();
    const [isLoading,setIsLoading] = useState(true);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData||{
            title:"",
            description:"",
            image:""
        }
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
        const url = initialData?`/api/collections/${initialData._id}`:`/api/collections`
        const res = await fetch(url,{
            method:"POST",
            body:JSON.stringify(values)
        });
        if(res.ok){
            setIsLoading(false);
            router.push('/collections');
            toast.success(`Collection ${initialData?"updated":"created"}`);
        }
    } catch (error) {
        toast.error('Something went wrong')
        console.log('[collections_POST]',error);
    }
}

  return (
    <div className='p-10'>
        {
          initialData
          ?(<div className='flex justify-between'>
              <p className='text-heading-bold'>Update Collection</p>
              <Delete id={initialData._id}/>
          </div>)
          :(<p className="text-heading-bold">Create Collection</p>)
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload 
                    value={field.value?[field.value]:[]}
                    onChange={(url)=>field.onChange(url)}
                    onRemove={()=>field.onChange("")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-10">
            <Button className='bg-blue-1 text-white' type="submit">Submit</Button>
            <Button 
                className='bg-blue-1 text-white' 
                type="button" onClick={()=>router.push("/collections")}>
                    Discard
            </Button>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default CollectionForm