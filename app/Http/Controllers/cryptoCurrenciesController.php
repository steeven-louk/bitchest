<?php

namespace App\Http\Controllers;

use App\Models\client_wallets;
use App\Models\crypto_history;
use App\Models\cryptocurrencies;
use App\Models\User;
use App\Services\CotationServices;
use Error;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CryptoCurrenciesController extends Controller
{
    //
    public function index()
    {
       try {
        $crypto = cryptocurrencies::all();

        return response()->json($crypto, 200);
       } catch (Error $error) {
        throw $error;
        return response()->json($error);
       }
    }


    public function sellCrypto(Request $request,$user_id, $id)
    {
        try {
            $user = User::where('id',$user_id)->first();
            
            if(!$user) return response()->json("user not found", 404);
            // $crypto_id = $request->input('id');
            $crypto_name = $request->input('crypto_name');
            $logo = $request->input('logo');
            $price = $request->input('price');
            $quantity = $request->input('quantity');
            $cotation = $request->input('cotation');

            $user-> solde += $price;
            $user->save();

            $cryptoHistory = new crypto_history();
            $cryptoHistory -> crypto_name = $crypto_name;
            $cryptoHistory -> logo = $logo;
            $cryptoHistory -> price = $price;
            $cryptoHistory -> quantity = $quantity;
            $cryptoHistory -> cotation = $cotation;
            $cryptoHistory -> transaction_type = 'sell';
            $cryptoHistory -> user_id = $user_id;
            $cryptoHistory -> timestamp = now();
            
            $cryptoHistory -> save();
          


            $getCrypto = client_wallets::findOrFail($id);
           if($getCrypto)  {$getCrypto->delete();}

            return response()->json(['message' => 'Crypto sale successful.'], 200);
    
        } catch (\Exception $e) {
        return response()->json(['message' => 'Error selling crypto', 'error' => $e], 500);
    }
}

    public function buyCrypto(Request $request, $user_id)
    {
        try {

            $user= User::where('id', $user_id)->first();
            if(!$user){
                return response()->json('user not found', 404);
            }
            else{
                $crypto_name = $request->input('name');
                $logo = $request->input('logo');
                $price = $request->input('price');
                $quantity = $request->input('quantity');
                $cotation = $request->input('cotation');
    
                // Sufficient balance, deduct the cost
                if($user->solde < $price) return response()->json('insufficient balance', 200);
                $user->solde -= $price;
                $user->save();


                $addInWallet = new client_wallets();
                $addInWallet -> user_id = $user_id;
                $addInWallet -> name = $crypto_name;
                $addInWallet -> logo = $logo;
                $addInWallet -> quantity = $quantity;
                $addInWallet -> cotation = $cotation;
                $addInWallet -> price = $price;
                $addInWallet -> save();

    
                $cryptoHistory = new crypto_history();
                $cryptoHistory -> crypto_name = $crypto_name;
                $cryptoHistory -> logo = $logo;
                $cryptoHistory -> price = $price;
                $cryptoHistory -> quantity = $quantity;
                $cryptoHistory -> cotation = $cotation;
                $cryptoHistory -> transaction_type = 'buy';
                $cryptoHistory -> user_id = $user_id;
                $cryptoHistory -> timestamp = now();
                $cryptoHistory->save();
                return response()->json(['message' => 'Crypto buy successfully'],200);
             
            }

     
    
        } catch (\Exception $e) {
        return response()->json(['message' => 'Error buying crypto', 'error' => $e->getMessage()], 500);
    }
    }

    public function showCrypto (Request $request, $cotation )
    {
      
       try {
 
    $data =[];

    for($i = 0; $i< 30; $i++){
        $date = now()->subDays($i)->format('Y-m-d');
        $cotation = CotationServices::getCotationFor($cotation);
        $data[]= ['date'=> $date,'cotation'=> $cotation];
    };

           // Date précise que vous souhaitez rechercher (au format 'Y-m-d')
           $datePrecise = now()->format('Y-m-d'); // Remplacez par votre date précise

           // Recherche de la cotation correspondante à la date précise
           $cotationPrecise = null;
           foreach ($data as $item) {
               if ($item['date'] === $datePrecise) {
                   $cotationPrecise = $item['cotation'];
                   break; // Sortir de la boucle dès que la date précise est trouvée
               }
           }
    return response()->json(['cotation'=>$cotationPrecise, "response"=>$data]);
       } catch (\Throwable $th) {
       return response()->json($th);
       }
    }

}
