<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::select('id', 'name', 'code')->get();
        
        return response()->json($companies);
    }
}
