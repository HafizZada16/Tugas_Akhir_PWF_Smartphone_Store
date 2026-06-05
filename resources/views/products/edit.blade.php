<x-admin-layout>
    <x-slot name="header">Edit Produk: {{ $product->name }}</x-slot>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
        <form action="{{ route('products.update', $product->id) }}" method="POST">
            @csrf
            @method('PUT')
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Kiri: Detail Dasar -->
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Produk</label>
                        <input type="text" name="name" value="{{ old('name', $product->name) }}" class="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm" required>
                        @error('name') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                        <select name="category_id" class="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm" required>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ $product->category_id == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                            @endforeach
                        </select>
                        @error('category_id') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Produk</label>
                        <textarea name="description" rows="4" class="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm" required>{{ old('description', $product->description) }}</textarea>
                        @error('description') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- Kanan: Harga & Gambar -->
                <div class="space-y-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Harga (Rp)</label>
                            <input type="number" name="price" value="{{ old('price', $product->price) }}" class="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm" required>
                            @error('price') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Stok</label>
                            <input type="number" name="stock" value="{{ old('stock', $product->stock) }}" class="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm" required>
                            @error('stock') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">URL Gambar Produk</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                            </div>
                            <input type="url" name="image" value="{{ old('image', $product->image) }}" class="w-full pl-10 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm text-sm">
                        </div>
                        @if($product->image)
                            <div class="mt-3 p-2 border border-gray-200 rounded-lg bg-gray-50 flex justify-center">
                                <img src="{{ $product->image }}" alt="Preview" class="h-24 object-contain">
                            </div>
                        @endif
                        @error('image') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
                    </div>
                </div>
            </div>

            <div class="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
                <a href="{{ route('dashboard') }}" class="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition">Batal</a>
                <button type="submit" class="bg-[#FF6900] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                    Simpan Perubahan
                </button>
            </div>
        </form>
    </div>
</x-admin-layout>
