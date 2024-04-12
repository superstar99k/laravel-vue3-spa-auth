<?php

namespace Tests\Feature\Http\Controller\Api\V1\Admin;

use App\Enums\User\Status;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class PrefControllerTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->seed('PrefsTableSeeder');

        User::insert([
            'id' => 1,
            'name' => 'test',
            'email' => 'test@example.com',
            'password' => 'aaa',
            'verification_code' => 'bbb',
            'status' => Status::Pending,
        ]);
    }

    /**
     * @test
     */
    public function index()
    {
        $response = $this->actingAs(User::find(1))
            ->get(route('admin.pref.index'));

        $response->assertOk();
        $response->assertJsonCount(47, 'data');
    }
}
