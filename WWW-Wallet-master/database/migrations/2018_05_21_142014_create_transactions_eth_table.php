<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsEthTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions_eth', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('coin');
            $table->string('contract_address')->index();
            $table->integer('block_number')->index();
            $table->string('block_hash')->index();
            $table->bigInteger('block_timestamp')->index();
            $table->string('txid');
            $table->string('from_address')->index();
            $table->string('to_address')->index();
            $table->string('amount');
            $table->string('tx_status');
            $table->string('log_id');
            $table->unique(['txid', 'log_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions_eth');
    }
}
