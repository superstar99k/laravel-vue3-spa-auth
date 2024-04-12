<?php

namespace App\Http\Requests\Api\V1;

// vendor
use App\Http\Requests\Request;

class SendResetPasswordEmailRequest extends Request
{
    /**
     * @return array
     */
    public function rules()
    {
        return [
            'email' => [
                'required',
                'max:64',
                'email',
                'confirmed',
            ],
            'email_confirmation' => [
                'required',
                'email',
            ],
        ];
    }

    /**
     * @return array
     */
    public function attributes()
    {
        return [
            'email' => __('validation.attributes.users.email'),
            'email_confirmation' => __('validation.attributes.users.email_confirmation'),
        ];
    }
}
