<x-store-layout>
    <div class="bg-gray-100 py-12 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold text-gray-900 tracking-tight">Pesanan Saya</h1>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        @if (session('success'))
            <div class="mb-8 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                {{ session('success') }}
            </div>
        @endif

        @if($orders->isEmpty())
            <div class="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                <h3 class="mt-4 text-xl font-bold text-gray-900">Belum ada pesanan</h3>
                <p class="mt-2 text-gray-500">Anda belum pernah melakukan pemesanan.</p>
                <a href="{{ route('home') }}" class="mt-6 inline-block bg-[#FF6900] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-200">Mulai Belanja</a>
            </div>
        @else
            <div class="space-y-6">
                @foreach($orders as $order)
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <span class="text-sm text-gray-500 block">Nomor Pesanan</span>
                                <span class="font-bold text-gray-900">#ORD-{{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }}</span>
                            </div>
                            <div class="text-right">
                                <span class="text-sm text-gray-500 block">Tanggal Pesan</span>
                                <span class="font-medium text-gray-900">{{ $order->created_at->format('d M Y, H:i') }}</span>
                            </div>
                            <div class="text-right">
                                <span class="text-sm text-gray-500 block mb-1">Status</span>
                                @if($order->status === 'pending')
                                    <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">Menunggu Pengiriman</span>
                                @elseif($order->status === 'paid')
                                    <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">Sudah Dibayar</span>
                                @elseif($order->status === 'shipped')
                                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Sedang Dikirim</span>
                                @elseif($order->status === 'completed')
                                    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Selesai</span>
                                @elseif($order->status === 'cancelled')
                                    <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">Dibatalkan</span>
                                @else
                                    <span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold">{{ ucfirst($order->status) }}</span>
                                @endif
                            </div>
                        </div>
                        
                        <div class="p-6">
                            <ul class="divide-y divide-gray-100">
                                @foreach($order->items as $item)
                                    <li class="py-4 flex items-center">
                                        <img src="{{ $item->product->image }}" alt="{{ $item->product->name }}" class="w-16 h-16 object-contain rounded-lg border border-gray-100 p-1">
                                        <div class="ml-4 flex-1">
                                            <h4 class="text-md font-bold text-gray-900">{{ $item->product->name }}</h4>
                                            <p class="text-sm text-gray-500">{{ $item->quantity }} x Rp {{ number_format($item->price, 0, ',', '.') }}</p>
                                        </div>
                                        <div class="font-bold text-gray-900">
                                            Rp {{ number_format($item->quantity * $item->price, 0, ',', '.') }}
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                        
                        <div class="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                            <span class="font-bold text-gray-700">Total Belanja</span>
                            <span class="text-xl font-bold text-[#FF6900]">Rp {{ number_format($order->total_price, 0, ',', '.') }}</span>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
</x-store-layout>
