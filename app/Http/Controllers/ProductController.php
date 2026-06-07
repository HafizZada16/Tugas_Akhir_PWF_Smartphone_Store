<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function create()
    {
        Gate::authorize('admin');
        $categories = Category::all();
        return view('products.create', compact('categories'));
    }

    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $this->uploadToSupabase($request->file('image'));
        }

        Product::create($validated);
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
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $this->uploadToSupabase($request->file('image'));
        } else {
            unset($validated['image']); // Don't override if no new image
        }

        $product->update($validated);
        return redirect()->route('dashboard')->with('success', 'Produk berhasil diupdate.');
    }

    private function uploadToSupabase($file)
    {
        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $bucket = 'products'; // Pastikan bucket ini dibuat di Supabase dan diset Public
        
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('SUPABASE_KEY', ''),
            'apikey' => env('SUPABASE_KEY', ''),
        ])->withBody(file_get_contents($file->getRealPath()), $file->getMimeType())
        ->post(env('SUPABASE_URL') . "/storage/v1/object/$bucket/$fileName");
        
        if ($response->successful()) {
            return env('SUPABASE_URL') . "/storage/v1/object/public/$bucket/$fileName";
        }
        
        throw new \Exception('Gagal upload gambar ke Supabase: ' . $response->body());
    }

    public function destroy(Product $product)
    {
        Gate::authorize('admin');
        $product->delete();
        return redirect()->route('dashboard')->with('success', 'Produk berhasil dihapus.');
    }
}
