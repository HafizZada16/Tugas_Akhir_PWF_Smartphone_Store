<x-store-layout>
    <div class="bg-gray-100 py-12 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold text-gray-900 tracking-tight">Keranjang Belanja</h1>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        @if ($errors->any())
            <div class="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl font-medium shadow-sm">
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
            <!-- AlpineJS Component -->
            <form action="{{ route('checkout') }}" method="POST"
                x-data="{
                    items: {
                        @foreach($cart as $id => $item)
                            '{{ $id }}': {
                                price: {{ $item['price'] }},
                                quantity: {{ $item['quantity'] }},
                                selected: true
                            },
                        @endforeach
                    },
                    get total() {
                        let sum = 0;
                        for (let id in this.items) {
                            if (this.items[id].selected) {
                                sum += this.items[id].price * this.items[id].quantity;
                            }
                        }
                        return sum;
                    },
                    get count() {
                        let c = 0;
                        for (let id in this.items) {
                            if (this.items[id].selected) c++;
                        }
                        return c;
                    },
                    get allSelected() {
                        let totalItems = Object.keys(this.items).length;
                        return totalItems > 0 && this.count === totalItems;
                    },
                    toggleAll() {
                        let newState = !this.allSelected;
                        for (let id in this.items) {
                            this.items[id].selected = newState;
                        }
                    },
                    formatMoney(amount) {
                        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
                    }
                }"
            >
                @csrf
                <div class="flex flex-col lg:flex-row gap-8">
                    <div class="lg:w-2/3">
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                            <!-- Select All Header -->
                            <div class="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                <label class="flex items-center cursor-pointer">
                                    <input type="checkbox" :checked="allSelected" @change="toggleAll()" class="w-5 h-5 text-[#FF6900] border-gray-300 rounded focus:ring-[#FF6900] transition">
                                    <span class="ml-3 text-sm font-bold text-gray-900 uppercase">Pilih Semua Produk</span>
                                </label>
                                <span class="text-sm text-gray-500 font-medium"><span x-text="count"></span> Barang Dipilih</span>
                            </div>

                            <ul class="divide-y divide-gray-100">
                                @foreach($cart as $id => $item)
                                    <li class="p-6 flex items-center transition hover:bg-gray-50/30" :class="items['{{ $id }}'].selected ? 'bg-orange-50/30' : ''">
                                        <!-- Checkbox Individual -->
                                        <input type="checkbox" name="selected_items[]" value="{{ $id }}" x-model="items['{{ $id }}'].selected" class="w-5 h-5 text-[#FF6900] border-gray-300 rounded focus:ring-[#FF6900] transition mr-4">
                                        
                                        <img src="{{ $item['image'] }}" alt="{{ $item['name'] }}" class="w-24 h-24 object-contain rounded-xl bg-gray-50 p-2 border border-gray-100">
                                        
                                        <div class="ml-6 flex-1">
                                            <h3 class="text-lg font-bold text-gray-900 leading-tight mb-1">{{ $item['name'] }}</h3>
                                            <p class="text-[#FF6900] font-bold text-lg mb-3">Rp {{ number_format($item['price'], 0, ',', '.') }}</p>
                                            
                                            <!-- Kuantitas Dinamis -->
                                            <div class="flex items-center">
                                                <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                                    <button type="button" @click="if(items['{{ $id }}'].quantity > 1) items['{{ $id }}'].quantity--" class="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition focus:outline-none font-bold text-lg">
                                                        -
                                                    </button>
                                                    <input type="number" name="quantities[{{ $id }}]" x-model="items['{{ $id }}'].quantity" min="1" class="w-16 text-center border-none focus:ring-0 text-sm font-bold text-gray-900 p-0 m-0" readonly>
                                                    <button type="button" @click="items['{{ $id }}'].quantity++" class="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition focus:outline-none font-bold text-lg">
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="ml-4">
                                            <!-- Hapus Individual dengan Form Terpisah agar aman (tidak submit form checkout) -->
                                            <button type="button" onclick="document.getElementById('form-delete-{{ $id }}').submit();" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="Hapus Barang">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>

                    <!-- Ringkasan Belanja -->
                    <div class="lg:w-1/3">
                        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                            <h3 class="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Ringkasan Belanja</h3>
                            
                            <div class="flex justify-between items-center mb-6">
                                <span class="text-gray-500">Total Harga (<span x-text="count"></span> barang)</span>
                                <span class="text-2xl font-black text-[#FF6900]" x-text="formatMoney(total)"></span>
                            </div>
                            
                            @auth
                                <button type="submit" :disabled="count === 0" :class="count === 0 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-[#FF6900] text-white hover:bg-orange-600 shadow-lg shadow-orange-200'" class="w-full py-3 rounded-xl font-bold transition">
                                    Checkout Sekarang
                                </button>
                                <p x-show="count === 0" class="text-xs text-red-500 text-center mt-3 font-medium">Pilih setidaknya 1 barang untuk dicheckout.</p>
                            @else
                                <a href="{{ route('login') }}" class="block text-center w-full bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition mt-4">
                                    Login untuk Checkout
                                </a>
                            @endauth
                        </div>
                    </div>
                </div>
            </form>

            <!-- Hidden Forms for Deletion -->
            @foreach($cart as $id => $item)
                <form id="form-delete-{{ $id }}" action="{{ route('cart.remove', $id) }}" method="POST" class="hidden">
                    @csrf
                    @method('DELETE')
                </form>
            @endforeach
        @endif
    </div>
</x-store-layout>
