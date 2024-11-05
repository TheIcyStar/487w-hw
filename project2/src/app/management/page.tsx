'use client'

import React, { useState } from "react"
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

export default function ManagementDashboard(){
  const [bannerInfo, setBannerInfo] = useState<bannerType>({ message: "", type: "HIDDEN"})
  const utils = api.useUtils()

  //useMutations and banner display/autohiders
  const createTenant = api.users.create.useMutation({

    onSuccess: async () => {
      await utils.users.invalidate()

      setBannerInfo({message: "New tenant created successfully", type: "SUCCESS"})
      setTimeout(() => {setBannerInfo({message: "", type: "HIDDEN"})}, 10000) //remove after 10s
    },

    onError: async (err) => {
      setBannerInfo({message: err.message, type: "ERROR"})
      setTimeout(() => {setBannerInfo({message: "", type: "HIDDEN"})}, 10000)
    }

  })
  const setTenantApartment = api.users.updateApartment.useMutation({

    onSuccess: async () => {
      await utils.users.invalidate()
      setBannerInfo({message: "Tenant apartment set successfully", type: "SUCCESS"})
      setTimeout(() => {setBannerInfo({message: "", type: "HIDDEN"})}, 10000)
    },

    onError: async (err) => {
      setBannerInfo({message: err.message, type: "ERROR"})
      setTimeout(() => {setBannerInfo({message: "", type: "HIDDEN"})}, 10000)
    }

  })
  const deleteTenant = api.users.delete.useMutation({

    onSuccess: async () => {
      await utils.users.invalidate()
      setBannerInfo({message: "Tenant deleted", type: "SUCCESS"})
      setTimeout(() => {setBannerInfo({message: "", type: "HIDDEN"})}, 10000)
    },

    onError: async (err) => {
      setBannerInfo({message: err.message, type: "ERROR"})
      setTimeout(() => {setBannerInfo({message: "", type: "HIDDEN"})}, 10000)
    }

  })


  return (
    <div>
      {bannerInfo.type !== "HIDDEN" ? formStatusHeader(bannerInfo) : null}

      <div className="bg-slate-300 rounded-lg shadow-lg">
        <p>Add a new tenant</p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)

            createTenant.mutate({
              name: formData.get("name") as string,
              phone: BigInt(formData.get("phone") as string),
              email: formData.get("email") as string,
              checkIn: new Date(formData.get("checkIn") as string),
              checkOut: new Date(formData.get("checkOut") as string),
              apartment: Number(formData.get("apartment")),
              role: "TENANT"
            })

            e.currentTarget.reset()
          }}
        >
          <label htmlFor="name">Name: </label>
          <input name="name"></input>

          <label htmlFor="phone">Phone: </label>
          <input name="phone" type="number"></input>

          <label htmlFor="email">Email: </label>
          <input name="email"></input>

          <label htmlFor="apartment">Apartment: </label>
          <input name="apartment" type="number"></input>

          <label htmlFor="checkIn">Check in: </label>
          <input name="checkIn" type="date"></input>

          <label htmlFor="checkOut">Check out: </label>
          <input name="checkOut" type="date"></input>

          <button type="submit" className="block bg-orange-500 px-2 my-1 rounded-lg">Create tenant</button>
        </form>
      </div>
      <br/>
      <br/>


      <div className="bg-slate-300 rounded-lg shadow-lg">
        <p>Set tenant&apos;s apartment</p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)

            setTenantApartment.mutate({
              userId: Number(formData.get("tenantId")),
              apartment: Number(formData.get("apartment"))
            })

            e.currentTarget.reset()
          }}
        >

          <label htmlFor="tenantId">Tenant id: </label>
          <input name="tenantId" type="number"></input>

          <label htmlFor="apartment">Apartment: </label>
          <input name="apartment" type="number"></input>

          <button type="submit" className="block bg-orange-500 px-2 my-1 rounded-lg">Set apartment</button>
        </form>
      </div>
      <br/>
      <br/>


      <div className="bg-slate-300 rounded-lg shadow-lg">
        <p>Delete tenant</p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)

            deleteTenant.mutate({
              userId: Number(formData.get("tenantId")),
            })

            e.currentTarget.reset()
          }}
        >
          <label htmlFor="tenantId">Tenant id: </label>
          <input name="tenantId" type="number"></input>

          <button type="submit" className="block bg-red-400 px-2 my-1 rounded-lg">Delete tenant</button>
        </form>
      </div>

    </div>
  )
}