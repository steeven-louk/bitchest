<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            
        $data = User::orderBy("id", "ASC")->get();
        return response()->json( $data,200);
        } catch (Error $error) {
            throw $error;
            response()->json(["message"=>"impossible de recuperer les user"], 404);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

      return  response()->json(['message'=>'user as been created successfully', 'response'=>$user],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $get_user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $get_user)
    {
        //
        $request->validate([
            'name'=> 'required',
            'email'=>'required',
            'status'=>'required'
        ]);
        try {
            $user = User::findOrFail($get_user);
            if(!$user) return response()->json(['message'=>"user not found"], 404);

            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->status = $request->input('status');
            $user->save();

            return response()->json(['message' => 'user has been updated successfully']);
    
        } catch (\Exception $e) {
        return response()->json(['message' => 'Updated Error', 'error' => $e->getMessage()], 500);
    }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = User::findOrFail($id);
        $data -> delete();
        return response()->json(["message"=>"user deleted successfully", $data]);
    }
}
