"use client"
import React, { useState } from 'react';

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from '@/components/ui/command';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
  

interface MultiSelectProps{
    placeholder:string;
    collections:CollectionType[];
    value:string[];
    onChange:(_id:string) => void;
    onRemove:(_id:string) => void;
}
const MultiSelect:React.FC<MultiSelectProps> = ({placeholder,collections,value,onChange,onRemove}) => {
    const [open,setOpen] = useState(false);
    const [inputValue,setInputValue] = useState('');
    let selected:CollectionType[];
    
    if (value.length === 0) {
        selected = []
    }

    selected = value.map((id)=> collections.find((collection)=>collection._id === id)) as CollectionType[];
    let selectables = collections.filter((collection)=> !selected.includes(collection))
    console.log("mdsc",value)
  return (
    <Command className="overflow-visible bg-white">
        <div className="flex gap-1 flex-wrap border rounded-md">
            {selected.map((item)=><Badge key={item._id}>
                {item.title}
                <button type="button" className="ml-1 hover:text-red-1" onClick={() => onRemove(item._id)}>
                <X className="h-3 w-3" />
            </button>
            </Badge>)}
        </div>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onBlur={()=>setOpen(false)}
            onFocus={()=>setOpen(true)}
            onValueChange={setInputValue}
          />
          <div className="relative mt-2">
             {open &&  <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
                 {selectables.map((collection)=>(
                    <CommandItem
                    key={collection._id}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      console.log(1)
                      onChange(collection._id);
                      setInputValue("");
                    }}
                    className="hover:bg-grey-2 cursor-pointer"
                  >
                    {collection.title}
                  </CommandItem>
                 ))}
              </CommandGroup>}
          </div>
    </Command>
  )
}

export default MultiSelect