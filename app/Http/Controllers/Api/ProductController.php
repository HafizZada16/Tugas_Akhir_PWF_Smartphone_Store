<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with('category')->latest()->get());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validated = $validator->validated();
        if ($request->hasFile('image')) {
            $validated['image'] = $this->uploadToSupabase($request->file('image'));
        }

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product->load('category'));
    }

    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validated = $validator->validated();
        if ($request->hasFile('image')) {
            $validated['image'] = $this->uploadToSupabase($request->file('image'));
        } else {
            unset($validated['image']); // Don't override if no new image
        }

        $product->update($validated);
        return response()->json($product);
    }

    private function uploadToSupabase($file)
    {
        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $bucket = 'products';
        
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
        $product->delete();
        return response()->json(null, 204);
    }
}
