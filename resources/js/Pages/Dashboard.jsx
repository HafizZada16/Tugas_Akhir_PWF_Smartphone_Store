import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ products, flash }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';
    
    // Calculate stats
    const totalProducts = products ? products.length : 0;
    const totalStock = products ? products.reduce((sum, product) => sum + product.stock, 0) : 0;

    return (
        <AdminLayout header="Ringkasan Data">
            <Head title="Dashboard" />

            {flash && flash.success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center shadow-sm">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {flash.success}
                </div>
            )}

            {isAdmin ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center">
                            <div className="p-4 bg-blue-50 text-blue-500 rounded-xl mr-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Total Produk</p>
                                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center">
                            <div className="p-4 bg-green-50 text-green-500 rounded-xl mr-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Total Stok Tersedia</p>
                                <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                            <h3 className="text-lg font-bold text-gray-900">Data Smartphone</h3>
                            <Link href="/products/create" className="bg-[#FF6900] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                Tambah Produk
                            </Link>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Produk</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Harga</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stok</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-50">
                                    {totalProducts > 0 ? products.map(product => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-12 w-12 flex-shrink-0 bg-gray-50 rounded-lg p-1 border border-gray-100">
                                                        <img src={product.image} className="h-full w-full object-contain" alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900">{product.name}</div>
                                                        <div className="text-xs text-gray-500 w-48 truncate">{product.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                    {product.category?.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.stock > 10 ? (
                                                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-800 border border-green-200">
                                                        {product.stock} Unit
                                                    </span>
                                                ) : product.stock > 0 ? (
                                                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-yellow-100 text-yellow-800 border border-yellow-200">
                                                        Sisa {product.stock}
                                                    </span>
                                                ) : (
                                                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-red-100 text-red-800 border border-red-200">
                                                        Habis
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/products/${product.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                    </Link>
                                                    <Link href={`/products/${product.id}`} method="delete" as="button" 
                                                        onClick={(e) => {
                                                            if (!confirm('Hapus produk ini secara permanen?')) {
                                                                e.preventDefault();
                                                            }
                                                        }} 
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Hapus">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                Belum ada produk yang ditambahkan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Selamat Datang, {auth.user.name}!</h3>
                    <p className="text-lg text-gray-500 mb-8">Anda siap untuk menemukan smartphone impian?</p>
                    <Link href="/store" className="inline-block bg-[#FF6900] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200">Mulai Belanja</Link>
                </div>
            )}
        </AdminLayout>
    );
}
