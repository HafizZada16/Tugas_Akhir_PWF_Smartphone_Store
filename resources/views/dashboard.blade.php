<x-admin-layout>
    <x-slot name="header">Ringkasan Data</x-slot>

    @if (session('success'))
        <div class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center shadow-sm">
            <svg class="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            {{ session('success') }}
        </div>
    @endif

    @can('admin')
        <!-- Stat Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center">
                <div class="p-4 bg-blue-50 text-blue-500 rounded-xl mr-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                </div>
                <div>
                    <p class="text-sm text-gray-500 font-medium">Total Produk</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $products->count() }}</p>
                </div>
            </div>
            <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center">
                <div class="p-4 bg-green-50 text-green-500 rounded-xl mr-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                </div>
                <div>
                    <p class="text-sm text-gray-500 font-medium">Total Stok Tersedia</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $products->sum('stock') }}</p>
                </div>
            </div>
        </div>

        <!-- Table Section -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                <h3 class="text-lg font-bold text-gray-900">Data Smartphone</h3>
                <a href="{{ route('products.create') }}" class="bg-[#FF6900] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    Tambah Produk
                </a>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-100">
                    <thead class="bg-gray-50/50">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Produk</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Harga</th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stok</th>
                            <th class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-50">
                        @forelse($products as $product)
                            <tr class="hover:bg-gray-50/50 transition">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="h-12 w-12 flex-shrink-0 bg-gray-50 rounded-lg p-1 border border-gray-100">
                                            <img src="{{ $product->image }}" class="h-full w-full object-contain" alt="">
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-bold text-gray-900">{{ $product->name }}</div>
                                            <div class="text-xs text-gray-500 w-48 truncate">{{ $product->description }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                        {{ $product->category->name }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-bold text-gray-900">Rp {{ number_format($product->price, 0, ',', '.') }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    @if($product->stock > 10)
                                        <span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-800 border border-green-200">
                                            {{ $product->stock }} Unit
                                        </span>
                                    @elseif($product->stock > 0)
                                        <span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-yellow-100 text-yellow-800 border border-yellow-200">
                                            Sisa {{ $product->stock }}
                                        </span>
                                    @else
                                        <span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-red-100 text-red-800 border border-red-200">
                                            Habis
                                        </span>
                                    @endif
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex justify-end gap-2">
                                        <a href="{{ route('products.edit', $product->id) }}" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        </a>
                                        <form action="{{ route('products.destroy', $product->id) }}" method="POST" class="inline-block" onsubmit="return confirm('Hapus produk ini secara permanen?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Hapus">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                                    Belum ada produk yang ditambahkan.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    @else
        <!-- User Area -->
        <div class="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 class="text-3xl font-bold mb-4 text-gray-900">Selamat Datang, {{ Auth::user()->name }}!</h3>
            <p class="text-lg text-gray-500 mb-8">Anda siap untuk menemukan smartphone impian?</p>
            <a href="{{ route('home') }}" class="inline-block bg-[#FF6900] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200">Mulai Belanja</a>
        </div>
    @endcan
</x-admin-layout>
