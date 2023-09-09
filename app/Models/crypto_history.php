<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class crypto_history extends Model
{
    use HasFactory;

    protected $fillable=[
        "crypto_name",
         "logo" ,
         "price" ,
         "quantity" ,
         "cotation",
         "transaction_type",
         "user_id",
         "timestamp"
    ];
}
