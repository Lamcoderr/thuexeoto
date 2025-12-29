<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Models\User;

class AuthController extends Controller
{
    // ============================
    //       ADMIN LOGIN
    // ============================
    public function adminLogin(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $email = strtolower($request->email);

        $user = User::where('email', $email)
                    ->where('role', 'admin')
                    ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Sai tài khoản hoặc mật khẩu'
            ], 401);
        }

        $token = $user->createToken('admin_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'token' => $token,
            'user'  => $user
        ]);
    }

    // ============================
    //       REFRESH TOKEN
    // ============================
    public function refresh(Request $request)
    {
        $user = $request->user();

        // Xóa token cũ
        $user->tokens()->delete();

        // Tạo token mới
        $newToken = $user->createToken('refresh_token')->plainTextToken;

        return response()->json([
            'message' => 'Refresh token thành công',
            'token' => $newToken,
        ]);
    }

    // ============================
    //       LOGOUT
    // ============================
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Đã đăng xuất'
        ]);
    }

    // ============================
    //       FORGOT PASSWORD
    // ============================
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Đã gửi email đặt lại mật khẩu'
            ]);
        }

        return response()->json([
            'message' => 'Email không tồn tại'
        ], 400);
    }

    // ============================
    //       REGISTER
    // ============================
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'user'
        ]);

        $token = $user->createToken('user_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng ký thành công',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // ============================
    //        USER LOGIN
    // ============================
    public function userLogin(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);
        // lấy đúng user thường
        $email = strtolower($request->email);
        $user = User::where('email', $email)
                    ->where('role', 'user')
                    ->first();
        // kiểm tra sai email / mật khẩu
        if (!$user || !Hash::check($request->password, $user->password)) {
           return response()->json([
              'status'  => false,
              'message' => 'Email hoặc mật khẩu không đúng',
         ], 401);
        }
        // tạo token user
        $token = $user->createToken('user_token')->plainTextToken;
        return response()->json([
           'status'  => true,
           'message' => 'Đăng nhập thành công',
           'user'    => $user,
           'token'   => $token
        ]);
    }
    
}

