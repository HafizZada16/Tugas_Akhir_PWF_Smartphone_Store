import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ header, children }) {
    const { auth } = usePage().props;
    const { url } = usePage();

    return (
        <div className="font-sans antialiased bg-gray-50 text-gray-800 flex h-screen overflow-hidden">
            <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden sm:flex">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <div className="w-8 h-8 bg-[#FF6900] text-white flex items-center justify-center rounded-lg font-bold text-lg mr-2">mi</div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">Admin Panel</span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    <Link href="/dashboard" className={`flex items-center px-4 py-3 rounded-xl transition font-medium ${url.startsWith('/dashboard') ? 'bg-orange-50 text-[#FF6900]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        Dashboard
                    </Link>
                    <Link href="/admin/orders" className={`flex items-center px-4 py-3 rounded-xl transition font-medium ${url.startsWith('/admin/orders') ? 'bg-orange-50 text-[#FF6900]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        Pesanan
                    </Link>
                    <Link href="/store" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition font-medium">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        Lihat Store Web
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <Link href="/logout" method="post" as="button" className="flex w-full items-center px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </Link>
                </div>
            </aside>

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h1 className="text-xl font-bold text-gray-800">{header || 'Dashboard'}</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-gray-900">{auth.user.name}</div>
                            <div className="text-xs text-gray-500 uppercase">{auth.user.role}</div>
                        </div>
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-bold border border-gray-200">
                            {auth.user.name.substring(0, 1)}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
