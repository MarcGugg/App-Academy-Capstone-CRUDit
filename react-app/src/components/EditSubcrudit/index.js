import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { editSub, getOneSub } from '../../store/subcrudit'

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
        <h1>Edit Sub</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Change the name of your SubCRUDit'></input>
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Change your SubCRUDits description'></input>
            <button type='submit'>Edit</button>
        </form>
        </>
    )
}

export default EditSubcruditForm