<x-store-layout>
    <div class="bg-gray-100 py-12 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold text-gray-900 tracking-tight">Keranjang Belanja</h1>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        @if ($errors->any())
            <div class="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {{ $errors->first() }}
            </div>
        @endif

        @if(empty($cart))
            <div class="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <h3 class="mt-4 text-xl font-bold text-gray-900">Keranjang masih kosong</h3>
                <p class="mt-2 text-gray-500">Mulai temukan smartphone impianmu sekarang.</p>
                <a href="{{ route('home') }}" class="mt-6 inline-block bg-[#FF6900] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-200">Mulai Belanja</a>
            </div>
        @else
            <div class="flex flex-col lg:flex-row gap-8">
                <div class="lg:w-2/3">
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <ul class="divide-y divide-gray-100">
                            @php $total = 0; @endphp
                            @foreach($cart as $id => $item)
                                @php $total += $item['price'] * $item['quantity']; @endphp
                                <li class="p-6 flex items-center">
                                    <img src="{{ $item['image'] }}" alt="{{ $item['name'] }}" class="w-20 h-20 object-contain rounded-lg bg-gray-50 p-2 border border-gray-100">
                                    <div class="ml-6 flex-1">
                                        <h3 class="text-lg font-bold text-gray-900">{{ $item['name'] }}</h3>
                                        <p class="text-[#FF6900] font-semibold mt-1">Rp {{ number_format($item['price'], 0, ',', '.') }}</p>
                                    </div>
                                    <div class="text-center mr-6">
                                        <span class="text-sm text-gray-500 block mb-1">Kuantitas</span>
                                        <span class="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">{{ $item['quantity'] }}</span>
                                    </div>
                                    <form action="{{ route('cart.remove', $id) }}" method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Hapus">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </form>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>

                <!-- Ringkasan Belanja -->
                <div class="lg:w-1/3">
                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                        <h3 class="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Ringkasan Belanja</h3>
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-gray-500">Total Harga</span>
                            <span class="text-xl font-bold text-gray-900">Rp {{ number_format($total, 0, ',', '.') }}</span>
                        </div>
                        
                        <form action="{{ route('checkout') }}" method="POST">
                            @csrf
                            @auth
                                <button type="submit" class="w-full bg-[#FF6900] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200 mt-4">
                                    Checkout Sekarang
                                </button>
                            @else
                                <a href="{{ route('login') }}" class="block text-center w-full bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition mt-4">
                                    Login untuk Checkout
                                </a>
                            @endauth
                        </form>
                    </div>
                </div>
            </div>
        @endif
    </div>
</x-store-layout>
