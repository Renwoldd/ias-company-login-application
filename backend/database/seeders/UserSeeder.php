<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // ACME Users
        User::create([
            'username' => 'alice',
            'email' => 'alice@acme.com',
            'password' => Hash::make('Passw0rd!'),
            'full_name' => 'Alice Johnson',
            'company_id' => 1,
            'is_active' => true,
        ]);

        User::create([
            'username' => 'john',
            'email' => 'john@acme.com',
            'password' => Hash::make('Passw0rd!'),
            'full_name' => 'John Smith',
            'company_id' => 1,
            'is_active' => true,
        ]);

        // BETA Users
        User::create([
            'username' => 'bob',
            'email' => 'bob@beta.com',
            'password' => Hash::make('Passw0rd!'),
            'full_name' => 'Bob Williams',
            'company_id' => 2,
            'is_active' => true,
        ]);

        User::create([
            'username' => 'mary',
            'email' => 'mary@beta.com',
            'password' => Hash::make('Passw0rd!'),
            'full_name' => 'Mary Brown',
            'company_id' => 2,
            'is_active' => true,
        ]);

        // GAMMA Users
        User::create([
            'username' => 'charlie',
            'email' => 'charlie@gamma.com',
            'password' => Hash::make('Passw0rd!'),
            'full_name' => 'Charlie Davis',
            'company_id' => 3,
            'is_active' => true,
        ]);

        User::create([
            'username' => 'diana',
            'email' => 'diana@gamma.com',
            'password' => Hash::make('Passw0rd!'),
            'full_name' => 'Diana Wilson',
            'company_id' => 3,
            'is_active' => true,
        ]);

        User::create([
            'username' => 'eve',
            'email' => 'eve@gamma.com',
            'password' => Hash::make('Passw0rd!'),
            'full_name' => 'Eve Martinez',
            'company_id' => 3,
            'is_active' => true,
        ]);

        User::create([
            'username' => 'frank',
            'email' => 'frank@acme.com',
            'password' => Hash::make('Passw0rd!'),
            'full_name' => 'Frank Anderson',
            'company_id' => 1,
            'is_active' => true,
        ]);
    }
}
