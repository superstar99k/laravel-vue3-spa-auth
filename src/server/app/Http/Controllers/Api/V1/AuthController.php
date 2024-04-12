<?php

namespace App\Http\Controllers\Api\V1;

use App\Criteria\User\VerifyCriteria;
use App\Domain\ClientUrl;
use App\Enums\User\Status;
use App\Exceptions\HttpAuthException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\LoginRequest;
use App\Http\Requests\Api\V1\ResetPasswordRequest;
use App\Http\Requests\Api\V1\SendResetPasswordEmailRequest;
use App\Http\Requests\Api\V1\VerifyRequest;
use App\Http\Resources\AnonymousJsonResource;
use App\Http\Resources\Api\V1\User\MediumJsonResource as UserJsonResource;
use App\Mails\ResetPasswordMail;
use App\Repositories\UserRepository;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * ログイン
     *
     * @param LoginRequest $request
     *
     * @return Illuminate\Http\Resources\Json\JsonResource
     */
    public function password(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = $this->userRepository
            ->findWhere(['email' => $validated['email'], 'status' => \App\Enums\User\Status::Activated])
            ->first();

        if (empty($user)) {
            throw new HttpAuthException(__('error.failed_password_login'));
        }

        if (!Auth::attempt($validated)) {
            throw new HttpAuthException(__('error.failed_password_login'));
        }

        return new UserJsonResource($request->user());
    }

    /**
     * ログアウト
     *
     * @param Request $request
     *
     * @return Illuminate\Http\Resources\Json\JsonResource
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json();
    }

    /**
     * ログインユーザ情報取得
     *
     * @param Request $request
     *
     * @return Illuminate\Http\Resources\Json\JsonResource
     */
    public function me(Request $request)
    {
        return new UserJsonResource($request->user());
    }

    /**
     * パスワードリセットメール送信
     *
     * @note emailからユーザの存在有無がわからない様に、存在しない場合も200
     *
     * @param SendResetPasswordEmailRequest $request
     * @param ClientUrl $clientUrl
     *
     * @return Illuminate\Http\Resources\Json\JsonResource
     */
    public function sendResetPasswordEmail(SendResetPasswordEmailRequest $request, ClientUrl $clientUrl)
    {
        $validated = $request->validated();

        $user = $this->userRepository
            ->whereEmail($validated['email'])
            ->first();
        if (is_null($user)) {
            return response()->json();
        }

        $verificationCode = (string) Str::uuid();
        session()->put(config('session.keys.password_reset_code'), [
            'verification_code' => $verificationCode,
            'user_id' => $user->id,
            'expired' => CarbonImmutable::now(),
        ]);

        Mail::to($user->email)->send(
            new ResetPasswordMail(['resetPasswordUrl' => $clientUrl->getClientUrl(
                'urls.client.auth.reset_password',
                query: ['verification_code' => $verificationCode]
            )])
        );

        return response()->json();
    }

    /**
     * パスワードリセット
     *
     * @param ResetPasswordRequest $request
     *
     * @return Illuminate\Http\Resources\Json\JsonResource
     *
     * @throws UnauthorizedHttpException
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        $validated = $request->validated();
        if (!session()->exists(config('session.keys.password_reset_code'))) {
            return response()->json();
        }

        $session = session()->get(config('session.keys.password_reset_code'));
        session()->forget(config('session.keys.password_reset_code'));

        if ($session['verification_code'] !== $validated['verification_code']
            ||
            !isset($session['user_id'])
            ||
            $session['expired']->addHours(config('auth.password_timeout_hour')) <= now()
        ) {
            return response()->json();
        }

        $user = $this->userRepository
            ->whereKey($session['user_id'])
            ->first();

        if (!is_null($user)) {
            $this->userRepository->updateWhere(['id' => $session['user_id']], [
                'password' => Hash::make($validated['password']),
            ]);
        }

        return response()->json();
    }

    /**
     * @param VerifyRequest $request
     *
     * @return JsonResponse
     */
    public function verify(VerifyRequest $request): AnonymousJsonResource
    {
        $user = $this->userRepository
            ->pushCriteria(new VerifyCriteria($request->validated()))
            ->firstOrFail();

        $user = $this->userRepository->update([
            'status' => Status::Activated,
            'email_verified_at' => now(),
        ], $user->id);

        $verificationCode = (string) Str::uuid();

        session()->put(config('session.keys.password_reset_code'), [
            'verification_code' => $verificationCode,
            'user_id' => $user->id,
            'expired' => CarbonImmutable::now(),
        ]);

        return new AnonymousJsonResource(['verification_code' => $verificationCode]);
    }
}
