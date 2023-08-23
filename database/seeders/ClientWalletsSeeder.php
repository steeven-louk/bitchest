<?php

namespace Database\Seeders;

use App\Models\client_wallets;
use App\Models\cryptocurrencies;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClientWalletsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::where('status','client')->get();
        $cryptos = cryptocurrencies::all();

        foreach ($users as $user) {
            # code...
            foreach ($cryptos as $crypto) {
                # code...
                $walletData =[
                    'user_id' => $user->id,
                    'cryptocurrency_id' => $crypto->id,
                    'quantity'=> rand(1,100),
                    // 'purchase_price' => rand(10, 1000),
                ];
                client_wallets::create($walletData);
            }
        }
    }
}
