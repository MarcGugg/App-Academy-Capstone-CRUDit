import { useEffect } from "react"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

function UserUpvotes(upvotes={upvotes}) {
    if (!upvotes || !Object.values(upvotes).length)  {
        return null
    }

    if (upvotes) {
        console.log('UPVOTES', upvotes)
    }
    return (
        <>
        {upvotes.upvotes && Object.values(upvotes.upvotes).length > 0 ? 
        
        Object.values(upvotes.upvotes).map(post => (
            <div className="flex justify-center">

            <div style={{width:'44rem'}}>

                        <div class="py-2">
                        <div class="flex border border-grey-light-alt hover:border-grey rounded bg-white cursor-pointer">
                            <div class="w-1/12 flex flex-col text-center pt-2">
                                {/* {user && upvoteCheck(post) ? 
                                // add handler for removing upvote 
                                     <button class="text-xs text-orange-500" onClick={(e) => handleRemoveUpvote(e, post.id)}>
                                     <svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"/></svg>
                                 </button>
                                :  */}
                                
                                {/* <button class="text-xs" onClick={(e) => handleUpvote(e, post.id)}> */}
                                <button class="text-xs">
                                    <svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"/></svg>
                                </button>
                                {/* } */}
                                
                                <span class="text-xs font-semibold my-1" onClick={() => console.log(post,post.upvotes)}>{post.upvotes.length - post.downvotes.length}</span>
                                {/* <span class="text-xs font-semibold my-1" onClick={() => console.log(post,post.upvotes.length)}>{(post.upvotes.length - post.downvotes.length).toString()}</span> */}
                                
                                {/* {user && downvoteCheck(post) ? 
                                // add handler for removing downvote 
                                 <button class="text-xs text-cyan-600" onClick={(e) => handleRemoveDownvote(e, post.id)}>
                                 <svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10V2h6v8h5l-8 8-8-8h5z"/></svg>
                             </button>
                                :  */}
                                
                                {/* <button class="text-xs" onClick={(e) => handleDownvote(e, post.id)}> */}
                                <button class="text-xs">
                                    <svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10V2h6v8h5l-8 8-8-8h5z"/></svg>
                                </button>
                                {/* } */}
                            </div>
            <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none'}}>
                            <div class="w-11/12 pt-2">
                                <div class="flex items-center text-xs mb-2">
                                    <a href="#" class="font-semibold no-underline hover:underline text-black flex items-center">
                                        <img class="rounded-full border h-5 w-5" src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"/>
                                        <span class="ml-2">{post.subcrudit?.name}</span>
                                    </a>
                                    <span class="text-grey-light mx-1 text-xxs">•</span>
                                    <span class="text-grey">Posted by</span>
                                    <a href="#" class="text-grey mx-1 no-underline hover:underline">{post.author.username}</a>
                                    <span class="text-grey">2 hours ago</span>
                                </div>
                                <div>
                                    <h2 class="text-lg font-medium mb-1">{post.header}</h2>
                                </div>
                                {/* <div className='image'>
                         
                                    {Object.keys(post).includes('image') ? 
                                    
                                    <img src={post.image.url} 
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                            }} 
                                            alt = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                    className='postImageSrc-sub'/>
                               
                                    : ''}
                                    </div> */}

                                <div class="inline-flex items-center my-1">
                                    <div class="flex hover:bg-grey-lighter p-1">
                                        <svg class="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z"/></svg>
                                        <span class="ml-2 text-xs font-semibold text-grey">3k Comments</span>
                                    </div>
                                    <div class="flex hover:bg-grey-lighter p-1 ml-2">
                                        <svg class="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z"/></svg>
                                        <span class="ml-2 text-xs font-semibold text-grey">Share</span>
                                    </div>
                                    <div class="flex hover:bg-grey-lighter p-1 ml-2">
                                        <svg class="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 2C0 .9.9 0 2 0h14l4 4v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5 0v6h10V2H5zm6 1h3v4h-3V3z"/></svg>
                                        <span class="ml-2 text-xs font-semibold text-grey">Save</span>
                                    </div>
                                    <div class="flex hover:bg-grey-lighter p-1 ml-2 rotate-90">
                                        <svg class="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
                                    </div>
                                </div>
                            </div>
            </NavLink>
                        </div>
                    </div>
   </div>
            </div>

        ))
        : ''}
        </>
    )
}

export default UserUpvotes