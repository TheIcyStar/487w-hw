/* eslint-disable @next/next/no-img-element */
'use client'

import React from "react"
import type { Prisma } from '@prisma/client'

function RequestListLine(item: Prisma.RequestUncheckedCreateInput, mutateRequest: (id: number, status: "PENDING" | "COMPLETED") => Promise<void>){
  return (
    <tr key={item.id}>
      <td>
        <select
          id={item.id+"-statusSelector"}
          name={item.id+"-statusSelector"}
          value={item.status}
          onChange={async (e) => {
            if(!item.id){ return }                                                        // Make the type
            if(e.target.value !== "PENDING" && e.target.value !== "COMPLETED") { return } // checker happy c:

            await mutateRequest(item.id, e.target.value)
            window.location.reload() //The wonderfully terrible solution to updating the requestlist with new information 🤠
          }}
        >
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </td>
      <td>{item.id}</td>
      <td>{item.apartment}</td>
      <td>{item.area}</td>
      <td>{item.description}</td>
      <td>{item.createdAt?.toLocaleString()}</td>
      <td><img src={item.imageURI} alt="" style={{width: "100px", height: "100px"}}/></td>
    </tr>
  )
}

export default function RequestList({ requestList, mutateRequest }: {requestList: Prisma.RequestUncheckedCreateInput[] | undefined, mutateRequest: (id: number, status: "PENDING" | "COMPLETED") => Promise<void>}){
  const entries: JSX.Element[] = []

  if(requestList){
    for(const request of requestList){
      entries.push(RequestListLine(request, mutateRequest))
    }
  }

  return (
    <table className="bg-slate-400 border-spacing-3">
      <tbody>
        <tr>
          <th className="px-5">Status</th>
          <th className="px-5">ID</th>
          <th className="px-5">Apartment</th>
          <th className="px-5">Area</th>
          <th className="px-5">Description</th>
          <th className="px-5">Created at</th>
          <th className="px-5">Image</th>
        </tr>
        {entries}
      </tbody>
    </table>
  )
}