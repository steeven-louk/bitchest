<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cryptocurrencies extends Model
{
    use HasFactory;
    protected $fillable =[
        "id",
        "name",
        "logo",
        "cotation"
    ];

    public function wallets()
    {
        return $this->hasMany(client_wallets::class);
    }
}