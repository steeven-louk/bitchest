<?php

namespace App\Http\Controllers;

use App\Models\client_wallets;
use App\Models\crypto_history;
use App\Models\cryptocurrencies;
use App\Services\CotationServices;
use Error;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CryptoCurrenciesController extends Controller
{
    //
    public function index()
    {
       try {
        $crypto = cryptocurrencies::all();

        return  Response()->json($crypto, 200);
       } catch (Error $error) {
        throw $error;
        return response()->json($error);
       }
    }


    public function sellCrypto(Request $request, $id)
    {
        try {
            // $crypto_id = $request->input('id');
            $crypto_name = $request->input('crypto_name');
            $logo = $request->input('logo');
            $price = $request->input('price');
            $quantity = $request->input('quantity');
            $cotation = $request->input('cotation');

            $cryptoHistory = new crypto_history();
            $cryptoHistory -> crypto_name = $crypto_name;
            $cryptoHistory -> logo = $logo;
            $cryptoHistory -> price = $price;
            $cryptoHistory -> quantity = $quantity;
            $cryptoHistory -> cotation = $cotation;
            $cryptoHistory -> save();

            $getCrypto = client_wallets::findOrFail($id);
            // if($getCrypto) return response()->json(['message'=>'crypto introuvable']);
           if($getCrypto)  {$getCrypto->delete();}

            return response()->json(['message' => 'Crypto sold successfully']);
    
        } catch (\Exception $e) {
        return response()->json(['message' => 'Error selling crypto', 'error' => $e->getMessage()], 500);
    }
    }

    public function buyCrypto(Request $request)
    {
        try {
            $user_id = $request->input('user_id');
            $cryptocurrency_id = $request->input('cryptocurrency_id');
            $quantity = $request->input('quantity');


            $addInWallet = new client_wallets();

            if($cryptocurrency_id === $addInWallet-> cryptocurrency_id){
                $update = client_wallets::where("cryptocurrency_id", $cryptocurrency_id)->first();
                $update->quantity += $quantity;
                $update->save();
            }
            else{

                $addInWallet -> user_id = $user_id;
                $addInWallet -> cryptocurrency_id = $cryptocurrency_id;
                $addInWallet -> quantity = $quantity;
              
                $addInWallet -> save();
    
                return response()->json(['message' => 'Crypto buy successfully']);
            }
    
        } catch (\Exception $e) {
        return response()->json(['message' => 'Error buying crypto', 'error' => $e->getMessage()], 500);
    }
    }

    public function showCrypto (Request $request, $id )
    {
        // $crypto_id = $request('id');
        // dd($crypto_id);
       try {
        $get_crypto= cryptocurrencies::where('id', $id)->get();

        $day =0;
        $cotation= 'bitcoin';
       for ($i=$day; $i <30; $i++) { 
       $data=CotationServices::getCotationFor($cotation);
        return response()->json([$data, $day[$i]]);
       }

        return response()->json($get_crypto);
       } catch (\Throwable $th) {
       return response()->json($th);
       }
    }
}
