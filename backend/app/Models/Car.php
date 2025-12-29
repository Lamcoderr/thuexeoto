<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'name',
        'brand',
        'price',
        'seats',
        'license_plate',
        'description',
        'image',
    ];
}
