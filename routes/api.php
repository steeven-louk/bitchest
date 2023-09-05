<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ClientWalletsController;
use App\Http\Controllers\CotationServiceController;
use App\Http\Controllers\CryptoCurrenciesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    
    return $request->user();
});

// Route::get('/api/admin/get-users', [AdminController::class, "index"]);
Route::apiResource('/admin/get-users', AdminController::class);
Route::apiResource('/admin/update-user', AdminController::class);
Route::get('/get-currencies', [CryptoCurrenciesController::class, "index"]);
Route::get('/get-wallets/{id}', [ClientWalletsController::class, "index"]);
Route::get('/get-cotation/{cotation}', [CotationServiceController::class, "index"]);
Route::post('/sell-crypto/{id}', [CryptoCurrenciesController::class, "sellCrypto"]);
Route::post('/payer-crypto', [CryptoCurrenciesController::class, "buyCrypto"]);


Route::get('/get-crypto/{cotation}', [CryptoCurrenciesController::class, "showCrypto"]);
Route::get('/get-user/{email}', [AuthenticatedSessionController::class, "show"]);

// Route::apiResource('/admin/get-users', AdminController::class);
