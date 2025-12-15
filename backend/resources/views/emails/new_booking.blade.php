<h2>Booking mới</h2>

<p><strong>Khách:</strong> {{ $booking->user->name }}</p>
<p><strong>Xe:</strong> {{ $booking->car->name }}</p>
<p><strong>Ngày nhận:</strong> {{ $booking->start_date }}</p>
<p><strong>Ngày trả:</strong> {{ $booking->end_date }}</p>
<p><strong>Tổng tiền:</strong> {{ number_format($booking->total_price) }}đ</p>
<p>Chúng tôi đã nhận được đơn đặt xe của bạn và sẽ liên hệ lại sớm nhất có thể.</p>
<p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
