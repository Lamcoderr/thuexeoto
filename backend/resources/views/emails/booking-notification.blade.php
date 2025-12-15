<h2>📌 Có đơn đặt xe mới từ khách hàng</h2>

<p><strong>Khách hàng:</strong> {{ $booking->user->name }}</p>
<p><strong>Email:</strong> {{ $booking->user->email }}</p>

<p><strong>Xe:</strong> {{ $booking->car->name }}</p>
<p><strong>Ngày bắt đầu:</strong> {{ $booking->start_date }}</p>
<p><strong>Ngày kết thúc:</strong> {{ $booking->end_date }}</p>

<p><strong>Tổng tiền:</strong> {{ number_format($booking->total_price) }} VND</p>

<hr>
<p>Vui lòng đăng nhập trang Admin để xem chi tiết.</p>
