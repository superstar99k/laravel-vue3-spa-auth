<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table
              ->string('name', 64)
              ->nullable(false)
              ->comment('氏名');
            $table
              ->string('email', 64)
              ->nullable(false)
              ->comment('メールアドレス');
            $table
               ->string('password', 128)
              ->nullable(true)
              ->comment('パスワード');
            $table
              ->string('verification_code', 255)
              ->nullable(false)
              ->comment('承認コード');
            $table
              ->dateTime('verification_generated_at')
              ->nullable(true)
              ->comment('承認日時');
            $table->dateTime('email_verified_at')->nullable(true);
            $table
              ->enum('status', \App\Enums\User\Status::getValues())
              ->nullable(false)
              ->default(\App\Enums\User\Status::Pending)
              ->comment('ステータス');
            $table
              ->bigInteger('update_user_id')
              ->unsigned()
              ->nullable(true)
              ->comment('更新ユーザーID');
            $table->timestamps();

            $table->softDeletes('deleted_at', 0);

            $table->unique('email');
            $table
              ->foreign('update_user_id')
              ->references('id')
              ->on('users')
              ->onUpdate('cascade')
              ->onDelete('restrict');

            $table->comment('ユーザーマスタ');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
