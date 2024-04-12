<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Pref\IndexRequest;
use App\Http\Resources\Api\V1\Pref\TinyJsonResource;
use App\Repositories\PrefRepository;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * @method IndexResource index(IndexRequest $request)
 */
class PrefController extends Controller
{
    /**
     * @var PrefRepository
     */
    private PrefRepository $prefRepository;

    /**
     * @param PrefRepository $prefRepository
     */
    public function __construct(
        PrefRepository $prefRepository
    ) {
        $this->prefRepository = $prefRepository;
    }

    /**
     * @param IndexRequest $request
     *
     * @return AnonymousResourceCollection
     */
    public function index(IndexRequest $request): AnonymousResourceCollection
    {
        return TinyJsonResource::collection(
            $this->prefRepository->get()
        );
    }
}
