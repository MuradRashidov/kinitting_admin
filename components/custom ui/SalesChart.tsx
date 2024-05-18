"use client"
import {Line, LineChart, ResponsiveContainer,CartesianGrid, YAxis, XAxis, Tooltip} from "recharts"

const SalesChart = ({data}:{data:any}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart className="w-full h-full" data={data} margin={{top:5,right:20,bottom:5,left:0}}>
            <Line type="monotone"  dataKey="sales"  stroke="#8884d8"/>
            <CartesianGrid strokeDasharray="5 5" stroke="#ccc"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
        </LineChart>
    </ResponsiveContainer>
  )  
}

export default SalesChart