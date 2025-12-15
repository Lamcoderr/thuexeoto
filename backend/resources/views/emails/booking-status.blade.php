
<h2>Thông báo từ hệ thống Thuê Xe</h2>

<p>Xin chào {{ $booking->user->name }},</p>

<p>Đơn đặt xe của bạn đã được <strong>{{ $status }}</strong>.</p>

<p>
    Xe: {{ $booking->car->name }} <br>
    Ngày thuê: {{ $booking->start_date }} - {{ $booking->end_date }} <br>
    Tổng tiền: {{ number_format($booking->total_price) }} đ
</p>

<p>Cảm ơn bạn đã sử dụng dịch vụ!</p>
