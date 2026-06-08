import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function StoreLayout({ children }) {
    const { auth, cart, flash } = usePage().props;
    const [open, setOpen] = useState(false);
    
    const cartCount = cart ? Object.keys(cart).length : 0;

    return (
        <div className="font-sans antialiased bg-gray-50 text-gray-800 flex flex-col min-h-screen">
            {flash && flash.success && (
                <div className="fixed top-20 right-4 z-[60] bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in-down">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-medium">{flash.success}</span>
                </div>
            )}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-[#FF6900] text-white flex items-center justify-center rounded-xl font-bold text-xl">
                                    mi
                                </div>
                                <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">Smartphone Store</span>
                            </Link>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex h-full">
                                <Link href="/store" className="inline-flex items-center px-1 pt-1 border-b-2 border-[#FF6900] text-sm font-medium leading-5 text-gray-900 focus:outline-none transition duration-150 ease-in-out">
                                    Mobiles
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link href="/cart" className="relative text-gray-600 hover:text-[#FF6900] transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#FF6900] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {auth.user ? (
                                <>
                                    {auth.user.role === 'admin' && (
                                        <Link href="/dashboard" className="text-sm text-blue-600 font-bold hover:underline">Panel Admin</Link>
                                    )}

                                    <div className="relative">
                                        <button onClick={() => setOpen(!open)} onBlur={() => setTimeout(() => setOpen(false), 200)} className="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-[#FF6900] focus:outline-none transition">
                                            {auth.user.name}
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                        </button>
                                        
                                        {open && (
                                            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden transition-all">
                                                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                                                    <p className="text-sm font-semibold text-gray-900 truncate">{auth.user.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                                                </div>

                                                <Link href="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF6900] transition">Profil Saya</Link>
                                                <Link href="/my-orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF6900] transition border-t border-gray-50">Pesanan Saya</Link>
                                                
                                                <Link href="/logout" method="post" as="button" className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100 font-medium">Logout</Link>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm text-gray-700 font-medium hover:text-[#FF6900]">Masuk</Link>
                                    <Link href="/register" className="text-sm text-gray-700 font-medium hover:text-[#FF6900]">Daftar</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 mt-auto py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Tugas Akhir PWF - H16. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
