import React, { useEffect } from 'react';
// import ApplicationLogo from '../Components/ApplicationLogo';
// import Dropdown from '../Components/Dropdown';
// import NavLink from '../Components/NavLink';
// import ResponsiveNavLink from '../Components/ResponsiveNavLink';
// import { Link } from '@inertiajs/inertia-react';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

export default function Authenticated({ auth, header, children }) {
    // const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    // const email = useSelector(state => state.userInfo?.email);
    const dispatch = useDispatch();

console.log(auth)
    useEffect(() => {
        dispatch(setUserData({
            'id': auth.user.id,
            'name': auth.user.name,
            'status': auth.user.status
        }));
    }, [])

    return (
        <div className="min-h-screen bg-black">

            {/* <nav className="bg-white border-b border-gray-100">
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div> 
                </div> 
               
            </nav> */}

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
