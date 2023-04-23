import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from 'react';
import { searchSubs } from '../../store/search';

/*home page and profile buttons were originally li, not div
there were originally no class names
*/

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	const dispatch = useDispatch()
	const history = useHistory()
	const [params, setParams] = useState('')

	const handleSearchSubmit = async (e) => {
		e.preventDefault()
		console.log('SEARCH SUBMIT')
		await dispatch(searchSubs(params))
		history.push(`/search/${params}`)
	}

	return (
		<div className='headerElements'>
			<div>
				<NavLink exact to="/" className={'headerNavLink'}>CRUDit</NavLink>
			</div>
			<div>
				<form onSubmit={handleSearchSubmit}>
					<input type='text' className='searchBar' placeholder='Search for a SubCRUDit...' value={params} onChange={(e) => setParams(e.target.value)}></input>
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