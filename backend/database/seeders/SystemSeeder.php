<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\System;

class SystemSeeder extends Seeder
{
    public function run(): void
    {
        System::create([
            'name' => 'Administration',
            'code' => 'ADMIN',
        ]);

        System::create([
            'name' => 'Operations',
            'code' => 'OPS',
        ]);
    }
}
