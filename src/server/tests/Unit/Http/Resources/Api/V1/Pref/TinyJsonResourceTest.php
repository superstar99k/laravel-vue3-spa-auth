<?php

namespace Tests\Unit\Http\Resources\Api\V1\Client;

use App\Http\Resources\Api\V1\Pref\TinyJsonResource;
use App\Models\Pref;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Request;
use Tests\TestCase;

class TinyJsonResourceTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->seed('PrefsTableSeeder');
    }

    /**
     * @test
     */
    public function pref_resource()
    {
        $okinawa = Pref::find(47);

        $resource = (object) (new TinyJsonResource($okinawa))->toArray(new Request());

        $this->assertSame($resource->id, $okinawa->id);
        $this->assertSame($resource->name, $okinawa->name);
    }
}
