import { Head, Link, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminIndex({ orders }) {
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

    const updateStatus = (orderId, newStatus) => {
        router.patch(`/admin/orders/${orderId}/status`, {
            status: newStatus 
        }, {
            preserveScroll: true
        });
    };

    return (
        <AdminLayout header="Manajemen Pesanan">
            <Head title="Manajemen Pesanan" />

            {flash?.success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center shadow-sm">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-white">
                    <h3 className="text-lg font-bold text-gray-900">Daftar Pesanan Masuk</h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Pesanan</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pelanggan</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Harga</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {orders.length > 0 ? orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-bold text-gray-900">#ORD-{String(order.id).padStart(5, '0')}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900">{order.user?.name}</div>
                                        <div className="text-xs text-gray-500">{order.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900">{formatMoney(order.total_price)}</div>
                                        <div className="text-xs text-gray-500">{order.items?.length || 0} macam barang</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(order.created_at)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {order.status === 'pending' ? (
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-md bg-yellow-100 text-yellow-800 border border-yellow-200">Pending</span>
                                        ) : order.status === 'paid' ? (
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-md bg-purple-100 text-purple-800 border border-purple-200">Paid</span>
                                        ) : order.status === 'shipped' ? (
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-md bg-blue-100 text-blue-800 border border-blue-200">Shipped</span>
                                        ) : order.status === 'completed' ? (
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-md bg-green-100 text-green-800 border border-green-200">Completed</span>
                                        ) : order.status === 'cancelled' ? (
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-md bg-red-100 text-red-800 border border-red-200">Cancelled</span>
                                        ) : (
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-md bg-gray-100 text-gray-800 border border-gray-200 capitalize">{order.status}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {order.status !== 'completed' && order.status !== 'cancelled' ? (
                                            <div className="inline-block">
                                                {order.status === 'pending' && (
                                                    <button onClick={() => updateStatus(order.id, 'paid')} className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-700 transition">Terima Pembayaran</button>
                                                )}
                                                {order.status === 'paid' && (
                                                    <button onClick={() => updateStatus(order.id, 'shipped')} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition">Kirim Barang</button>
                                                )}
                                                {order.status === 'shipped' && (
                                                    <button onClick={() => updateStatus(order.id, 'completed')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 transition">Selesaikan Pesanan</button>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400 font-semibold">-</span>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        Belum ada pesanan yang masuk.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
