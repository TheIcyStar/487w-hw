
import React from "react"
import { db } from "../server/db"
import { api, HydrateClient } from "~/trpc/server"
import { Prisma } from "@prisma/client"

import { UserTable } from "./_components/usertable"
import { SwipeTable } from "./_components/swipestable"
import { SwipeForm } from "./_components/swipeform" 
import { UserForm } from "./_components/userform"

export default async function Home() {
  // const [dateFilter, setDateFilter] = React.useState<Date | undefined>()
  // const [userIdFilter, setUserIdFilter] = React.useState<number | undefined>()
  // const [timeRangeFilter, setTimeRangeFilter] = React.useState<{start: Date, end: Date} | undefined>()

  //*
  const users = await db.user.findMany()
  const swipes = await db.swipeLog.findMany()
  //*/
  /*
  const swipes: Prisma.SwipeLogUncheckedCreateInput[] = []
  const users: Prisma.UserUncheckedCreateInput[] = []
  //*/

  return (
    <HydrateClient>
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
            <SwipeForm></SwipeForm>
            <UserForm></UserForm>
            
          </div>

        </div>
      </main>
    </HydrateClient>
  )
}
