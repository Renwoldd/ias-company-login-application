<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserSubmoduleSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // Alice (User 1) - Full admin access
        $aliceSubmodules = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        foreach ($aliceSubmodules as $submoduleId) {
            DB::table('user_submodule')->insert([
                'user_id' => 1,
                'submodule_id' => $submoduleId,
                'granted_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // John (User 2) - Operations access
        $johnSubmodules = [8, 9, 10, 11, 12, 13];
        foreach ($johnSubmodules as $submoduleId) {
            DB::table('user_submodule')->insert([
                'user_id' => 2,
                'submodule_id' => $submoduleId,
                'granted_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Bob (User 3) - Admin access
        $bobSubmodules = [1, 2, 3, 4, 5, 6, 7];
        foreach ($bobSubmodules as $submoduleId) {
            DB::table('user_submodule')->insert([
                'user_id' => 3,
                'submodule_id' => $submoduleId,
                'granted_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Mary (User 4) - Reports only
        $marySubmodules = [6, 7];
        foreach ($marySubmodules as $submoduleId) {
            DB::table('user_submodule')->insert([
                'user_id' => 4,
                'submodule_id' => $submoduleId,
                'granted_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Charlie (User 5) - Dashboard and Inventory
        $charlieSubmodules = [8, 9, 10, 11];
        foreach ($charlieSubmodules as $submoduleId) {
            DB::table('user_submodule')->insert([
                'user_id' => 5,
                'submodule_id' => $submoduleId,
                'granted_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Diana (User 6) - Orders only
        $dianaSubmodules = [12, 13];
        foreach ($dianaSubmodules as $submoduleId) {
            DB::table('user_submodule')->insert([
                'user_id' => 6,
                'submodule_id' => $submoduleId,
                'granted_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Eve (User 7) - Full access
        $eveSubmodules = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        foreach ($eveSubmodules as $submoduleId) {
            DB::table('user_submodule')->insert([
                'user_id' => 7,
                'submodule_id' => $submoduleId,
                'granted_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Frank (User 8) - Settings and Reports
        $frankSubmodules = [4, 5, 6, 7];
        foreach ($frankSubmodules as $submoduleId) {
            DB::table('user_submodule')->insert([
                'user_id' => 8,
                'submodule_id' => $submoduleId,
                'granted_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
