import React from 'react';
import ApplicationLogo from '../../Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-60 cursor-none object-cover h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white border-solid border-green-700 shadow-md shadow-green-800 sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
