<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Company;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'company_code' => 'required|string',
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        if (!$user->is_active) {
            return response()->json(['error' => 'User account is inactive'], 403);
        }

        $company = Company::where('code', $request->company_code)->first();

        if (!$company) {
            return response()->json(['error' => 'Invalid company code'], 404);
        }

        // Check if user belongs to the selected company
        if ($user->company_id !== $company->id) {
            return response()->json(['error' => 'User does not belong to this company'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'company_id' => $user->company_id,
            ],
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'code' => $company->code,
                'primary_color' => $company->primary_color,
                'accent_color' => $company->accent_color,
                'logo_url' => $company->logo_url,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
