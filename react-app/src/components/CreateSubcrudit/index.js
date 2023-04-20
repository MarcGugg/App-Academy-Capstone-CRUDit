import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { createSub } from '../../store/subcrudit'

function CreateSubcruditForm() {

    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const user = useSelector((state) => state.session.user)
    // console.log('user', user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('yay')
        const newSub = await dispatch(createSub(name, description))
        console.log('newSub', newSub)
        history.push(`subcrudits/${newSub.id}`)
    }

    if (!user) {
        return <h1>No User</h1>
    }


    return (
        <>
        <h1>Create New Sub</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Give your SubCRUDdit a name!'></input>
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Write a brief descripion of what your new SubCRUDit will be all about!'></input>
            <button type='submit'>Create</button>
        </form>
        </>
    )
}

export default CreateSubcruditForm