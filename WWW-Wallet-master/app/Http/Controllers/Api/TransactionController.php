<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Http\Controllers\Controller;

class TransactionController extends Controller
{
    public function getAll(Request $request)
    {
        return Transaction::where('from_address', $request->address)
            ->orWhere('to_address', $request->address)
            ->orderBy('block_timestamp', 'desc')
            ->paginate(10);
    }
}
