<?php

namespace App\Http\Controllers;

use App\Models\cryptocurrencies;
use App\Services\CotationServices;
use Error;
use Illuminate\Http\Request;

class CotationServiceController extends Controller
{
    //
    public function index($cotation)
    {
        try {
     
           $data =CotationServices:: getCotationFor($cotation);

           return response()->json(["message"=>"la cotation est", $data]);
        } catch (Error $error) {
           response()->json(["message"=>"not found",$error],500);
        }
    }
}
