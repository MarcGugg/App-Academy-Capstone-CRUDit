import { useEffect } from "react"

function UserComments(comments={comments}) {
    if (!comments || !Object.values(comments).length) {
        return null
    }
    
    if (comments) {
        console.log('COMMENTS', comments)
    }

    return (
        <>
        {comments.comments && Object.values(comments.comments).length ? 
        <div className="flex justify-center">
        <div className="flex justify-center flex-col">
            {Object.values(comments.comments).map(comment => 
                    <article class="p-4 mb-6 text-base bg-white rounded-lg dark:bg-gray-900 "> 
                    <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                                class="mr-2 w-6 h-6 rounded-full"
                                src="https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"
                                alt="Michael Gough"/>{comment.author?.username}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                                title="February 8th, 2022">Feb. 8, 2022</time></p>
                    </div>
                    </footer>
                    <p class="text-gray-500 dark:text-gray-400">{comment.text}</p>
                    <div class="flex items-center mt-4 space-x-4">
                    {/* <button type="button"
                        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        Reply
                    </button> */}
                        <div>
                                {/* {user ? user.id === comment.authorId ? 
                                // <button onClick={handleCommentDelete}>Delete</button> //RENDER THIS BUTTON IN A CONTEXT COMPONENT. PASS IN COMMENT ID
                                <CommentDeleteButton comment={comment} />
                                : '' : ''} */}
                            {/* {user ? user.id === comment.authorId ?
                            <NavLink to={`/comments/${comment.id}/edit`} style={{textDecoration: 'none' , color: 'darkgray', fontWeight: '500'}}>Edit</NavLink>
                            : '' : ''} */}
                            {/* {user ? user.id === comment.authorId ? <button onClick={() => setEditMode(!editMode)}>Update</button> : '' : ''} */}
                        </div>
                    </div>
                    </article>
            )}

        </div>
        </div>
        : ''}
        </>
    )
}

export default UserComments