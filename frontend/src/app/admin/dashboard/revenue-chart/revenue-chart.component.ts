import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.css']
})
export class RevenueChartComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.loadChart();
  }

  loadChart() {
    new Chart('revenueChart', {
      type: 'bar',
      data: {
        labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6'],
        datasets: [{
          label: 'Doanh thu (VNĐ)',
          data: [12000000, 18500000, 22000000, 19500000, 24500000, 28000000],
          backgroundColor: '#6a5af9',
          borderRadius: 10,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              callback: function(value) {
                return value.toLocaleString() + 'đ';
              }
            }
          }
        }
      }
    });
  }
}
