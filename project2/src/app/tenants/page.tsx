'use client';

import { useSearchParams } from "next/navigation"
import { useState } from "react";

enum formStatusStates {
  INACTIVE = "inactive",
  SUCCESS = "success",
  ERROR = "error"
}

function formStatusHeader(status: formStatusStates){
  if(status == formStatusStates.SUCCESS){
    return (
      <div className="bg-green-300 text-black">
        Your request has been submitted.
      </div>
    )
  } else if(status == formStatusStates.ERROR){
    return (
      <div className="bg-red-300 text-black">
        There was an error submitting your request.
      </div>
    )
  }
}

export default function TenantDashboard() {
  const tenantId = useSearchParams().get("id")
  const [formStatus, setFormStatus] = useState<formStatusStates>(formStatusStates.INACTIVE)

  return (
    <div>
      <h1 className="text-3xl font-bold">Create a new maintenance request</h1>

      {formStatus !== formStatusStates.INACTIVE ? formStatusHeader(formStatus) : null}

      <div className="bg-slate-400 p-5">
        <form onSubmit={(e) => {
          e.preventDefault()
          console.log("Pretending to submit the form")
          setFormStatus(formStatusStates.SUCCESS)
        }}>
          <div className="my-2">
            <label htmlFor="area">Problem Area</label>
            <input id="area" name="area"></input>
          </div>

          <div className="my-2">
            <label htmlFor="description">Problem Description</label>
            <input id="description" name="description"></input>
          </div>

          <div className="my-2">
            <label htmlFor="photo">Photo (optional)</label>
            <input id="photo" name="photo" type="file"></input>
          </div>

          <button type="submit" className="block bg-orange-500 px-2 my-1 rounded-lg">Submit request</button>
        </form>
      </div>
    </div>
  )
}