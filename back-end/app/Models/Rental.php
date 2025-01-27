<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'location',
        'image',
    ];
}
