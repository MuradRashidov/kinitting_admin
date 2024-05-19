import { DataTable } from '@/components/custom ui/DataTable';
import { columns } from '@/components/customers/CustomerColumns';
import { Separator } from '@/components/ui/separator';
import Customer from '@/lib/models/customer'
import React from 'react'

const Customers = async() => {
  const customers = await Customer.find().sort({createdAt:"desc"});
  
  return customers && customers.length>0? (

            <div className='px-10 py-5'>
            <p className='text-heading2-bold'>Customers</p>
            <Separator className='bg-grey-1 my-5' />
            <DataTable columns={columns} data={customers} searchKey='name'/>
            </div>
          ):<>There is no customer</>
}
export const dynamic = "force-dynamic";

export default Customers