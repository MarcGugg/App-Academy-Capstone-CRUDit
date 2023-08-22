import {NavLink} from 'react-router-dom'

import './Profile.css'


function UserSubs(user={user}) {
    console.log('HELLO FROM SUBS')
    console.log(user.user)


    return (
        <>
        <div className='userSubsHeaderParent'>
            <div>
                {/* <h1>User SubCRUDits</h1> */}
            </div>
        </div>
        <div className='userSubsPropParent'>
        {user.user.allSubcruddits && Object.values(user.user.allSubcruddits).length ? 
        <div>
            {Object.values(user.user.allSubcruddits).map(sub => (
                <div className='userSub'>
                <NavLink to={`/subcrudits/${sub.name}`} style={{textDecoration:'none', color:'black'}}>
                    <p>{sub.name}</p>
                </NavLink>
                </div>
            ))}
        </div>
        : ''}
        </div>
        </>
    )
}

export default UserSubs