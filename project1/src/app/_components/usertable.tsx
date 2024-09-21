type LogEntryType = {
    id: number,
    timestamp: any, //fixme
    userType: "Student" | "Faculty" | "Staff" | "Janitor"

}

export function UserTable({LogEntry}: {LogEntry:LogEntryType[]}): JSX.Element {



    return (
        <div>
            
        </div>
    )
}