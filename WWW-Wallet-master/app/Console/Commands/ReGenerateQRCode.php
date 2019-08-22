<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\AddressEth;
use App\Services\Utils;

class ReGenerateQRCode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'qr:re-generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Regenerate QR code';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $addressEths = AddressEth::all();
        foreach ($addressEths as $address) {
            $qrPath = Utils::makeQrCode($address->address);
            $address->qr_path = $qrPath;
            $address->save();
        }
    }
}
