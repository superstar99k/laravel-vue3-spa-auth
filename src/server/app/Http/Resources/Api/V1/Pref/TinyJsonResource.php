<?php

namespace App\Http\Resources\Api\V1\Pref;

use App\Utils\Arr;

/**
 * @property \App\Models\Pref $resource
 *
 * @method array toArray($request)
 */
class TinyJsonResource extends JsonResource
{
    /**
     * @return array
     */
    public function define(): array
    {
        return Arr::only(parent::define(), [
            'id',
            'name',
        ]);
    }
}
