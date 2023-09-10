<?php

namespace Database\Seeders;

use App\Models\client_wallets;
use App\Models\cryptocurrencies;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
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
        // // $cryptos = cryptocurrencies::all();

        // foreach ($users as $user) {
        //     # code...
        //     foreach ($cryptos as $crypto) {
        //         # code...
        //         $walletData =[
        //             'user_id' => $user->id,
        //             'name' => $crypto->id,
        //             'quantity'=> rand(1,100),
        //             // 'purchase_price' => rand(10, 1000),
        //         ];
        //         client_wallets::create($walletData);
        //     }
        // }
        $faker = Faker::create();

        $numberOfRecords = 10;

        foreach (range(1, $numberOfRecords) as $index) {
            $crypto = cryptocurrencies::inRandomOrder()->first(); // Sélectionnez une crypto-monnaie aléatoire

            // Sélectionnez un utilisateur client aléatoire
            $clientUser = User::where('status', 'user')->inRandomOrder()->first();

            DB::table('client_wallets')->insert([
                'name' => $crypto->name, // Utilisez le nom de la crypto-monnaie
                'logo' => $crypto->logo, // Utilisez le logo de la crypto-monnaie
                'price' => $faker->randomFloat(2, 1, 1000),
                'cotation' => $crypto->cotation, // Utilisez la cotation de la crypto-monnaie
                'quantity' => $faker->randomFloat(2, 0.1, 100),
                'user_id' => $clientUser->id, // Utilisez l'ID de l'utilisateur client
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
