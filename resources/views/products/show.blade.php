<x-store-layout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-white rounded-3xl p-8 shadow-sm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Image Section -->
                <div class="flex justify-center items-center bg-gray-50 rounded-2xl p-10">
                    <img src="{{ $product->image }}" alt="{{ $product->name }}" class="w-full max-w-md object-contain hover:scale-105 transition duration-500">
                </div>
                
                <!-- Details Section -->
                <div class="flex flex-col justify-center">
                    <div class="text-[#FF6900] font-semibold tracking-wider text-sm mb-2 uppercase">{{ $product->category->name ?? 'Uncategorized' }}</div>
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $product->name }}</h1>
                    <p class="text-gray-600 text-lg mb-8 leading-relaxed">{{ $product->description }}</p>
                    
                    <div class="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                        <div class="text-sm text-gray-500 mb-1">Harga Resmi</div>
                        <div class="text-3xl font-bold text-[#FF6900]">Rp {{ number_format($product->price, 0, ',', '.') }}</div>
                        @if($product->status === 'Tersedia')
                            <div class="mt-4 flex items-center gap-2 text-sm text-green-600 font-medium">
                                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                Tersedia ({{ $product->stock }} unit)
                            </div>
                        @else
                            <div class="mt-4 flex items-center gap-2 text-sm text-red-600 font-medium">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                Stok Habis
                            </div>
                        @endif
                    </div>

                    <div class="flex gap-4">
                        <form action="{{ route('cart.add', $product->id) }}" method="POST" class="flex-1">
                            @csrf
                            <button type="submit" {{ $product->status === 'Habis' ? 'disabled' : '' }} class="w-full {{ $product->status === 'Habis' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF6900] hover:bg-orange-600 shadow-orange-200' }} text-white py-4 rounded-xl font-bold text-lg transition shadow-lg">
                                Beli Sekarang
                            </button>
                        </form>
                        <form action="{{ route('cart.add', $product->id) }}" method="POST">
                            @csrf
                            <button type="submit" {{ $product->status === 'Habis' ? 'disabled' : '' }} class="px-6 py-4 h-full rounded-xl border-2 border-gray-200 text-gray-600 font-bold transition flex items-center justify-center {{ $product->status === 'Habis' ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'hover:border-[#FF6900] hover:text-[#FF6900]' }}">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-store-layout>
