import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { editSub, getOneSub } from '../../store/subcrudit'

import '../CreateSubcrudit/CreateSub.css'


function EditSubcruditForm() {

    const history = useHistory()
    const dispatch = useDispatch()
    const {subcruditId} = useParams()

    useEffect(async () => {
        await dispatch(getOneSub(subcruditId))
    }, [dispatch])

    const subToEdit = useSelector((state) => state.subcrudits.oneSubcrudit)
    // console.log('subToEdit', subToEdit)

    const [name, setName] = useState(subToEdit.name || '')
    const [description, setDescription] = useState(subToEdit.description || '')

    useEffect(() => {
        if (Object.values(subToEdit).length) {
            setName(subToEdit.name)
            setDescription(subToEdit.description)
        }
    }, [subToEdit, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(editSub(subcruditId, name, description))
        history.push(`/subcrudits/${subcruditId}`)
    }

    if (!subToEdit) {
        return null
    }


    return (
        <>
        <div className='headerParent'>
        <h1>Edit Sub</h1>
        </div>
        <div className='formParent'>
        <form onSubmit={handleSubmit} className='createSubForm'>
            <input type='text' className='subFormName' value={name} onChange={(e) => setName(e.target.value)} placeholder='Change the name of your SubCRUDit'></input>
            <textarea className='subDesc' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Change the description of your SubCRUDit'></textarea>
            <button type='submit' className='createButton'>Update</button>
        </form>
        </div>
        </>
    )
}

export default EditSubcruditForm