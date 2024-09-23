'use client'

export default function SwipeForm(): JSX.Element {
    return (
        <div className="bg-sky-100 p-5 rounded-md drop-shadow-lg ">
            <p className="text-xl font-bold">Manual SUN Lab sign in</p>

            <form> {/* todo: submit url */}
                <label htmlFor="student-id">Student ID: </label>
                <input type="number" id="student-id" name="studentid"></input>

                <input type="submit" value="Send ID to log" className="block bg-yellow-300 rounded-lg px-3 py-1 mt-3 hover:bg-yellow-500 hover:cursor-pointer"></input>
            </form>
        </div>

    )
}