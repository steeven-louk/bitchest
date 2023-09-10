import React, { useEffect } from 'react';
// import ApplicationLogo from '../Components/ApplicationLogo';
// import Dropdown from '../Components/Dropdown';
// import NavLink from '../Components/NavLink';
// import ResponsiveNavLink from '../Components/ResponsiveNavLink';
// import { Link } from '@inertiajs/inertia-react';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/userSlice';

export default function Authenticated({ auth, header, children }) {
    // const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    // const email = useSelector(state => state.userInfo?.email);
    const dispatch = useDispatch();

// console.log(auth)
    useEffect(() => {
        dispatch(setUserData({
            'id': auth.user.id,
            'name': auth.user.name,
            'email':auth.user.email,
            'solde': auth.user.solde,
            'status': auth.user.status
        }));
    }, [])

    return (
        <div className="min-h-screen bg-black">

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
