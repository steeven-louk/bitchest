<?php

namespace Database\Seeders;

// use App\Models\cryptoCurrencies;

use App\Models\cryptocurrencies;
use App\Services\CotationServices;
use Illuminate\Database\Seeder;

class CryptoCurrenciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */


    public function run()
    {

        $currency =[
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

        foreach ($currency as $crypto) {

            $firstCotation = CotationServices::getFirstCotation($crypto['name']); // Utilisez CotationService::getFirstCotation()


           cryptocurrencies::create([
            'name' => $crypto['name'],
            // 'initials' => $initials,
            'logo' => $crypto['logo'],

            'cotation' => $firstCotation,
        ]);
        }
    }
}
