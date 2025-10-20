<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Module;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        // Administration System Modules
        Module::create(['system_id' => 1, 'name' => 'User Management', 'code' => 'USER_MGMT', 'icon' => 'users']);
        Module::create(['system_id' => 1, 'name' => 'Settings', 'code' => 'SETTINGS', 'icon' => 'settings']);
        Module::create(['system_id' => 1, 'name' => 'Reports', 'code' => 'REPORTS', 'icon' => 'chart']);

        // Operations System Modules
        Module::create(['system_id' => 2, 'name' => 'Dashboard', 'code' => 'DASHBOARD', 'icon' => 'home']);
        Module::create(['system_id' => 2, 'name' => 'Inventory', 'code' => 'INVENTORY', 'icon' => 'box']);
        Module::create(['system_id' => 2, 'name' => 'Orders', 'code' => 'ORDERS', 'icon' => 'shopping-cart']);
    }
}
