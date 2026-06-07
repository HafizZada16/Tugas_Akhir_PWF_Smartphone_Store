import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: product.name || '',
        category_id: product.category_id || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/products/${product.id}`);
    };

    return (
        <AdminLayout header={`Edit Produk: ${product.name}`}>
            <Head title="Edit Produk" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Kiri: Detail Dasar */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Produk</label>
                                <input 
                                    type="text" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                    className="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm" 
                                    required 
                                />
                                {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                                <select 
                                    value={data.category_id} 
                                    onChange={e => setData('category_id', e.target.value)} 
                                    className="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm" 
                                    required
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <span className="text-red-500 text-xs mt-1">{errors.category_id}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Produk</label>
                                <textarea 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)} 
                                    rows="4" 
                                    className="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm" 
                                    required
                                ></textarea>
                                {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description}</span>}
                            </div>
                        </div>

                        {/* Kanan: Harga & Gambar */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Harga (Rp)</label>
                                    <input 
                                        type="number" 
                                        value={data.price} 
                                        onChange={e => setData('price', e.target.value)} 
                                        className="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm" 
                                        required 
                                    />
                                    {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Stok</label>
                                    <input 
                                        type="number" 
                                        value={data.stock} 
                                        onChange={e => setData('stock', e.target.value)} 
                                        className="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm" 
                                        required 
                                    />
                                    {errors.stock && <span className="text-red-500 text-xs mt-1">{errors.stock}</span>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">URL Gambar Produk</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                                    </div>
                                    <input 
                                        type="file" 
                                        onChange={e => setData('image', e.target.files[0])} 
                                        accept="image/*" 
                                        className="w-full pl-10 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm p-1.5 bg-white" 
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Biarkan kosong jika tidak ingin mengubah gambar.</p>
                                
                                {product.image && (
                                    <div className="mt-3 p-2 border border-gray-200 rounded-lg bg-gray-50 flex justify-center">
                                        <img 
                                            src={product.image.startsWith('http') ? product.image : `/storage/${product.image}`} 
                                            alt="Preview" 
                                            className="h-24 object-contain" 
                                        />
                                    </div>
                                )}
                                
                                {errors.image && <span className="text-red-500 text-xs mt-1">{errors.image}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
                        <Link href="/dashboard" className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition">Batal</Link>
                        <button type="submit" disabled={processing} className="bg-[#FF6900] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200 disabled:opacity-50">
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
