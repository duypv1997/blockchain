<?php

namespace App\Http\Controllers;

class WalletController extends Controller
{
    public function index()
    {
        return view('wallets.index', [
            'title' => 'WALLET',
        ]);
    }
}
