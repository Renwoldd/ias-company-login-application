<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Submodule;

class SubmoduleSeeder extends Seeder
{
    public function run(): void
    {
        // User Management submodules
        Submodule::create(['module_id' => 1, 'name' => 'Users', 'code' => 'USERS', 'route' => '/users']);
        Submodule::create(['module_id' => 1, 'name' => 'Roles', 'code' => 'ROLES', 'route' => '/roles']);
        Submodule::create(['module_id' => 1, 'name' => 'Permissions', 'code' => 'PERMISSIONS', 'route' => '/permissions']);

        // Settings submodules
        Submodule::create(['module_id' => 2, 'name' => 'General', 'code' => 'GENERAL', 'route' => '/settings/general']);
        Submodule::create(['module_id' => 2, 'name' => 'Security', 'code' => 'SECURITY', 'route' => '/settings/security']);

        // Reports submodules
        Submodule::create(['module_id' => 3, 'name' => 'Sales Report', 'code' => 'SALES_REPORT', 'route' => '/reports/sales']);
        Submodule::create(['module_id' => 3, 'name' => 'User Activity', 'code' => 'USER_ACTIVITY', 'route' => '/reports/activity']);

        // Dashboard submodules
        Submodule::create(['module_id' => 4, 'name' => 'Overview', 'code' => 'OVERVIEW', 'route' => '/dashboard/overview']);
        Submodule::create(['module_id' => 4, 'name' => 'Analytics', 'code' => 'ANALYTICS', 'route' => '/dashboard/analytics']);

        // Inventory submodules
        Submodule::create(['module_id' => 5, 'name' => 'Products', 'code' => 'PRODUCTS', 'route' => '/inventory/products']);
        Submodule::create(['module_id' => 5, 'name' => 'Stock', 'code' => 'STOCK', 'route' => '/inventory/stock']);

        // Orders submodules
        Submodule::create(['module_id' => 6, 'name' => 'Order List', 'code' => 'ORDER_LIST', 'route' => '/orders/list']);
        Submodule::create(['module_id' => 6, 'name' => 'New Order', 'code' => 'NEW_ORDER', 'route' => '/orders/new']);
    }
}
