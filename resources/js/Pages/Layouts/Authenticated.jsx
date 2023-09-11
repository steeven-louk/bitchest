import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/userSlice';

export default function Authenticated({ auth, header, children }) {
    
    const dispatch = useDispatch();

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
