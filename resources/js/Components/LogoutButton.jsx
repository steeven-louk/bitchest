import React from 'react';

export default function LogoutButton({  className = '', processing,  }) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-red-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
