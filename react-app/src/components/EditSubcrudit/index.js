import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { editSub, getOneSub } from '../../store/subcrudit'

import '../CreateSubcrudit/CreateSub.css'


function EditSubcruditForm() {

    const history = useHistory()
    const dispatch = useDispatch()
    const {subName} = useParams()

    useEffect(async () => {
        await dispatch(getOneSub(subName))
    }, [dispatch])

    const subToEdit = useSelector((state) => state.subcrudits.oneSubcrudit)
    // console.log('subToEdit', subToEdit)

    const [name, setName] = useState(subToEdit.name || '')
    const [description, setDescription] = useState(subToEdit.description || '')
    const [valErrs, setValErrs] = useState([])

    useEffect(() => {
        if (Object.values(subToEdit).length) {
            setName(subToEdit.name)
            setDescription(subToEdit.description)
        }
    }, [subToEdit, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let errs = []
        if (name.length < 3) {
            console.log('name too short')
            errs.push('Name too short')
            console.log('errs', errs)
        }
        if (name.includes('/')) {
            errs.push('subcrudit name cannot include \'/\'')
        }
        if (!description.length) {
            console.log('no description')
            errs.push('Must have description')
            console.log('errs', errs)
        }
        console.log('errs after conditionals', errs)
        setValErrs(errs)
        console.log('val errs', valErrs)

        if (!errs.length) {
            const edited = await dispatch(editSub(subName, name, description))
            console.log('edited frontend', edited)
            history.push(`/subcrudits/${edited.name}`)
        }
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
            {valErrs.length > 0 && name.length < 3 ? <p>Name must be at least 3 characters!</p> : ''}
            {valErrs.length > 0 && name.includes('/') ? <p>SubCRUDit name cannot include a '/' character.</p> : ''}
            {valErrs.length > 0 && name.includes(' ') ? <p>SubCRUDit name cannot have empty spaces.</p> : ''}
            <textarea className='subDesc' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Change the description of your SubCRUDit'></textarea>
            {valErrs.length > 0 && !description ? <p>Description is required!</p> : ''}
            <button type='submit' className='createButton'>Update</button>
        </form>
        </div>
        </>
    )
}

export default EditSubcruditForm