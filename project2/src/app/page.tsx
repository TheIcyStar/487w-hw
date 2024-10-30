export default function Home() {
  return (
    <main className="flex min-h-screen justify-center bg-white font-sans text-black">
      <div className="bg-gray-300 px-5">
        <p>User Login</p>

        <input id="userId" name="userId" placeholder="User Id" ></input>

        <button className="block">Login as Tenant</button>
        <button className="block">Login as Maintenance</button>
        <button className="block">Login as Management</button>
      </div>
    </main>
  )
}
