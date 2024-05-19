"use client"
import { navLinks } from '@/lib/constants'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const TopBar = () => {
  const [dropdownMenu,setDropdownMenu] = useState(true);
  const pathname = usePathname();
  return (
    <div className='sticky top-0 w-full flex justify-between bg-blue-2 items-center px-8 py-4 shadow-xl z-20 lg:hidden'>
        {/* <Image className='rounded-md' src='/logo.png' alt='logo' width={130} height={50}/> */}
         <p className="border p-2 rounded">knitty<span className="text-base-bold text-red-1">NG</span></p>
        <div className='flex gap-8 max-md:hidden'>
            {
              navLinks.map((link,index)=>(
                <Link className={`flex gap-4 text-body-medium ${pathname===link.url?"text-blue-1":"text-grey-1"}`} href={link.url} key={link.label}>
                  <p>{link.label}</p>
                </Link>
              ))
            }
        </div>

        <div className='relative flex gap-4 items-center'>
          <Menu onClick={()=>setDropdownMenu(!dropdownMenu)} className='cursor-pointer md:hidden'/>
              {
                !dropdownMenu && (
                  <div className='absolute top-10 right-6 p-5 gap-8 bg-white shadow-xl rounded-xl flex flex-col'>
            {
                           navLinks.map((link,index)=>(
                            <Link className={`flex gap-4 text-body-medium  ${pathname===link.url?"text-blue-1":"text-grey-1"}`} href={link.url} key={link.label}>
                              {link.icon}
                              <p>{link.label}</p>
                            </Link>
                          ))
            }
        </div>
                )
              }
          <UserButton/>
        </div>
    </div>
  )
}

export default TopBar