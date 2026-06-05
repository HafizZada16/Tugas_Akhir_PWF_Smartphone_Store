<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $request->validate([
            'selected_items' => 'required|array|min:1',
            'quantities' => 'required|array'
        ], [
            'selected_items.required' => 'Pilih setidaknya satu produk untuk di-checkout!'
        ]);

        $cart = session()->get('cart', []);
        
        DB::beginTransaction();
        try {
            $totalPrice = 0;
            $itemsToCheckout = [];

            // Validasi & Kalkulasi
            foreach ($request->selected_items as $id) {
                if (!isset($cart[$id])) continue;
                
                $product = Product::findOrFail($id);
                $qty = (int) ($request->quantities[$id] ?? 1);

                if ($qty < 1) throw new \Exception("Kuantitas tidak valid.");
                if ($product->stock < $qty) throw new \Exception("Stok tidak mencukupi untuk " . $product->name);

                $totalPrice += $product->price * $qty;
                $itemsToCheckout[] = [
                    'id' => $id,
                    'price' => $product->price,
                    'quantity' => $qty
                ];
            }

            if(empty($itemsToCheckout)) throw new \Exception("Tidak ada produk valid yang dipilih.");

            $order = Order::create([
                'user_id' => auth()->id(),
                'total_price' => $totalPrice,
                'status' => 'pending',
            ]);

            foreach ($itemsToCheckout as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);

                Product::where('id', $item['id'])->decrement('stock', $item['quantity']);
                
                // Hapus produk yang di-checkout dari session keranjang
                unset($cart[$item['id']]);
            }

            DB::commit();
            session()->put('cart', $cart);

            return redirect()->route('orders.index')->with('success', 'Pesanan berhasil dibuat! Menunggu pengiriman.');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Gagal checkout: ' . $e->getMessage()]);
        }
    }

    public function userOrders()
    {
        $orders = Order::where('user_id', auth()->id())->with('items.product')->latest()->get();
        return view('orders.user_index', compact('orders'));
    }

    public function adminOrders()
    {
        Gate::authorize('admin');
        $orders = Order::with(['user', 'items.product'])->latest()->get();
        return view('admin.orders.index', compact('orders'));
    }

    public function updateStatus(Request $request, Order $order)
    {
        Gate::authorize('admin');
        
        $request->validate([
            'status' => 'required|in:pending,paid,shipped,completed,cancelled'
        ]);

        $order->update(['status' => $request->status]);
        
        return redirect()->back()->with('success', 'Status pesanan #' . $order->id . ' berhasil diperbarui.');
    }
}
