import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

   return (
    <div className="min-h-screen bg-gray-50/50"> {/* Slightly softer background */}
        {/* MODERN STICKY NAV */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* LOGO WITH HOVER EFFECT */}
                        <div className="shrink-0 flex items-center transition-transform duration-300 hover:scale-105">
                            <Link href={route('posts.index')}>
                                {/* Changed text-indigo-600 to text-blue-600 */}
                                <ApplicationLogo className="block h-10 w-auto fill-current text-blue-600" />
                            </Link>
                        </div>

                        {/* NAVIGATION LINKS */}
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink 
                                href={route('posts.index')} 
                                active={route().current('posts.index')}
                                // Note: Siguraduhin na ang NavLink component mo ay gumagamit din ng blue border/text
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none"
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                href={route('posts.create')} 
                                active={route().current('posts.create')}
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none"
                            >
                                Create Post
                            </NavLink>
                        </div>
                    </div>

                    {/* DESKTOP USER DROPDOWN */}
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            /* Changed border color and hover text to blue-600, focus ring to blue-500 */
                                            className="inline-flex items-center px-4 py-2 border border-gray-200 text-sm leading-4 font-medium rounded-full text-gray-600 bg-white hover:bg-gray-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-sm"
                                        >
                                            {/* Avatar: Changed bg-indigo-100 to bg-blue-100 and text-indigo-600 to text-blue-600 */}
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center overflow-hidden me-2 border border-gray-200">
                                                {user.profile_image ? (
                                                    <img src={`/storage/${user.profile_image}`} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-[10px] font-bold">{user.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            {user.name}
                                            <svg className="ms-2 -me-0.5 h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right" width="48" contentClasses="py-1 bg-white ring-1 ring-black ring-opacity-5 rounded-xl">
                                    <Dropdown.Link href={route('profile.edit')} className="flex items-center">
                                        Profile
                                    </Dropdown.Link>
                                    <hr className="my-1 border-gray-100" />
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-600">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* MOBILE HAMBURGER */}
                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((p) => !p)}
                            /* Changed hover:text-blue-600 and hover:bg-blue-50 */
                            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition duration-150"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-white border-t border-gray-100'}>
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink href={route('posts.index')} active={route().current('posts.index')}>
                        Home
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('posts.create')} active={route().current('posts.create')}>
                        Create Post
                    </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4 flex items-center">
                        {/* Avatar: Changed bg-indigo-500 to bg-blue-600 */}
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="ms-3">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>
                    </div>
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-red-600">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>

        {/* PAGE HEADER */}
        {header && (
            <header className="bg-white/50 border-b border-gray-200/50">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {header}
                    </h2>
                </div>
            </header>
        )}

        {/* MAIN CONTENT */}
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
        </main>
    </div>
);
}