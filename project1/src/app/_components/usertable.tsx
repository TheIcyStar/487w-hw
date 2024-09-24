import type { Prisma } from '@prisma/client'

function UserTableLine(UserEntry: Prisma.UserUncheckedCreateInput): JSX.Element{
    return (
        <tr key={UserEntry.id}>
            <td>{UserEntry.id}</td>
            <td>{UserEntry.role}</td>
            <td>{UserEntry.active ? "✅" : "🚫"}</td>
            <td>View</td>
        </tr>
    )
}

export function UserTable({LogList}: {LogList: Prisma.UserUncheckedCreateInput[] | undefined}): JSX.Element {
    const userEntries: JSX.Element[] = [] //TIL you can push to const arrays, makes sense tho

    if(LogList){
        for(const user of LogList){
            userEntries.push(UserTableLine(user))
        }
    }

    return (
        <table>
            <tbody> {/* tbody needed for some reason https://github.com/vercel/next.js/discussions/36754 */}
                <tr>
                    <th>ID</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th>Swipes</th>
                </tr>
                {userEntries}
            </tbody>
        </table>
    )
}