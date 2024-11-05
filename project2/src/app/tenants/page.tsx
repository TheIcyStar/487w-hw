'use client';

import { useSearchParams } from "next/navigation"
import { useState } from "react";
import { api } from "~/trpc/react"

type bannerType = {
  message: string,
  type: "SUCCESS" | "ERROR" | "HIDDEN"
}

function formStatusHeader(bannerInfo: bannerType){
  if(bannerInfo.type === "HIDDEN"){ return }

  return (
    <div className={bannerInfo.type === "SUCCESS" ? "bg-green-400" : "bg-red-400"}>
      {bannerInfo.message}
    </div>
  )
}

export default function TenantDashboard() {
  const tenantId = Number(useSearchParams().get("id"))
  const [bannerInfo, setBannerInfo] = useState<bannerType>({ message: "", type: "HIDDEN"})
  const [imageData, setImageData] = useState<string>("")
  const createRequest = api.requests.create.useMutation({

    onSuccess: async () => {
      setBannerInfo({message: "Your maintenance request has been submitted", type: "SUCCESS"})
      setTimeout(() => {setBannerInfo({message: "", type: "HIDDEN"})}, 10000) //remove after 10s
    },

    onError: async (err) => {
      setBannerInfo({message: "There was an error submitting your request", type: "ERROR"})
      setTimeout(() => {setBannerInfo({message: "", type: "HIDDEN"})}, 10000)
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold">Create a new maintenance request</h1>

      {bannerInfo.type !== "HIDDEN" ? formStatusHeader(bannerInfo) : null}

      <div className="bg-slate-400 p-5">
        <form onSubmit={async (e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)

          createRequest.mutate({
            tenantId: tenantId,
            area: formData.get("area") as string,
            description: formData.get("description") as string,
            imageURI: imageData
          })

        }}>
          <div className="my-2">
            <label htmlFor="area">Problem Area</label>
            <input name="area"></input>
          </div>

          <div className="my-2">
            <label htmlFor="description">Problem Description</label>
            <input name="description"></input>
          </div>

          <div className="my-2">
            <label htmlFor="photo">Photo (optional)</label>
            <input
              name="photo"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const files = e.target.files
                if(!files?.[0]|| (files[0].type !== "image/png" && files[0].type !== "image/jpeg")){
                  return
                }

                const reader = new FileReader()
                reader.onload = () => {
                  console.log(reader.result)
                  setImageData(reader.result as string)
                }
                reader.readAsDataURL(files[0])
              }}
            ></input>
          </div>

          <button type="submit" className="block bg-orange-500 px-2 my-1 rounded-lg">Submit request</button>
        </form>
      </div>
    </div>
  )
}