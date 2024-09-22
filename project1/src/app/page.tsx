// import Link from "next/link";

import { db } from "../server/db"
import { api, HydrateClient } from "~/trpc/server";
import { UserTable } from "./_components/usertable";
import { SwipeTable } from "./_components/swipestable";

export default async function Home() {

  const users = await db.user.findMany()
  const swipes = await db.swipeLog.findMany()

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#053c5e] to-[#021927] font-sans text-black">
        <div className="container flex items-center gap-10 py-16">

          <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg ">
            <p className="text-xl font-bold">Manual SUN Lab sign in</p>
            <form> {/* todo: submit url */}
              <label htmlFor="student-id">Student ID: </label>
              <input type="number" id="student-id" name="studentid"></input>
              <input type="submit" value="Send ID to log" className="block bg-yellow-300 rounded-lg px-3 py-1 mt-3 hover:bg-yellow-500 hover:cursor-pointer"></input>
            </form>
          </div>

          <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg ">
            <p className="text-xl font-bold">Latest swipes</p>
            <SwipeTable LogList={swipes} ></SwipeTable>
          </div>

          <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg ">
            <p className="text-xl font-bold">User List</p>
            <UserTable LogList={users}></UserTable>
          </div>

        </div>
      </main>
    </HydrateClient>
  );
}
