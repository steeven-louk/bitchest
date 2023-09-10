<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class client_wallets extends Model
{
    use HasFactory;

    protected $fillable =[
        "user_id",
        "name",
        "logo",
        "price",
        "cotation",
        "quantity"
        
    ];

    public function user()
    {
        return $this->BelongsTo(User::class);
    }

    public function cryptocurrency()
    {
        return $this->belongsTo(cryptocurrencies::class);
    }
}
