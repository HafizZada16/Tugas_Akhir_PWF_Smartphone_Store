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
        $cart = session()->get('cart', []);
        
        if (empty($cart)) {
            return redirect()->back()->withErrors(['error' => 'Keranjang Anda kosong!']);
        }

        DB::beginTransaction();
        try {
            // Hitung total harga
            $totalPrice = 0;
            foreach ($cart as $item) {
                $totalPrice += $item['price'] * $item['quantity'];
            }

            // Buat pesanan
            $order = Order::create([
                'user_id' => auth()->id(),
                'total_price' => $totalPrice,
                'status' => 'pending',
            ]);

            // Simpan detail pesanan & kurangi stok
            foreach ($cart as $id => $item) {
                $product = Product::findOrFail($id);
                
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Stok tidak mencukupi untuk " . $product->name);
                }

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $id,
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);

                $product->decrement('stock', $item['quantity']);
            }

            DB::commit();
            session()->forget('cart');

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

    public function markAsShipped(Order $order)
    {
        Gate::authorize('admin');
        
        $order->update(['status' => 'shipped']);
        
        return redirect()->back()->with('success', 'Status pesanan #' . $order->id . ' diubah menjadi Shipped.');
    }
}
