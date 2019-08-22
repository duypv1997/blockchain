<?php

use Illuminate\Http\Request;

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

Route::group(['as' => 'api.', 'middleware' => 'auth'], function() {
    Route::resource('addressEths', 'AddressEthController')->only('store');
    Route::group(['as' => 'transactions'], function() {
        Route::get('transactions', 'TransactionController@getAll')->name('getAll');
    });
});

Route::group(['as' => 'api.users'], function() {
    Route::post('users/getCode', 'UserController@getCode')->name('getCode');
});