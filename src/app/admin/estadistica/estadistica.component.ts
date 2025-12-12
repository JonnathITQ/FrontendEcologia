import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SidebarAdminComponent } from "../sidebar-admin/sidebar-admin.component";
import { VisitaService } from '../../services/visita.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [SidebarAdminComponent],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: any;

  totalShares: number = 0;

  constructor(private _visitaService: VisitaService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.obtenerDatosYRenderizar();
  }

  obtenerDatosYRenderizar() {
    this._visitaService.obtenerVisitas().subscribe(
      response => {
        const visitas = response.visitas;
        this.procesarDatos(visitas);
      },
      error => {
        console.log(error);
      }
    );
  }

  procesarDatos(visitas: any[]) {
    // Calcular total
    this.totalShares = visitas.length;

    // Agrupar por día
    const visitasPorDia: { [key: string]: number } = {};

    visitas.forEach(visita => {
      const fecha = new Date(visita.fecha).toLocaleDateString();
      visitasPorDia[fecha] = (visitasPorDia[fecha] || 0) + 1;
    });

    const labels = Object.keys(visitasPorDia);
    const data = Object.values(visitasPorDia);

    this.renderizarGrafico(labels, data);
  }

  renderizarGrafico(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 230, 118, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 230, 118, 0.0)');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Veces Compartido',
          data: data,
          borderColor: '#00E676', // Eco Green
          backgroundColor: gradient,
          borderWidth: 3,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#00E676',
          pointBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#00E676',
          pointHoverBorderColor: '#ffffff',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#1a1a1a',
            bodyColor: '#666',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              labelTextColor: function () {
                return '#00E676';
              }
            },
            titleFont: {
              family: 'Outfit',
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              family: 'Outfit',
              size: 13
            }
          },
          title: {
            display: true,
            text: 'Actividad de Compartidos',
            color: '#1B5E20',
            align: 'start',
            padding: {
              bottom: 30
            },
            font: {
              size: 24,
              family: 'Outfit',
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                family: 'Outfit',
                size: 12
              },
              color: '#999'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.03)'
            },
            border: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: 'Outfit',
                size: 12
              },
              color: '#999'
            },
            border: {
              display: false
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      }
    });
  }
}
