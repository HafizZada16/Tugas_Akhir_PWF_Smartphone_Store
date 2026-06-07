import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <div className="font-sans antialiased text-gray-900 bg-white selection:bg-[#FF6900] selection:text-white">
            <Head title="Landing Page" />
            
            <nav className="absolute top-0 w-full z-50 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#FF6900] text-white flex items-center justify-center rounded-xl font-bold text-xl shadow-lg shadow-orange-500/30">
                            mi
                        </div>
                        <span className="text-xl font-black tracking-tight text-white hidden sm:block">Smartphone Store</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href="/store" className="text-sm font-bold text-white hover:text-orange-200 transition">Ke Toko</Link>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-bold text-white hover:text-orange-200 transition">Log in</Link>
                                <Link href="/register" className="text-sm font-bold bg-white text-[#FF6900] px-5 py-2 rounded-full hover:bg-gray-100 transition shadow-lg">Daftar</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <div className="relative bg-gray-900 overflow-hidden h-screen flex items-center">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Smartphone Background" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-[#FF6900] text-sm font-bold mb-6 border border-orange-500/30 backdrop-blur-sm">Tugas Akhir Kelompok </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6">
                            Temukan Smartphone <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6900] to-orange-400">Impianmu.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
                            Platform e-commerce terbaik untuk mendapatkan gadget terbaru dengan harga paling kompetitif, 100% original, dan bergaransi resmi.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/store" className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-white bg-[#FF6900] rounded-full hover:bg-orange-600 transition shadow-[0_0_40px_rgba(255,105,0,0.4)] hover:shadow-[0_0_60px_rgba(255,105,0,0.6)] hover:-translate-y-1 transform">
                                Mulai Belanja Sekarang
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">Mengapa Belanja di Toko Kami?</h2>
                        <p className="mt-4 text-lg text-gray-500">Kami memberikan pengalaman belanja gadget terbaik untuk Anda.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF6900] transition-all duration-300">
                                <svg className="w-10 h-10 text-[#FF6900] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Original</h3>
                            <p className="text-gray-500">Semua produk yang kami jual dijamin keasliannya dan memiliki garansi resmi pabrikan.</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF6900] transition-all duration-300">
                                <svg className="w-10 h-10 text-[#FF6900] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Pengiriman Cepat</h3>
                            <p className="text-gray-500">Sistem logistik cerdas memastikan gadget impianmu sampai di tangan dengan aman dan secepat kilat.</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF6900] transition-all duration-300">
                                <svg className="w-10 h-10 text-[#FF6900] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Layanan 24/7</h3>
                            <p className="text-gray-500">Tim dukungan pelanggan kami siap membantu kendala dan pertanyaan Anda kapan saja.</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-50 border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-12 h-12 bg-[#FF6900] text-white flex items-center justify-center rounded-xl font-bold text-2xl mx-auto mb-6">mi</div>
                    <p className="text-gray-500 font-medium">Tugas Akhir PWF - Kelompok</p>
                    <p className="text-sm text-gray-400 mt-2">&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
