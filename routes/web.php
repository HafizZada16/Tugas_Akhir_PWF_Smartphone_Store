<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('landing');

Route::get('/store', [ProductController::class, 'index'])->name('home');
Route::resource('products', ProductController::class)->except(['index']);

// Cart Routes
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add/{product}', [CartController::class, 'add'])->name('cart.add');
Route::patch('/cart/update/{product}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/remove/{product}', [CartController::class, 'remove'])->name('cart.remove');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        if (auth()->user()->role !== 'admin') {
            return redirect()->route('home');
        }
        
        $products = \App\Models\Product::with('category')->latest()->get();
        return Inertia::render('Dashboard', ['products' => $products]);
    })->name('dashboard');

    // Checkout & User Orders
    Route::post('/checkout', [OrderController::class, 'checkout'])->name('checkout');
    Route::get('/my-orders', [OrderController::class, 'userOrders'])->name('orders.index');

    // Admin Orders
    Route::get('/admin/orders', [OrderController::class, 'adminOrders'])->name('admin.orders.index');
    Route::patch('/admin/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('admin.orders.status');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
