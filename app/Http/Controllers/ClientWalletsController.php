<?php

namespace App\Http\Controllers;

use App\Models\client_wallets;
use Error;
use Illuminate\Http\Request;

class ClientWalletsController extends Controller
{
    //
    public function index($id)
    {
        try {
            $wallets = client_wallets::with(["user","cryptocurrency"])->where("user_id", $id)->get();
        return response()->json($wallets,200);
        } catch (Error $error) {
            response()->json($error);
        }
    }
}
