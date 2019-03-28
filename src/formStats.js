import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const createChart = genreList => {
  const statisticCtx = document.querySelector(`.statistic__chart`);
  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * 5;
  const myChart = new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(genreList),
      datasets: [
        {
          data: [...Object.values(genreList)],
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
