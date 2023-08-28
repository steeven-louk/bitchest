<?php

namespace App\Http\Controllers;

use App\Models\crypto_history;
use Illuminate\Http\Request;

class CryptoHistoryController extends Controller
{
    //
    public function index()
    {
        $data = crypto_history::all();
        return response()->json($data);
    }

    public function store()
    {
        $details=[
            'crypto_name' => $crypto_name,
            'logo'=> $logo,
            'price'=> $price,
            'quantity'=> $quantity,
            'cotation'=> $cotation,
        ];

        crypto_history::create($details);
    }
}
