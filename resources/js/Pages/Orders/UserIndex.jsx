import { Head, Link, usePage } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';

export default function UserIndex({ orders }) {
    const { flash } = usePage().props;

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">Menunggu Pengiriman</span>;
            case 'paid': return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">Sudah Dibayar</span>;
            case 'shipped': return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Sedang Dikirim</span>;
            case 'completed': return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Selesai</span>;
            case 'cancelled': return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">Dibatalkan</span>;
            default: return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold capitalize">{status}</span>;
        }
    };

    return (
        <StoreLayout>
            <Head title="Pesanan Saya" />

            <div className="bg-gray-100 py-12 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Pesanan Saya</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {flash?.success && (
                    <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                        {flash.success}
                    </div>
                )}

                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                        <h3 className="mt-4 text-xl font-bold text-gray-900">Belum ada pesanan</h3>
                        <p className="mt-2 text-gray-500">Anda belum pernah melakukan pemesanan.</p>
                        <Link href="/store" className="mt-6 inline-block bg-[#FF6900] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-200">Mulai Belanja</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
                                    <div>
                                        <span className="text-sm text-gray-500 block">Nomor Pesanan</span>
                                        <span className="font-bold text-gray-900">#ORD-{String(order.id).padStart(5, '0')}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-gray-500 block">Tanggal Pesan</span>
                                        <span className="font-medium text-gray-900">{formatDate(order.created_at)}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-gray-500 block mb-1">Status</span>
                                        {getStatusBadge(order.status)}
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <ul className="divide-y divide-gray-100">
                                        {order.items.map(item => (
                                            <li key={item.id} className="py-4 flex items-center">
                                                <img src={item.product?.image?.startsWith('http') ? item.product.image : `/storage/${item.product?.image}`} alt={item.product?.name} className="w-16 h-16 object-contain rounded-lg border border-gray-100 p-1" />
                                                <div className="ml-4 flex-1">
                                                    <h4 className="text-md font-bold text-gray-900">{item.product?.name || 'Produk Dihapus'}</h4>
                                                    <p className="text-sm text-gray-500">{item.quantity} x {formatMoney(item.price)}</p>
                                                </div>
                                                <div className="font-bold text-gray-900">
                                                    {formatMoney(item.quantity * item.price)}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="font-bold text-gray-700">Total Belanja</span>
                                    <span className="text-xl font-bold text-[#FF6900]">{formatMoney(order.total_price)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StoreLayout>
    );
}
