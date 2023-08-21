<?php

namespace App\Http\Controllers;

use App\Models\cryptocurrencies;
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
        // dd($crypto);
       return  Response()->json($crypto, 200);
       } catch (Error $error) {
        throw $error;
        return response()->json($error);
       }
    }
}
