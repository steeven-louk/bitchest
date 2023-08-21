<?php

namespace App\Services;

class CotationServices
{
    public static function getFirstCotation($cryptoname)
    {
        return ord(substr($cryptoname, 0, 1)) + rand(0, 10);
    }

    public static function getCotationFor($cryptoname)
    {
        return ((rand(0, 99) > 40) ? 1 : -1) * ((rand(0, 99) > 49) ? ord(substr($cryptoname, 0, 1)) : ord(substr($cryptoname, -1))) * (rand(1, 10) * 0.01);
    }
}