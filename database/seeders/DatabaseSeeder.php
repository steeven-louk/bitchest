<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(30)->create();
        $this->call(CryptoCurrenciesSeeder::class);
        $this->call(ClientWalletsSeeder::class);
        $this->call(CryptoHistorySeeder::class);
    }
}
