import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { searchSubs } from "../../store/search"



function SearchResults() {

    const dispatch = useDispatch()
    const {parameters} = useParams()    


    useEffect(async () => {
        await dispatch(searchSubs(parameters)) 
    }, [dispatch, parameters])

    const subs = useSelector((state) => state.search.subsResults)

    if (!subs || !Object.values(subs).length) {
        return (
            <h1>No Results</h1>
        )
    }

    return (
        <>
        <h1>Search Results</h1>
        <div>
            {Object.values(subs).map(sub => (
                <NavLink to={`/subcrudits/${sub.id}`}>{sub.name}</NavLink>
            ))}
        </div>
        </>
    )
}

export default SearchResults