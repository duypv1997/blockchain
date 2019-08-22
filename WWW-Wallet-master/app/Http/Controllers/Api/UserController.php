<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Jobs\SendCode;

class UserController extends Controller
{
    public function getCode(Request $request)
    {
        $hash = bcrypt(Carbon::now()->timestamp);
        $request->merge(['code' => rand(100000, 999999)]);
        $request->session()->push($hash, $request->all());

        dispatch(new SendCode($request->all()));

        return $hash;
    }
}
