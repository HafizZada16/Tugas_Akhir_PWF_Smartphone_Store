<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Tugas Akhir PWF') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-gray-50 text-gray-800 flex flex-col min-h-screen">
    <!-- Topbar/Navbar -->
    <nav class="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <!-- Logo -->
                    <a href="{{ route('landing') }}" class="flex items-center gap-2">
                        <div class="w-10 h-10 bg-[#FF6900] text-white flex items-center justify-center rounded-xl font-bold text-xl">
                            mi
                        </div>
                        <span class="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">Smartphone Store</span>
                    </a>

                    <!-- Navigation Links -->
                    <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex h-full">
                        <a href="{{ route('home') }}" class="inline-flex items-center px-1 pt-1 border-b-2 border-[#FF6900] text-sm font-medium leading-5 text-gray-900 focus:outline-none transition duration-150 ease-in-out">
                            Mobiles
                        </a>
                    </div>
                </div>

                <div class="flex items-center gap-6">
                    <!-- Icon Cart -->
                    <a href="{{ route('cart.index') }}" class="relative text-gray-600 hover:text-[#FF6900] transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        @if(session()->has('cart') && count(session('cart')) > 0)
                            <span class="absolute -top-2 -right-2 bg-[#FF6900] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {{ count(session('cart')) }}
                            </span>
                        @endif
                    </a>

                    @auth
                        @if(Auth::user()->role === 'admin')
                            <a href="{{ route('dashboard') }}" class="text-sm text-blue-600 font-bold hover:underline">Panel Admin</a>
                        @endif

                        <!-- User Dropdown (AlpineJS) -->
                        <div x-data="{ open: false }" class="relative">
                            <button @click="open = !open" @click.away="open = false" class="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-[#FF6900] focus:outline-none transition">
                                {{ Auth::user()->name }}
                                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </button>
                            
                            <!-- Dropdown Menu -->
                            <div x-show="open" style="display: none;" 
                                 x-transition:enter="transition ease-out duration-200"
                                 x-transition:enter-start="opacity-0 scale-95"
                                 x-transition:enter-end="opacity-100 scale-100"
                                 x-transition:leave="transition ease-in duration-75"
                                 x-transition:leave-start="opacity-100 scale-100"
                                 x-transition:leave-end="opacity-0 scale-95"
                                 class="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                                
                                <div class="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                                    <p class="text-sm font-semibold text-gray-900 truncate">{{ Auth::user()->name }}</p>
                                    <p class="text-xs text-gray-500 truncate">{{ Auth::user()->email }}</p>
                                </div>

                                <a href="{{ route('profile.edit') }}" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF6900] transition">Profil Saya</a>
                                <a href="{{ route('orders.index') }}" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF6900] transition border-t border-gray-50">Pesanan Saya</a>
                                
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit" class="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100 font-medium">Logout</button>
                                </form>
                            </div>
                        </div>
                    @else
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 font-medium hover:text-[#FF6900]">Masuk</a>
                        <a href="{{ route('register') }}" class="text-sm text-gray-700 font-medium hover:text-[#FF6900]">Daftar</a>
                    @endauth
                </div>
            </div>
        </div>
    </nav>

    <!-- Page Content -->
    <main class="flex-grow">
        {{ $slot }}
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            &copy; {{ date('Y') }} Tugas Akhir PWF - H16. All rights reserved.
        </div>
    </footer>
</body>
</html>
