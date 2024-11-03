'use client';

import Link from "next/link"
import { useState } from "react";

export default function Home() {
  const [tenantId, setTenantId] = useState('');

  return (
    <main className="flex min-h-screen justify-center bg-white font-sans text-black">
      <div className="bg-gray-300 px-5">
        <p>User Login</p>

        <div>
          <label htmlFor="tenantId">Log in with ID: </label>
          <input id="tenantId" name="tenantId" placeholder="Tenant ID" onChange={(e) => { setTenantId(parseInt(e.target.value) ? e.target.value : "")}}></input>
          
          <Link 
            href={`/tenants?id=${tenantId}`} 
            className={`${parseInt(tenantId) ? "bg-orange-500" : "bg-gray-600"} p-2 my-2 rounded-lg`}
          >Login as Tenant</Link>
        </div>
        <Link href="/maintenance" className="block bg-orange-500 p-2 my-2 rounded-lg">Login as Maintenance</Link>
        <Link href="/management" className="block bg-orange-500 p-2 my-2 rounded-lg">Login as Management</Link>
      </div>
    </main>
  )
}
