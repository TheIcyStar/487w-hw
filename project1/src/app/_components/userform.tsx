'use client'

import { api } from "~/trpc/react"

export function UserForm({ refetchCB }: {refetchCB: () => void}): JSX.Element {
    const utils = api.useUtils()
    const upsertUser = api.users.upsert.useMutation({
        onSuccess: async () => {
            await utils.users.invalidate()
            refetchCB()
        }
    })

    return (
        <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg mt-5">
            <p className="text-xl font-bold">Add/update a user</p>

            <form
                onSubmit={(e) => {
                    //I know that swipeform.tsx had a different submission style through react state
                    //But I'm doing userform second and want to try a different method of submitting, as keeping track of three states seems silly
                    //First method is from Jack Herrington's "tRPC + NextJS App Router = Simple Typesafe APIs" on YT
                    //Second (this) method is from create t3 app trpc usage docs
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    

                    upsertUser.mutate({
                        userId: Number(formData.get("student-id")),
                        role: formData.get("role") as "Student" | "Faculty" | "Staff" | "Janitor",
                        active: formData.get("active") === "on"
                    })
                }}
            >
                <label htmlFor="student-id">Student ID: </label>
                <input type="number" id="student-id" name="student-id"></input>

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
                    <input type="checkbox" id="active" name="active" defaultChecked></input>
                </div>

                <input type="submit" value="Apply" className="block bg-yellow-300 rounded-lg px-3 py-1 mt-3 hover:bg-yellow-500 hover:cursor-pointer"></input>
            </form>
        </div>

    )
}