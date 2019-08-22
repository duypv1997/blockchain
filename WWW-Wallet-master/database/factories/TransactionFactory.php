<?php

use Carbon\Carbon;

$factory->define(App\Models\Transaction::class, function () {
    $adress1 = '0xdcF632bF2408b341E0D7782fa48D1A29cB5EB35c';
    $adress2 = '0x23882E48D04ae7c0Fa3d377cCc3B223E8F076172';
    $t = rand(0, 1);
    return [
        'coin' => rand(0, 1) ? 'eth' : 'www',
        'block_number' => rand(100000, 999999),
        'contract_address' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'block_hash' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'block_timestamp' => Carbon::now()->timestamp,
        'txid' => str_random(20),
        'from_address' => $t ? $adress1 : $adress2,
        'to_address' => !$t ? $adress1 : $adress2,
        'amount' => rand(0.1, 2.2),
        'log_id' => str_random(20),
        'tx_status' => 'Success',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ];
});
