import { useEffect } from "react"

function UserUpvotes(upvotes={upvotes}) {
    if (!upvotes || !Object.values(upvotes).length)  {
        return null
    }

    if (upvotes) {
        console.log('UPVOTES', upvotes)
    }
    return (
        <>
        <h1>hello again</h1>
        </>
    )
}

export default UserUpvotes