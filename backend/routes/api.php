<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\ModuleController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::get('/companies', [CompanyController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/modules', [ModuleController::class, 'index']);
});

// Health check
Route::get('/validate', function () {
    return response()->json(['status' => 'ok', 'message' => 'API is running']);
});
