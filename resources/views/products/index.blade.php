<x-store-layout>
    <!-- Banner Section -->
    <div class="bg-gray-100 py-12 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl font-bold text-gray-900 tracking-tight">Semua Produk</h1>
            <p class="mt-4 text-lg text-gray-600">Temukan smartphone impian Anda dengan teknologi terbaru.</p>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        @if (session('success'))
            <div class="mb-8 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                {{ session('success') }}
            </div>
        @endif

        <div class="flex flex-col md:flex-row gap-8">
            <!-- Sidebar Kategori -->
            <aside class="w-full md:w-64 flex-shrink-0">
                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Kategori Produk</h3>
                    <ul class="space-y-2">
                        <li>
                            <a href="{{ route('home') }}" class="block px-4 py-2 rounded-lg transition {{ !request('category') ? 'bg-orange-50 text-[#FF6900] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                                Semua Kategori
                            </a>
                        </li>
                        @foreach($categories as $category)
                            <li>
                                <a href="{{ route('home', ['category' => $category->id]) }}" class="block px-4 py-2 rounded-lg transition {{ request('category') == $category->id ? 'bg-orange-50 text-[#FF6900] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                                    {{ $category->name }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </aside>

            <!-- Main Product Area -->
            <div class="flex-1">
                <!-- Filter Header -->
                <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                    <h2 class="text-xl font-bold text-gray-800">
                        @if(request('category'))
                            Menampilkan: {{ $categories->firstWhere('id', request('category'))->name ?? 'Kategori' }}
                        @else
                            Semua Produk
                        @endif
                    </h2>
                    <div class="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {{ $products->count() }} produk
                    </div>
                </div>

                <!-- Product Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($products as $product)
                <div class="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col group border border-transparent hover:border-gray-100">
                    <a href="{{ route('products.show', $product->id) }}" class="flex-1 flex flex-col">
                        <div class="relative pt-6 px-6 pb-2">
                            <span class="absolute top-4 left-4 bg-orange-100 text-[#FF6900] text-xs font-bold px-2 py-1 rounded">Baru</span>
                            <img src="{{ $product->image }}" alt="{{ $product->name }}" class="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="px-6 text-center flex-1 flex flex-col justify-center">
                            <h3 class="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#FF6900] transition">{{ $product->name }}</h3>
                            <p class="text-sm text-gray-500 mb-2 line-clamp-2">{{ $product->description }}</p>
                        </div>
                    </a>
                    <div class="p-6 text-center mt-auto">
                        <span class="text-[#FF6900] font-bold text-xl block mb-4">Rp {{ number_format($product->price, 0, ',', '.') }}</span>
                        <div class="flex gap-2">
                            <form action="{{ route('cart.add', $product->id) }}" method="POST" class="flex-1">
                                @csrf
                                <button type="submit" class="w-full bg-orange-50 text-[#FF6900] border border-orange-200 py-2 rounded-xl text-sm font-bold hover:bg-orange-100 transition">Keranjang</button>
                            </form>
                            <form action="{{ route('cart.add', $product->id) }}" method="POST" class="flex-1">
                                @csrf
                                <button type="submit" class="w-full bg-[#FF6900] text-white py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200">Beli</button>
                            </form>
                        </div>
                    </div>
                </div>
            @endforeach
                </div>
                
                @if($products->isEmpty())
                    <div class="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <h3 class="mt-2 text-sm font-semibold text-gray-900">Produk tidak ditemukan</h3>
                        <p class="mt-1 text-sm text-gray-500">Belum ada produk untuk kategori ini.</p>
                    </div>
                @endif
                
            </div>
        </div>
    </div>
</x-store-layout>
