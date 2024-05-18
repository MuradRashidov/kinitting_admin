"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
interface MultitextProps {
  placeholder:string;
  value:string[];
  onChange:(teg:string)=>void;
  onRemove:(teg:string)=>void;
}
const Multitext:React.FC<MultitextProps> = ({placeholder,value,onChange,onRemove}) => {
  const [inputValue,setInputValue] = useState("");
  const addValue = (newTag:string) => {
      onChange(newTag)
      setInputValue("")
  }
  return (
    <div>
      <Input 
        value={inputValue} 
        placeholder={placeholder}
        onChange={(e)=>setInputValue(e.target.value)}
        onKeyDown={(event)=>{
          if (event.key === "Enter") {
            event.preventDefault();
            addValue(inputValue)
          }
        }}
      />
      
      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index} className="bg-grey-1 text-white">
            {item}
            <Button
              className="ml-1 rounded-full outline-none hover:bg-red-1"  size='sm'
              onClick={() => onRemove(item)}
              type="button"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>      
    </div>
  )
}

export default Multitext