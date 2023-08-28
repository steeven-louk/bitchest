<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCryptoHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crypto_histories', function (Blueprint $table) {
            $table->id();
            $table->string('crypto_name');
            $table->string('logo', 100)->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('quantity', 10, 2);
            $table->float('cotation');
            // $table->timestamp('timestamp');
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
        Schema::dropIfExists('crypto_histories');
    }
}
