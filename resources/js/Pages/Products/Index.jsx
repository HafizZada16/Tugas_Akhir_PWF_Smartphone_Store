import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';

export default function Index({ products, categories, flash }) {
    // Determine active category from URL if present, otherwise 'all'
    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get('category') || 'all';
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    const { post } = useForm();

    const addToCart = (productId, isBuyNow) => {
        post(`/cart/add/${productId}`, {
            preserveScroll: true,
            onSuccess: () => {
                if (isBuyNow) {
                    // Logic to redirect or handle buy now could go here
                }
            }
        });
    };

    return (
        <StoreLayout>
            <Head title="Semua Produk" />

            {/* Banner Section */}
            <div className="bg-gray-100 py-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Semua Produk</h1>
                    <p className="mt-4 text-lg text-gray-600">Temukan smartphone impian Anda dengan teknologi terbaru.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {flash && flash.success && (
                    <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                        {flash.success}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Kategori */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Kategori Produk</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button 
                                        onClick={() => setActiveCategory('all')} 
                                        className={`block px-4 py-2 rounded-lg transition w-full text-left ${activeCategory === 'all' ? 'bg-orange-50 text-[#FF6900] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                                    >
                                        Semua Kategori
                                    </button>
                                </li>
                                {categories.map(category => (
                                    <li key={category.id}>
                                        <button 
                                            onClick={() => setActiveCategory(category.id.toString())} 
                                            className={`block px-4 py-2 rounded-lg transition w-full text-left ${activeCategory === category.id.toString() ? 'bg-orange-50 text-[#FF6900] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                                        >
                                            {category.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Product Area */}
                    <div className="flex-1">
                        {/* Filter Header */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800">
                                {activeCategory === 'all' && <span>Semua Produk</span>}
                                {categories.map(category => (
                                    activeCategory === category.id.toString() && <span key={category.id}>Menampilkan: {category.name}</span>
                                ))}
                            </h2>
                            <div className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full font-medium">
                                {products.filter(p => activeCategory === 'all' || p.category_id.toString() === activeCategory).length} produk
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(product => {
                                const isVisible = activeCategory === 'all' || product.category_id.toString() === activeCategory;
                                
                                if (!isVisible) return null;

                                return (
                                    <div key={product.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform flex flex-col group border border-transparent hover:border-gray-100">
                                        <Link href={`/products/${product.id}`} className="flex-1 flex flex-col">
                                            <div className="relative pt-6 px-6 pb-2">
                                                {product.status === 'Tersedia' ? (
                                                    <span className="absolute top-4 left-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Tersedia ({product.stock})</span>
                                                ) : (
                                                    <span className="absolute top-4 left-4 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">Habis</span>
                                                )}
                                                <img src={product.image} alt={product.name} className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <div className="px-6 text-center flex-1 flex flex-col justify-center">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#FF6900] transition">{product.name}</h3>
                                                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                            </div>
                                        </Link>
                                        <div className="p-6 text-center mt-auto">
                                            <span className="text-[#FF6900] font-bold text-xl block mb-4">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</span>
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <button 
                                                        onClick={() => addToCart(product.id, false)}
                                                        disabled={product.status === 'Habis'} 
                                                        className={`w-full ${product.status === 'Habis' ? 'bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed' : 'bg-orange-50 text-[#FF6900] border-orange-200 hover:bg-orange-100'} border py-2 rounded-xl text-sm font-bold transition`}
                                                    >
                                                        Keranjang
                                                    </button>
                                                </div>
                                                <div className="flex-1">
                                                    <button 
                                                        onClick={() => addToCart(product.id, true)}
                                                        disabled={product.status === 'Habis'} 
                                                        className={`w-full ${product.status === 'Habis' ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-[#FF6900] text-white hover:bg-orange-600 shadow-orange-200 shadow-lg'} py-2 rounded-xl text-sm font-bold transition`}
                                                    >
                                                        Beli
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {products.filter(p => activeCategory === 'all' || p.category_id.toString() === activeCategory).length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">Produk tidak ditemukan</h3>
                                <p className="mt-1 text-sm text-gray-500">Belum ada produk untuk kategori ini.</p>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
