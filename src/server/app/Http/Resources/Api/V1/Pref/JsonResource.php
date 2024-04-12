<?php

namespace App\Http\Resources\Api\V1\Pref;

use App\Http\Resources\JsonResource as BaseJsonResource;

/**
 * @property \App\Models\Pref $resource
 *
 * @method array toArray($request)
 */
abstract class JsonResource extends BaseJsonResource
{
    /**
     * @return array
     */
    public function define(): array
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
        ];
    }
}
