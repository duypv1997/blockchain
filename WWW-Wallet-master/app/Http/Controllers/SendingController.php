<?php

namespace App\Http\Controllers;

class SendingController extends Controller
{
    public function index()
    {
        return view('sendings.index', [
            'title' => 'SEND',
        ]);
    }
}
