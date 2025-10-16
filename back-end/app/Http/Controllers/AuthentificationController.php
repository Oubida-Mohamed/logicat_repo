<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthentificationController extends Controller
{
    public function Login(Request $request) {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
 
        

            $user = User::where('email', $credentials['email'])->first();

            // return $credentials['password'];
            // return Hash::check($credentials['password'], $user->password);

            if(!$user || !Hash::check($credentials['password'], $user->password) ) {
                return response()->json([
                    'success' => false,
                    'message' => 'email or password not correct'
                ], 404);
            }

            // return $user;
            // return $user->createToken($request->email)->plainTextToken;

            if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
                $token = $user->createToken('token')->accessToken;

                return response()->json([
                    'success' => true,
                    'message' => 'success connection',
                    'token' => $token
                ], 201);
            }
            
        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'connection failed ' . $e,
            ], 500);
        }
    }


    public function Register(Request $request) {
        try {
            $validated = $request->validate([
                'name' => ['required'],
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
 
        

            $user = User::where('email', $validated['email'])->first();

            if($user) {
                return response()->json([
                    'success' => false,
                    'message' => 'email already exist'
                ]);
            }

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);
    
            return response()->json([
                'success' => true,
                'message' => 'success register',
            ]);

        } catch(\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'connection failed ' . $e,
            ]);
        }
    }
}
