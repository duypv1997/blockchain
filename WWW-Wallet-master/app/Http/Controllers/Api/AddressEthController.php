<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\AddressEth;
use App\Http\Controllers\Controller;
use App\Services\Utils;

class AddressEthController extends Controller
{
    public function store(Request $request)
    {
        $qrPath = Utils::makeQrCode($request->address);
        $request->merge(['qr_path' => $qrPath]);

        $addressEth = AddressEth::create($request->all());
        return $addressEth;
    }
}
