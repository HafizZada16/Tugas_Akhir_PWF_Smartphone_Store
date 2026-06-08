import { useState, useMemo } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';

export default function Index({ cart }) {
    const { auth } = usePage().props;
    const { post, processing } = useForm();
    
    // Initialize items state from cart prop
    const [items, setItems] = useState(() => {
        const initialItems = {};
        Object.keys(cart || {}).forEach(id => {
            initialItems[id] = {
                ...cart[id],
                selected: true
            };
        });
        return initialItems;
    });

    const total = useMemo(() => {
        let sum = 0;
        Object.values(items).forEach(item => {
            if (item.selected) sum += item.price * item.quantity;
        });
        return sum;
    }, [items]);

    const count = useMemo(() => {
        return Object.values(items).filter(item => item.selected).length;
    }, [items]);

    const totalItems = Object.keys(items).length;
    const allSelected = totalItems > 0 && count === totalItems;

    const toggleAll = () => {
        const newState = !allSelected;
        setItems(prev => {
            const next = { ...prev };
            Object.keys(next).forEach(id => {
                next[id].selected = newState;
            });
            return next;
        });
    };

    const toggleItem = (id) => {
        setItems(prev => ({
            ...prev,
            [id]: { ...prev[id], selected: !prev[id].selected }
        }));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        
        // Optimistic UI update
        setItems(prev => ({
            ...prev,
            [id]: { ...prev[id], quantity: newQuantity }
        }));
        
        // Send request to server
        router.patch(`/cart/update/${id}`, { quantity: newQuantity }, {
            preserveScroll: true
        });
    };

    const handleRemove = (id) => {
        router.delete(`/cart/remove/${id}`);
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        // Construct quantities to send
        const quantities = {};
        const selected_items = [];
        Object.keys(items).forEach(id => {
            if (items[id].selected) {
                selected_items.push(id);
                quantities[id] = items[id].quantity;
            }
        });
        
        router.post('/checkout', { selected_items, quantities });
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const isCartEmpty = !cart || Object.keys(cart).length === 0;

    return (
        <StoreLayout>
            <Head title="Keranjang Belanja" />

            <div className="bg-gray-100 py-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Keranjang Belanja</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {isCartEmpty ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        <h3 className="mt-4 text-xl font-bold text-gray-900">Keranjang masih kosong</h3>
                        <p className="mt-2 text-gray-500">Mulai temukan smartphone impianmu sekarang.</p>
                        <Link href="/store" className="mt-6 inline-block bg-[#FF6900] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-200">Mulai Belanja</Link>
                    </div>
                ) : (
                    <form onSubmit={handleCheckout}>
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-2/3">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                        <label className="flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={allSelected} 
                                                onChange={toggleAll} 
                                                className="w-5 h-5 text-[#FF6900] border-gray-300 rounded focus:ring-[#FF6900] transition" 
                                            />
                                            <span className="ml-3 text-sm font-bold text-gray-900 uppercase">Pilih Semua Produk</span>
                                        </label>
                                        <span className="text-sm text-gray-500 font-medium"><span>{count}</span> Barang Dipilih</span>
                                    </div>

                                    <ul className="divide-y divide-gray-100">
                                        {Object.keys(items).map(id => {
                                            const item = items[id];
                                            return (
                                                <li key={id} className={`p-6 flex items-center transition hover:bg-gray-50/30 ${item.selected ? 'bg-orange-50/30' : ''}`}>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={item.selected} 
                                                        onChange={() => toggleItem(id)} 
                                                        className="w-5 h-5 text-[#FF6900] border-gray-300 rounded focus:ring-[#FF6900] transition mr-4" 
                                                    />
                                                    
                                                    <img src={item.image?.startsWith('http') ? item.image : `/storage/${item.image}`} alt={item.name} className="w-24 h-24 object-contain rounded-xl bg-gray-50 p-2 border border-gray-100" />
                                                    
                                                    <div className="ml-6 flex-1">
                                                        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{item.name}</h3>
                                                        <p className="text-[#FF6900] font-bold text-lg mb-3">Rp {new Intl.NumberFormat('id-ID').format(item.price)}</p>
                                                        
                                                        <div className="flex items-center">
                                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                                                <button type="button" onClick={() => updateQuantity(id, item.quantity - 1)} className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition focus:outline-none font-bold text-lg">
                                                                    -
                                                                </button>
                                                                <input 
                                                                    type="number" 
                                                                    value={item.quantity} 
                                                                    readOnly 
                                                                    className="w-16 text-center border-none focus:ring-0 text-sm font-bold text-gray-900 p-0 m-0" 
                                                                />
                                                                <button type="button" onClick={() => updateQuantity(id, item.quantity + 1)} className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition focus:outline-none font-bold text-lg">
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="ml-4">
                                                        <button type="button" onClick={() => handleRemove(id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="Hapus Barang">
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                        </button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>

                            <div className="lg:w-1/3">
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Ringkasan Belanja</h3>
                                    
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-gray-500">Total Harga (<span>{count}</span> barang)</span>
                                        <span className="text-2xl font-black text-[#FF6900]">{formatMoney(total)}</span>
                                    </div>
                                    
                                    {auth.user ? (
                                        <>
                                            <button type="submit" disabled={count === 0} className={`w-full py-3 rounded-xl font-bold transition ${count === 0 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-[#FF6900] text-white hover:bg-orange-600 shadow-lg shadow-orange-200'}`}>
                                                Checkout Sekarang
                                            </button>
                                            {count === 0 && <p className="text-xs text-red-500 text-center mt-3 font-medium">Pilih setidaknya 1 barang untuk dicheckout.</p>}
                                        </>
                                    ) : (
                                        <Link href="/login" className="block text-center w-full bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition mt-4">
                                            Login untuk Checkout
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </StoreLayout>
    );
}
