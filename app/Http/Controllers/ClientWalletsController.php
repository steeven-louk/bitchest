<?php

namespace App\Http\Controllers;

use App\Models\client_wallets;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientWalletsController extends Controller
{
    public function index($user_id)
    {
        try {
            //recuperation du portfeuille d'un client specifique
            $wallets = client_wallets::where("user_id", $user_id)->get();
            return response()->json($wallets,200);
        } catch (Error $error) {
           return response()->json($error, 500);
        }

       
    }
}
