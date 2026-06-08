import { Head, Link, useForm, router } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';

export default function Show({ product }) {
    const { post, processing } = useForm();

    const handleAddToCart = (e, isBuyNow = false) => {
        e.preventDefault();
        post(`/cart/add/${product.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                if (isBuyNow) {
                    router.visit('/cart');
                }
            }
        });
    };

    return (
        <StoreLayout>
            <Head title={product.name} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Image Section */}
                        <div className="flex justify-center items-center bg-gray-50 rounded-2xl p-10">
                            <img 
                                src={product.image?.startsWith('http') ? product.image : `/storage/${product.image}`} 
                                alt={product.name} 
                                className="w-full max-w-md object-contain hover:scale-105 transition duration-500" 
                            />
                        </div>
                        
                        {/* Details Section */}
                        <div className="flex flex-col justify-center">
                            <div className="text-[#FF6900] font-semibold tracking-wider text-sm mb-2 uppercase">
                                {product.category?.name || 'Uncategorized'}
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed whitespace-pre-wrap">{product.description}</p>
                            
                            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                                <div className="text-sm text-gray-500 mb-1">Harga Resmi</div>
                                <div className="text-3xl font-bold text-[#FF6900]">
                                    Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                </div>
                                
                                {product.status === 'Tersedia' || product.stock > 0 ? (
                                    <div className="mt-4 flex items-center gap-2 text-sm text-green-600 font-medium">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        Tersedia ({product.stock} unit)
                                    </div>
                                ) : (
                                    <div className="mt-4 flex items-center gap-2 text-sm text-red-600 font-medium">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                        Stok Habis
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <form onSubmit={(e) => handleAddToCart(e, true)} className="flex-1">
                                    <button 
                                        type="submit" 
                                        disabled={product.stock <= 0 || processing} 
                                        className={`w-full ${product.stock <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF6900] hover:bg-orange-600 shadow-orange-200'} text-white py-4 rounded-xl font-bold text-lg transition shadow-lg disabled:opacity-50`}
                                    >
                                        Beli Sekarang
                                    </button>
                                </form>
                                <form onSubmit={(e) => handleAddToCart(e, false)}>
                                    <button 
                                        type="submit" 
                                        disabled={product.stock <= 0 || processing} 
                                        className={`px-6 py-4 h-full rounded-xl border-2 border-gray-200 text-gray-600 font-bold transition flex items-center justify-center ${product.stock <= 0 ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'hover:border-[#FF6900] hover:text-[#FF6900]'} disabled:opacity-50`}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
