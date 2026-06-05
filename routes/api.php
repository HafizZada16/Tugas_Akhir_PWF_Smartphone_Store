<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login'])->name('api.login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('api.logout');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Laravel API (CRUD)
Route::name('api.')->group(function () {
    Route::apiResource('products', ProductController::class);
});
