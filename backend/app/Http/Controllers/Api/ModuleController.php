<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\System;

class ModuleController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get all submodule IDs the user has access to
        $userSubmoduleIds = $user->submodules->pluck('id')->toArray();

        // Get systems with modules and submodules, filtered by user permissions
        $systems = System::with(['modules' => function($query) use ($userSubmoduleIds) {
            $query->with(['submodules' => function($q) use ($userSubmoduleIds) {
                $q->whereIn('id', $userSubmoduleIds);
            }]);
        }])->get();

        // Filter out modules with no submodules and systems with no modules
        $systems = $systems->map(function($system) {
            $system->modules = $system->modules->filter(function($module) {
                return $module->submodules->count() > 0;
            })->values();
            return $system;
        })->filter(function($system) {
            return $system->modules->count() > 0;
        })->values();

        // Format response
        $response = $systems->map(function($system) {
            return [
                'system_id' => $system->id,
                'system_name' => $system->name,
                'system_code' => $system->code,
                'modules' => $system->modules->map(function($module) {
                    return [
                        'module_id' => $module->id,
                        'module_name' => $module->name,
                        'module_code' => $module->code,
                        'icon' => $module->icon,
                        'submodules' => $module->submodules->map(function($submodule) {
                            return [
                                'id' => $submodule->id,
                                'name' => $submodule->name,
                                'code' => $submodule->code,
                                'route' => $submodule->route,
                            ];
                        }),
                    ];
                }),
            ];
        });

        return response()->json($response);
    }
}
