<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/', [AuthenticatedSessionController::class, 'create'])
    ->middleware('guest')
    ->name('login');

    Route::middleware(['auth'])->group(function () {
    
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
            ->name('logout');
    });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboardLayout', function () {
    return Inertia::render('Layouts/DashboardLayout');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/user-management', function () {
    return Inertia::render('admin/UserManagement');
})->middleware(['auth', 'verified'])->name('UserManagement');

Route::get('/portfolio', function () {
    return Inertia::render('portfolio/Portfolio');
})->middleware(['auth', 'verified'])->name('portfolio');

Route::get('/profile', function(){
    return Inertia::render('user/Profile');
})->middleware(['auth', 'verified'])->name('profile');

require __DIR__.'/auth.php';