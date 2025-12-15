<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('car_id')->constrained()->cascadeOnDelete();

            $table->date('start_date');
            $table->date('end_date');

            $table->integer('total_price');

            $table->enum('status', ['pending', 'confirmed', 'rejected', 'canceled'])
              ->default('pending');

            $table->text('note')->nullable();
        $table->timestamps();
});

    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
