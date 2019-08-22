<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /**
     * Create a new Eloquent model instance.
     *
     * @param  array  $attributes
     * @return void
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->table = (env('MIX_ETH_NETWORK') === 'rinkeby') ? 'transactions_rinkeby' : 'transactions';
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'coin',
        'contract_address',
        'block_number',
        'block_hash',
        'block_timestamp',
        'txid',
        'from_address',
        'to_address',
        'amount',
        'log_id',
        'tx_status',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
