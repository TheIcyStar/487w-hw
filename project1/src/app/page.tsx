'use client'

import React from "react"
import { api } from "~/trpc/react"

import { UserTable } from "./_components/usertable"
import { SwipeTable } from "./_components/swipestable"
import { SwipeForm } from "./_components/swipeform" 
import { UserForm } from "./_components/userform"

export default function Home() {
  // const [dateFilter, setDateFilter] = React.useState<Date | undefined>()
  // const [userIdFilter, setUserIdFilter] = React.useState<number | undefined>()
  // const [timeRangeFilter, setTimeRangeFilter] = React.useState<{start: Date, end: Date} | undefined>()

  const {data: swipes, refetch: refetchSwipes } = api.swipes.getLatest.useQuery()
  const {data: users, refetch: refetchUsers } = api.users.getLatest.useQuery()


  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#053c5e] to-[#021927] font-sans text-black">
      <div className="container flex gap-10 px-10 py-16">

        <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg ">
          <p className="text-xl font-bold">Latest swipes</p>
          <SwipeTable LogList={swipes} ></SwipeTable>
        </div>

        <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg ">
          <p className="text-xl font-bold">User List</p>
          <p>Filter Date</p>
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
