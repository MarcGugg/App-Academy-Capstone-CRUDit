import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

/*home page and profile buttons were originally li, not div
there were originally no class names
*/

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='headerElements'>
			<div>
				<NavLink exact to="/" className={'headerNavLink'}>CRUDit</NavLink>
			</div>
			<div>
				<form>
					<input type='text' className='searchBar' placeholder='Search for a SubCRUDit...'></input>
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