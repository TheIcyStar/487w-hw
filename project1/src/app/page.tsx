'use client'

import React from "react"
import { api } from "~/trpc/react"

import { UserTable } from "./_components/usertable"
import { SwipeTable } from "./_components/swipestable"
import { SwipeForm } from "./_components/swipeform" 
import { UserForm } from "./_components/userform"

export default function Home() {
  const [userIdFilter, setUserIdFilter] = React.useState<number | null>(null)
  const [startTimeFilter, setStartTimeFilter] = React.useState<string | null>(null)
  const [endTimeFilter, setEndTimeFilter] = React.useState<string | null>(null)

  const {data: swipes, refetch: refetchSwipes } = api.swipes.getLatest.useQuery({
    userId: userIdFilter ? userIdFilter : 0,
    startDateTime: startTimeFilter ? startTimeFilter : undefined,
    endDateTime: endTimeFilter ? endTimeFilter : undefined
  })
  const {data: users, refetch: refetchUsers } = api.users.getLatest.useQuery()

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#053c5e] to-[#021927] font-sans text-black">
      <div className="container flex gap-10 px-10 py-16">

        <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg ">
          <p className="text-xl font-bold">Latest swipes</p>

          <div>
            <label htmlFor="idFilter">Filter by ID: </label>
            <input
              type="number"
              id="idFilter"
              name="idFilter"
              value={userIdFilter ? userIdFilter : undefined}
              onChange={(e) => setUserIdFilter(Number(e.target.value))} 
            ></input>
            {/* <button 
              className="bg-yellow-300 rounded-lg px-3 py-1 ml-3 hover:bg-yellow-500 hover:cursor-pointer"
              onClick={() => setUserIdFilter(null)}
            >Clear</button> */}
          </div>
          <div className="pt-2">
            <label>Start from:</label>
            <input
              type="datetime-local"
              id="startDateTimeInput"
              name="startDateTimeInput"
              value={startTimeFilter ? startTimeFilter : undefined}
              onChange={(e) => setStartTimeFilter(e.target.value)}
            ></input>
          </div>
          <div className="pt-2">
            <label>End at: </label>
            <input
              type="datetime-local"
              id="endDateTimeInput"
              name="endDateTimeInput"
              value={endTimeFilter ? endTimeFilter : undefined}
              onChange={(e) => setEndTimeFilter(e.target.value)}
            ></input>
          </div>

          <SwipeTable LogList={swipes} ></SwipeTable>
        </div>

        <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg ">
          <p className="text-xl font-bold">User List</p>
          <UserTable LogList={users}></UserTable>
        </div>

        <div>
          <SwipeForm refetchCB={refetchSwipes}></SwipeForm>
          <UserForm refetchCB={refetchUsers}></UserForm>
          
        </div>

      </div>
    </main>
  )
}
