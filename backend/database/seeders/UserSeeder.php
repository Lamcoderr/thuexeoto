<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Tạo 10 user random có email_verified_at
        User::factory()->count(10)->create([
            'email_verified_at' => now(),
            'role' => 'user'
        ]);

        // Tạo user test
        User::create([
            'name' => 'Nguyen Van A',
            'email' => 'user@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 'user',
            'email_verified_at' => now()
        ]);
    }
}
