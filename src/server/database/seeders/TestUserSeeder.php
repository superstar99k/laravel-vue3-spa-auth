<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $testUserNotExist = DB::table('users')->where('email', config('mics.test_user.email'))->doesntExist();

        if ($testUserNotExist) {
            DB::table('users')->insert([
                'name' => config('mics.test_user.name'),
                'email' => config('mics.test_user.email'),
                'password' => Hash::make(config('mics.test_user.password')),
                'verification_code' => '',
                'status' => \App\Enums\User\Status::Activated,
            ]);
        }
    }
}
