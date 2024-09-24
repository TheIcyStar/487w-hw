'use client'

import { useState } from "react"
import { api } from "~/trpc/react"

export function SwipeForm({ refetchCB }: {refetchCB: () => void}): JSX.Element {
    const utils = api.useUtils()
    const [inputId, setInputId] = useState<string>('')
    const createSwipe = api.swipes.create.useMutation({
        onSuccess: async () => {
            await utils.swipes.invalidate()
            refetchCB()
            setInputId('')
        }
    })


    return (
        <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg ">
            <p className="text-xl font-bold">Manual SUN Lab sign in</p>

            <div>
                <label htmlFor="student-id">Student ID: </label>
                <input
                    type="number"
                    id="student-id"
                    name="studentid"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                ></input>

                <button
                    className="block bg-yellow-300 rounded-lg px-3 py-1 mt-3 hover:bg-yellow-500 hover:cursor-pointer"
                    type="submit"
                    disabled={createSwipe.isPending}
                    onClick={async () => {
                        if(inputId === ''){
                            return
                        }

                        createSwipe.mutate({ userId: Number(inputId) })
                    }}
                >
                    {createSwipe.isPending ? "Submitting..." : "Send ID to log"}
                </button>
            </div>
        </div>

    )
}