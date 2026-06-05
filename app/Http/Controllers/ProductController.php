<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::all();
        $query = Product::with('category')->latest();
        
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }
        
        $products = $query->get();
        return view('products.index', compact('products', 'categories'));
    }

    public function create()
    {
        Gate::authorize('admin');
        $categories = Category::all();
        return view('products.create', compact('categories'));
    }

    public function store(StoreProductRequest $request)
    {
        // Otorisasi sudah dilakukan di StoreProductRequest
        Product::create($request->validated());
        return redirect()->route('dashboard')->with('success', 'Produk berhasil ditambahkan.');
    }

    public function show(Product $product)
    {
        return view('products.show', compact('product'));
    }

    public function edit(Product $product)
    {
        Gate::authorize('admin');
        $categories = Category::all();
        return view('products.edit', compact('product', 'categories'));
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        // Otorisasi sudah dilakukan di UpdateProductRequest
        $product->update($request->validated());
        return redirect()->route('dashboard')->with('success', 'Produk berhasil diupdate.');
    }

    public function destroy(Product $product)
    {
        Gate::authorize('admin');
        $product->delete();
        return redirect()->route('dashboard')->with('success', 'Produk berhasil dihapus.');
    }
}
