<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TraitementController extends Controller
{
    public function Tasks() {

        try {


            $user = Auth::user();
            $tasks = $user->tasks;
            return response()->json([
                'success' => true,
                'data' => $tasks,
                'message' => 'get tasks with success',
            ], 201);


        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'failed to get tasks ' . $e,
            ], 500);
        }
    }

    public function AddTask(Request $request, $userId) {

        try {
            $validated = $request->validate([
                'task' => 'required|string',
            ]);

            $user = User::find($userId);

            if(!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found',
                ], 404);
            }

            Task::create([
                'task' => $validated['task'],
                'user_id' => $user->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Task created with success',
            ], 201);


        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'failed to add a task ' . $e,
            ], 500);
        }
    }

    public function UpdateTask(Request $request, $taskId) {

        try {

            $validated = $request->validate([
                'task' => 'required|string',
            ]);

            $task = Task::find($taskId);

            if($task) {
                $task->update([
                    'task' => $validated['task']
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Task updated with success',
                ], 201);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found',
                ], 404);
            }

        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'failed to update a task ' . $e,
            ], 500);
        }
    }

    public function DeleteTask($taskId) {

        try {
            $task = Task::find($taskId);

            if($task) {
                $task->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Task deleted with success',
                ], 201);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found',
                ], 404);
            }

        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'failed to add a task ' . $e,
            ], 500);
        }
    }

    public function markAsTerminate(Request $request, $taskId) {

        try {
            $task = Task::find($taskId);

            if($task) {
                $task->update([
                    'status' => $request->status
                ]);
                return response()->json([
                    'success' => true,
                    'message' => 'Task status changed with success',
                ], 201);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found',
                ], 404);
            }

        } catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'failed to change the task status ' . $e,
            ], 500);
        }
    }
}
