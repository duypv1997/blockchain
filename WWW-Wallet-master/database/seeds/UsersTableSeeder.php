<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'email' => 'test@winww.io',
            'password' => bcrypt('123123'),
            'country' => 'VN',
            'phone_number' => '+84123123222',
        ]);
    }
}
