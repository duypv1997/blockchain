<?php

namespace App\Http\Controllers;

class DepositController extends Controller
{
    public function index()
    {
        return view('deposits.index', [
            'title' => 'DEPOSIT',
        ]);
    }
}
