<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CompanySeeder::class,
            SystemSeeder::class,
            ModuleSeeder::class,
            SubmoduleSeeder::class,
            UserSeeder::class,
            UserSubmoduleSeeder::class,
        ]);
    }
}
