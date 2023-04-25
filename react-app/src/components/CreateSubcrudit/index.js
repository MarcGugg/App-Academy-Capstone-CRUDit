import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { createSub } from '../../store/subcrudit'

import './CreateSub.css'

function CreateSubcruditForm() {

    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const user = useSelector((state) => state.session.user)
    // console.log('user', user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log('yay')
        const newSub = await dispatch(createSub(name, description))
        // console.log('newSub', newSub)
        history.push(`/subcrudits/${newSub.name}`)
    }

    if (!user) {
        return <h1>No User</h1>
    }


    return (
        <>
        <div className='headerParent'>
        <h1>Create New Sub</h1>
        </div>
        <div className='formParent'>
        <form onSubmit={handleSubmit} className='createSubForm'>
            <input type='text' className='subFormName' value={name} onChange={(e) => setName(e.target.value)} placeholder='Give your SubCRUDdit a name!'></input>
            <textarea className='subDesc' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Write a brief descripion of what your new SubCRUDit will be all about!'></textarea>
            <button type='submit' className='createButton'>Create</button>
        </form>
        </div>
        </>
    )
}

export default CreateSubcruditForm