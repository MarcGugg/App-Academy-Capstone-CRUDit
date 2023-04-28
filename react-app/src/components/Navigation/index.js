import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from 'react';
import { searchSubs } from '../../store/search';
import { getAllSubs, getOneSub } from '../../store/subcrudit';
import Select from 'react-select'

/*home page and profile buttons were originally li, not div
there were originally no class names
*/

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const subs = useSelector((state) => state.subcrudits.allSubcrudits)
	console.log('all subs', subs)

	const dispatch = useDispatch()
	const history = useHistory()
	const [params, setParams] = useState('')
	const [selectedOptions, setSelectedOptions] = useState();
	const [subsLoaded, setSubsLoaded] = useState(false)
	
	const handleSearchSubmit = async (e) => {
		e.preventDefault()
		console.log('SEARCH SUBMIT')
		await dispatch(getOneSub(selectedOptions[0].value))
		// history.push(`/search/${params}`)
		// setSelectedOptions(params)
		history.push(`/subcrudits/${selectedOptions[0].value}`)
		setSelectedOptions('')
		//await dispatch(getOneSub(params.value))
		// history.push(`/subcrudits/${params.value}`)
	}

	// let optionsArr = []
	
	// useEffect(async () => {
	// 	await dispatch(getAllSubs())
	// }, [dispatch, selectedOptions, optionsArr])

	// console.log('optionsArr', optionsArr)
	
	function handleSelect(data) {
		console.log('DATA', data)
		setParams(data);
		console.log('PARAMS', params)
		setSelectedOptions(data)
		console.log('selectedOptions', selectedOptions)
		// if (data.length) {
		// 	history.push(`/subcrudits/${data[0].value}`)
		// }
		// setSelectedOptions()
	}

	let optionsArr = []
	if (subs && subsLoaded) {
		for (let i = 0; i < subs.length; i++) {
			optionsArr[i] = {value: subs[i], label: subs[i]}
			// optionsArr[i] = subs[i]
		}
	}

	useEffect(async () => {
		await dispatch(getAllSubs())
		setSubsLoaded(true)
	}, [dispatch])


	console.log('optionsArr after assignment', optionsArr)

	return (
		<div className='headerElements'>
			<div>
				<NavLink exact to="/" className={'headerNavLink'}>CRUDit</NavLink>
			</div>
			<div className='searchInput'>
				<form onSubmit={handleSearchSubmit}>
					{/* <input type='text' className='searchBar' placeholder='Search for a SubCRUDit...' value={params} onChange={(e) => setParams(e.target.value)}></input> */}
					<Select 
					options={optionsArr}
					placeholder='Search for a SubCRUDit'
					value={selectedOptions}
					onChange={handleSelect}
					isSearchable={true}
					isMulti
					/>
				</form>
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;