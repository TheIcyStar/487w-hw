import type { Prisma } from '@prisma/client'

function SwipeTableLine(SwipeEntry: Prisma.SwipeLogUncheckedCreateInput): JSX.Element{
    return (
        <tr key={SwipeEntry.id}>
            {/* <td>{SwipeEntry.id}</td> */}
            <td>{SwipeEntry.userId}</td>
            <td>{SwipeEntry.createdAt?.toLocaleString()}</td>
        </tr>
    )
}

export function SwipeTable({LogList}: {LogList: Prisma.SwipeLogUncheckedCreateInput[] | undefined}): JSX.Element {
    const userEntries: JSX.Element[] = []

    if(LogList){
        for(const swipe of LogList){
            userEntries.push(SwipeTableLine(swipe))
        }
    }

    return (
        <table>
            <tbody> {/* tbody needed for some reason https://github.com/vercel/next.js/discussions/36754 */}
                <tr>
                    {/* <th>Swipe #</th> */}
                    <th>User ID</th>
                    <th>Timestamp</th>
                </tr>
                {userEntries}
            </tbody>
        </table>
    )
}