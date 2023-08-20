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
    const [valErrs, setValErrs] = useState([])

    const user = useSelector((state) => state.session.user)
    // console.log('user', user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log('yay')
        let errs = []
        if (name.length < 3) {
            console.log('name too short')
            errs.push('Name too short')
            console.log('errs', errs)
        }
        if (name.includes('/')) {
            errs.push('subcrudit name cannot include \'/\'')
        }
        if (name.includes(' ')) {
            errs.push('no empty spaces')
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
            const newSub = await dispatch(createSub(name, description))
            history.push(`/subcrudits/${newSub.name}`)
        }
        // console.log('newSub', newSub)
    }

    if (!user) {
        return <h1>No User</h1>
    }


    return (
        <>
        <div className='all'>
        {/* <div className='headerParent'>
        </div> */}
        <div className='formParent'>
        <form onSubmit={handleSubmit} className='createSubForm'>
        <h1 className='createSubHeader'>Create A New Sub</h1>
            <input type='text' className='subFormName' value={name} onChange={(e) => setName(e.target.value)} placeholder='Give your SubCRUDdit a name!'></input>
            {valErrs.length > 0 && name.length < 3 ? <p>Name must be at least 3 characters!</p> : ''}
            {valErrs.length > 0 && name.includes('/') ? <p>SubCRUDit name cannot include a '/' character.</p> : ''}
            {valErrs.length > 0 && name.includes(' ') ? <p>SubCRUDit name cannot have empty spaces.</p> : ''}
            <textarea className='subDesc' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Write a brief descripion of what your new SubCRUDit will be all about!'></textarea>
            {valErrs.length > 0 && !description ? <p>Description is required!</p> : ''}
            <button type='submit' className='"inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"'>Create</button>
        </form>
        </div>
        <div>
            <h1 className='bottomBorder'></h1>
        </div>
        </div>
        </>
    )
}

export default CreateSubcruditForm