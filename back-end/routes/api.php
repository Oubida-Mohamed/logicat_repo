<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthentificationController;
use App\Http\Controllers\TraitementController;

use Illuminate\Http\Request;

Route::post('/login', [AuthentificationController::class, 'Login']);
Route::post('/register', [AuthentificationController::class, 'Register']);



Route::get('/user', function (Request $request) {
    return response()->json([
        'id' => $request->user()->id,
        'name' => $request->user()->name,
        'email' => $request->user()->email,
        'created_at' => $request->user()->created_at,
    ]);
})->middleware('auth:api');


Route::middleware(['auth:api'])->group(function () {


    Route::get('/tasks', [TraitementController::class, 'Tasks']);
    Route::post('/add_task/{userId}', [TraitementController::class, 'AddTask']);
    Route::put('/update_task/{taskId}', [TraitementController::class, 'UpdateTask']);
    Route::delete('/delete_task/{taskId}', [TraitementController::class, 'DeleteTask']);
    Route::put('/mark_as_terminate/{taskId}', [TraitementController::class, 'markAsTerminate']);


});