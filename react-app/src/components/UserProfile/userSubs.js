import {NavLink} from 'react-router-dom'



function UserSubs(user={user}) {
    console.log('HELLO FROM SUBS')
    console.log(user.user)


    return (
        <>
        <h1>User SubCRUDits</h1>
        {user.user.allSubcruddits && Object.values(user.user.allSubcruddits).length ? 
        <div>
            {Object.values(user.user.allSubcruddits).map(sub => (
                <NavLink to={`/subcrudits/${sub.id}`}>
                    <p>{sub.name}</p>
                </NavLink>
            ))}
        </div>
        : ''}
        </>
    )
}

export default UserSubs