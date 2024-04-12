<?php

namespace App\Services;

use App\Domain\ClientUrl;
use App\Enums\User\Status;
use App\Mails\UserEmailModifyMail;
use App\Mails\UserVerifyMail;
use App\Models\User;
use App\Repositories\UserRepository;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

/**
 * @method User store(array $params)
 * @method User update(int $id, array $params)
 * @method User deactivate(int $id)
 * @method User activate(int $id)
 */
final class UserServiceConcrete implements UserService
{
    /**
     * @var ClientUrl
     */
    private ClientUrl $clientUrl;

    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * @param UserRepository $userRepository
     */
    public function __construct(
        UserRepository $userRepository,
        ClientUrl $clientUrl
    ) {
        $this->userRepository = $userRepository;
        $this->clientUrl = $clientUrl;
    }

    /**
     * @param array<string,mixed> $params
     *
     * @return User
     */
    public function store(array $params): User
    {
        DB::beginTransaction();

        try {
            $params['verification_code'] = Str::uuid();
            $params['verification_generated_at'] = CarbonImmutable::now();
            $params['status'] = Status::Pending;
            $params['update_user_id'] = auth()->user()->id;

            $user = $this->userRepository->create($params);

            $userVerifyUrl = $this->clientUrl->getClientUrl('urls.client.auth.user_verify', query: ['verification_code' => $user->verification_code]);
            Mail::to($user->email)->send(
                new UserVerifyMail(['user_verify_url' => $userVerifyUrl]),
            );
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }

        DB::commit();

        return $user;
    }

    /**
     * @param int $id
     * @param array<string,mixed> $params
     *
     * @return User
     */
    public function update(int $id, array $params): User
    {
        $params['update_user_id'] = auth()->user()->id;

        DB::beginTransaction();

        try {
            $user = $this->userRepository->find($id);

            if ($sendMail = (isset($params['email']) && $params['email'] !== $user->email)) {
                $params['verification_code'] = Str::uuid();
                $params['verification_generated_at'] = CarbonImmutable::now();
                $params['status'] = Status::Pending;
            }

            $user = $this->userRepository->update($params, $user->id);

            // email が更新されていれば通知メールを送信する
            if ($sendMail) {
                $userVerifyUrl = $this->clientUrl->getClientUrl('urls.client.auth.user_verify', query: [
                    'verification_code' => $user->verification_code,
                    'email_change' => 1,
                ]);

                Mail::to($user->email)->send(
                    new UserEmailModifyMail(['user_verify_url' => $userVerifyUrl]),
                );
            }
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }

        DB::commit();

        return $user;
    }

    /**
     * @param int $id
     */
    public function deactivate(int $id): User
    {
        $this->userRepository
            ->whereKey($id)
            ->whereStatus(Status::Activated)
            ->firstOrFail();

        return $this->userRepository
            ->update(['status' => Status::Deactivated], $id);
    }

    /**
     * @param int $id
     */
    public function activate(int $id): User
    {
        $this->userRepository
            ->whereKey($id)
            ->whereStatus(Status::Deactivated)
            ->firstOrFail();

        return $this->userRepository
            ->update(['status' => Status::Activated], $id);
    }
}
