<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Regular User
        User::create([
            'name' => 'Pelanggan 1',
            'email' => 'user@user.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // Categories
        $cat1 = Category::create(['name' => 'Xiaomi Series']);
        $cat2 = Category::create(['name' => 'Redmi Series']);
        $cat3 = Category::create(['name' => 'POCO Phones']);

        // Products
        Product::create([
            'category_id' => $cat1->id,
            'name' => 'Xiaomi 14',
            'description' => 'Lensa optik Leica Summilux | Snapdragon® 8 Gen 3 Mobile Platform',
            'price' => 11999000,
            'stock' => 50,
            'image' => 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1710926593.75051610!400x400.png'
        ]);

        Product::create([
            'category_id' => $cat2->id,
            'name' => 'Redmi Note 13 Pro 5G',
            'description' => 'Kamera ultra-jernih 200 MP dengan OIS | Layar AMOLED 1.5K 120Hz',
            'price' => 4399000,
            'stock' => 100,
            'image' => 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1708688463.38575971!400x400.png'
        ]);
        
        Product::create([
            'category_id' => $cat3->id,
            'name' => 'POCO X6 Pro 5G',
            'description' => 'MediaTek Dimensity 8300-Ultra | 120Hz FIow AMOLED',
            'price' => 4999000,
            'stock' => 30,
            'image' => 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1706691438.38459424!400x400.png'
        ]);
    }
}
