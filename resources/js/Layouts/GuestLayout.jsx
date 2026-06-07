import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-14 h-14 bg-[#FF6900] text-white flex items-center justify-center rounded-2xl font-bold text-3xl shadow-lg shadow-orange-200 group-hover:scale-105 transition-transform duration-300">
                            mi
                        </div>
                        <span className="text-3xl font-extrabold tracking-tight text-gray-900">Store</span>
                    </Link>
                </div>

                <div className="w-full overflow-hidden bg-white p-8 shadow-xl shadow-gray-200/50 sm:rounded-3xl border border-gray-100 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-[#FF6900]"></div>
                    {children}
                </div>
            </div>
        </div>
    );
}
