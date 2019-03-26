import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const createChart = genreList => {
  console.log(genreList);
  const statisticCtx = document.querySelector(`.statistic__chart`);
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * 5;
  const myChart = new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
      datasets: [
        {
          data: [
            genreList[`Sci-Fi`] || 0,
            genreList[`Animation`] || 0,
            genreList[`Fantasy`] || 0,
            genreList[`Comedy`] || 0,
            genreList[`TV Series`] || 0
          ],
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};
export { createChart };
