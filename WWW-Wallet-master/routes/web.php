<?php

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
    return redirect()->route('wallets.index');
});

Route::get('/export-private-key', 'HomeController@exportPrivateKey')->name('exportPrivateKey');

Auth::routes();

Route::group(['middleware' => 'auth'], function() {
    Route::resource('wallets', 'WalletController')->only(['index']);
    Route::resource('deposits', 'DepositController')->only(['index']);
    Route::resource('sendings', 'SendingController')->only(['index']);
    Route::resource('transactions', 'TransactionController')->only(['index']);
});
