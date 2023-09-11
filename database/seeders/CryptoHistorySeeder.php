<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CryptoHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Liste des noms de crypto et leurs logos correspondants
        $cryptoData = [
            ["name" => "bitcoin", "logo"=>"bitcoin"],
            ["name" => "cardano", "logo"=>"cardano"],
            ["name" => "litecoin", "logo"=>"litecoin"],
            ["name" => "dash", "logo"=>"dash"],
            ["name" => "ethereum", "logo"=>"ethereum"],
            ["name" => "iota", "logo"=>"iota"],
            ["name" => "nem", "logo"=>"nem"],
            ["name" => "ripple", "logo"=>"ripple"],
            ["name" => "stellar", "logo"=>"stellar"],
        ];
            // Nombre de lignes à insérer
            $numRecords = 60; 

            foreach (range(1, $numRecords) as $index) {
                $crypto = $faker->randomElement($cryptoData);
    
                DB::table('crypto_histories')->insert([
                    'crypto_name' => $crypto['name'],
                    'logo' => $crypto['logo'], // Utilisez le nom de la crypto comme nom de logo
                    'price' => $faker->randomFloat(2, 10, 1000),
                    'quantity' => $faker->randomFloat(2, 0.01, 100),
                    'transaction_type' => $faker->randomElement(['Achat', 'Vente']),
                    'cotation' => $faker->randomFloat(2, 1, 500),
                    'user_id' => $faker->numberBetween(1, 10),
                    'timestamp' => $faker->dateTimeThisDecade($max = 'now', $timezone = null),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }    

    


