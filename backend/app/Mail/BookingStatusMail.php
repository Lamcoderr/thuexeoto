<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Booking;

class BookingStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;
    public $status;

    public function __construct(Booking $booking, $status)
    {
        $this->booking = $booking;
        $this->status = $status;
    }

    public function build()
    {
        return $this->subject("Cập nhật trạng thái đặt xe của bạn")
                    ->view('emails.booking-status')
                    ->with([
                        'booking' => $this->booking,
                        'status' => $this->status
                    ]);
    }
}
