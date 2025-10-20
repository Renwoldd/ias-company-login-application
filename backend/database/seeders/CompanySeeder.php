<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        Company::create([
            'name' => 'ACME Corporation',
            'code' => 'ACME',
            'primary_color' => '#233C67',
            'accent_color' => '#1e3a5f',
            'logo_url' => null,
        ]);

        Company::create([
            'name' => 'Beta Industries',
            'code' => 'BETA',
            'primary_color' => '#195719',
            'accent_color' => '#0f3d0f',
            'logo_url' => null,
        ]);

        Company::create([
            'name' => 'Gamma Tech',
            'code' => 'GAMMA',
            'primary_color' => '#7D1515',
            'accent_color' => '#5a0f0f',
            'logo_url' => null,
        ]);
    }
}
