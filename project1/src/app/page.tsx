
import React from "react"
import { db } from "../server/db"
import { api, HydrateClient } from "~/trpc/server"
import { Prisma } from "@prisma/client"

import { UserTable } from "./_components/usertable"
import { SwipeTable } from "./_components/swipestable"
import { SwipeForm } from "./_components/swipeform" 

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

            {/* <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg ">
              <p className="text-xl font-bold">Manual SUN Lab sign in</p>
              <form>
                <label htmlFor="student-id">Student ID: </label>
                <input type="number" id="student-id" name="studentid"></input>

                <input type="submit" value="Send ID to log" className="block bg-yellow-300 rounded-lg px-3 py-1 mt-3 hover:bg-yellow-500 hover:cursor-pointer"></input>
              </form>
            </div> */}


            <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg mt-5">
              <p className="text-xl font-bold">Add/update a user</p>
              {/* <form>
                <label htmlFor="student-id">Student ID: </label>
                <input type="number" id="student-id" name="studentid"></input>

                <div>
                  <label htmlFor="role">Role: </label>
                  <select id="role" name="role">
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Staff">Staff</option>
                    <option value="Janitor">Janitor</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="active">Active: </label>
                  <input type="checkbox" id="active" name="active" checked></input>
                </div>

                <input type="submit" value="Apply" className="block bg-yellow-300 rounded-lg px-3 py-1 mt-3 hover:bg-yellow-500 hover:cursor-pointer"></input>
              </form> */}
            </div>
          </div>

        </div>
      </main>
    </HydrateClient>
  );
}
