<?php

namespace App\Services;

use QR_Code\Types\QR_Text;

class Utils
{
    public static function makeQrCode($text)
    {
        $path = storage_path('app/public/qr_codes/');
        $milliseconds = round(microtime(true) * 1000);
        $filename = "{$milliseconds}.png";
        $qrCode = new QR_Text($text);
        $qrCode->setOutfile("{$path}{$filename}")->setSize(6)->setMargin(2)->png();

        return "/storage/qr_codes/{$filename}";
    }
}