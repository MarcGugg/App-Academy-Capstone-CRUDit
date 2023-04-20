import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { getOneSub } from '../../store/subcrudit'

function EditSubcruditForm() {

    const history = useHistory()
    const dispatch = useDispatch()
    const {subcruditId} = useParams()

    useEffect(async () => {
        await dispatch(getOneSub(subcruditId))
    }, [dispatch])

    const subToEdit = useSelector((state) => state.subcrudits.oneSubcrudit)
    console.log('subToEdit', subToEdit)

    if (!subToEdit) {
        return null
    }


    return (
        <>
        <h1>Edit Sub</h1>
        </>
    )
}

export default EditSubcruditForm