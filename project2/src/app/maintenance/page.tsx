'use client'

import React from "react"
import { api } from "~/trpc/react"

import RequestList from "../_components/requestList"

export default function MaintenanceDashboard(){
  const [apartmentFilter, setApartmentFilter] = React.useState<number | null>(null)
  const [areaFilter, setAreaFilter] = React.useState<string | null>(null)
  const [statusFilter, setStatusFilter] = React.useState<"PENDING" | "COMPLETED" | null>(null)
  const [startTimeFilter, setStartTimeFilter] = React.useState<string | null>(null)
  const [endTimeFilter, setEndTimeFilter] = React.useState<string | null>(null)

  const mutateRequestStatus = api.requests.setStatus.useMutation()

  const {data: requests} = api.requests.list.useQuery({
    apartment: apartmentFilter ? apartmentFilter : undefined,
    area: areaFilter ? areaFilter : undefined,
    startDateTime: startTimeFilter ? startTimeFilter : undefined,
    endDateTime: endTimeFilter ? endTimeFilter : undefined,
    status: statusFilter ? statusFilter : undefined
  })

  const setRequestStatus = async (id: number, status: "PENDING" | "COMPLETED") => {
    mutateRequestStatus.mutate({id: id, status: status})
  }

  return (
    <div>

      {/* filters */}
      <div>
        <label htmlFor="statusFilter">Request status: </label>
        <select
          id="statusFilter"
          name="statusFilter"
          value={statusFilter ? statusFilter : undefined}
          onChange={(e) => {
            if(e.target.value === "NONE") {
              setStatusFilter(null)
            } else if(e.target.value === "PENDING") {
              setStatusFilter("PENDING")
            } else if(e.target.value === "COMPLETED") {
              setStatusFilter("COMPLETED")
            }
        }}>
          <option value="NONE">---</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor="apartmentFilter">Apartment number: </label>
        <input
          type="number"
          id="apartmentFilter"
          name="apartmentFilter"
          value={apartmentFilter ? apartmentFilter : undefined}
          onChange={(e) => setApartmentFilter(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <label htmlFor="areaFilter">Area: </label>
        <input
          id="areaFilter"
          name="areaFilter"
          value={areaFilter ? areaFilter : undefined}
          onChange={(e) => setAreaFilter(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Start from:</label>
        <input
          type="datetime-local"
          id="startDateTimeInput"
          name="startDateTimeInput"
          value={startTimeFilter ? startTimeFilter : undefined}
          onChange={(e) => setStartTimeFilter(e.target.value)}
        ></input>
      </div>
      <div>
        <label>End at: </label>
        <input
          type="datetime-local"
          id="endDateTimeInput"
          name="endDateTimeInput"
          value={endTimeFilter ? endTimeFilter : undefined}
          onChange={(e) => setEndTimeFilter(e.target.value)}
        ></input>
      </div>

      <br></br>

      <div>
        <RequestList requestList={requests} mutateRequest={setRequestStatus}></RequestList>

      </div>
    </div>
  )
}