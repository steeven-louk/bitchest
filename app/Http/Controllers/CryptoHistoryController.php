<?php

namespace App\Http\Controllers;

use App\Models\crypto_history;
use Illuminate\Http\Request;

class CryptoHistoryController extends Controller
{
    //
    public function index($user_id)
    {
        //recuperation de la liste de crypto dans user specifique
        $data = crypto_history::where('user_id', $user_id)->get();
        return response()->json($data);
    }

}
