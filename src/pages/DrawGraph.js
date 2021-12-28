import React, {
    useEffect,
    useState,
    VFC,
} from 'react';
import {
    // ArcElement,
    // BarController,
    // BarElement,
    CategoryScale,
    // Chart,
    // ChartConfiguration,
    // DoughnutController,
    // LinearScale,
} from 'chart.js';
import Chart from 'chart.js/auto';
import data from "./data";
import { Line } from "react-chartjs-2"

Chart.register(
    // ArcElement,
    // BarElement,
    // BarController,
    // DoughnutController,
    CategoryScale,
    // LinearScale,
);

console.log("data.amount", data[0].amount)

const visualizeData = data.map(function (e) {
    return (e.amount);
});
const chartLabels = data.map(function (e) {
    return (e.date)
})
//#endregion
// const labels = Utils.months({ count: 7 });
// const labels = chartLabels;
const config = {
    type: 'line',
    // data: data,
    labels: chartLabels,
    datasets: [{
        label: 'Dataset',
        // data: [65, 59, 80, 81, 56, 55, 40],
        data: visualizeData,
        fill: false,
        borderColor: "#336699",
        tension: 0.1,
        lineTension: 0.1,
        pointBorderColor: "#336699",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointRadius: 1,

    }],
    options: {
        scales: {
            xAxes: [{
                type: 'category',
                labels: ['2021-2', '2021-3', '2021-4',]
            }]
        },
        tooltips: {
            mode: 'x',
            callbacks: {
                title: function (tooltipItems, data) {
                    let tI = tooltipItems[0];
                    return data.datasets[tI.datasetIndex].data[tI.index].x
                }
            }
        }
    }
};
//#endregion
const DrawGraph = (props) => {
    return (
        <div className="grafica">
            <h1>{props.graphKind}</h1>
            <Line data={config} />
        </div>
    )
}
//#endregion
export default DrawGraph

//   export interface ChartJSProps {
//     config: ChartConfiguration;
//   }

//   export const ChartJS: VFC<ChartJSProps> = ({
//     config,
//   }) => {
//     const [id, setId] = useState<string>();

//     useEffect(() => {
//       setId(`chart-${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`);
//     }, []);

//     useEffect(() => {
//       if (!id) {
//         return;
//       }

//       // @see https://stackoverflow.com/a/58877962/1731473
//       const canvas: HTMLCanvasElement = document.getElementById(id) as HTMLCanvasElement;
//       const ctx = canvas.getContext('2d');
//       let chart: Chart;
//       if (ctx !== null) {
//         const { options } = config;
//         chart = new Chart(ctx, {
//           ...config,
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             ...options,
//             elements: {
//               ...options?.elements,
//               line: {
//                 fill: false,
//                 ...options?.elements?.line,
//               },
//             },
//             plugins: {
//               ...options?.plugins,
//               legend: {
//                 display: false,
//                 ...options?.plugins?.legend,
//               },
//               tooltip: {
//                 mode: 'nearest',
//                 intersect: false,
//                 ...options?.plugins?.tooltip,
//               },
//             },
//           },
//         });
//       }

//       return () => {
//         if (chart) {
//           // @see https://www.chartjs.org/docs/latest/developers/api.html#destroy
//           chart.destroy();
//         }
//       };
//     }, [id]);

//     return (
//       <canvas id={id} />
//     );
//   };

//   export default null;
//   This wrapper is fully working, however, Typescript is yelling about type specific configuration.

//   Here is a GaugeChart component using the ChartJS doughnut type as an example:

//   import React, {
//     VFC,
//   } from 'react';
//   import { ChartJS } from './ChartJS';

//   export interface GaugeChartProps {
//     value: number;
//     max?: number;
//   }

//   export const GaugeChart: VFC<GaugeChartProps> = ({
//     value,
//     max = 100,
//   }) => {
//     const percent = value / max;

//     return (
//       <ChartJS config={{
//         type: 'doughnut',
//         data: {
//           datasets: [
//             {
//               backgroundColor: [
//                 'rgb(255, 99, 132)',
//                 '#ccc',
//               ],
//               // eslint-disable-next-line id-blacklist
//               data: [
//                 percent * 100,
//                 100 - (percent * 100),
//               ],
//             },
//           ],
//         },
//         options: {
//           rotation: 270, // start angle in degrees
//           circumference: 180, // sweep angle in degrees
//         },
//       }}
//       />
//     );
//   };

//   export default null;
//   The npx tsc command give me this:

//   src/components/chart/GaugeChart.tsx:36:9 - error TS2322: Type '{ rotation: number; circumference: number; }' is not assignable to type '_DeepPartialObject<CoreChartOptions<keyof ChartTypeRegistry> & ElementChartOptions<keyof ChartTypeRegistry> & PluginChartOptions<...> & DatasetChartOptions<...> & ScaleChartOptions<...>>'.
//     Object literal may only specify known properties, and 'rotation' does not exist in type '_DeepPartialObject<CoreChartOptions<keyof ChartTypeRegistry> & ElementChartOptions<keyof ChartTypeRegistry> & PluginChartOptions<...> & DatasetChartOptions<...> & ScaleChartOptions<...>>'.

//   36         rotation: 270, // start angle in degrees
//              ~~~~~~~~~~~~~

//     node_modules/chart.js/types/index.esm.d.ts:3493:3
//       3493   options?: ChartOptions<TType>;
//              ~~~~~~~
//       The expected type comes from property 'options' which is declared here on type 'ChartConfiguration<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint | null)[], unknown>'
//   Typescript Version:

//   ❯ npx tsc -v
//   Version 4.2.2
//   As you can see, the rotation option is not recognized.

//   Of course, I could resolve it by declaring a well typed constant:

//   import React, {
//     VFC,
//   } from 'react';
//   import { ChartConfiguration } from 'chart.js';
//   import { ChartJS } from './ChartJS';

//   export const GaugeChart: VFC<GaugeChartProps> = ({
//     value,
//     max = 100,
//   }) => {
//     const percent = value / max;
//     const config: ChartConfiguration<'doughnut'> = {
//       type: 'doughnut',
//       data: {
//         datasets: [
//           {
//             backgroundColor: [
//               'rgb(255, 99, 132)',
//               '#ccc',
//             ],
//             // eslint-disable-next-line id-blacklist
//             data: [
//               percent * 100,
//               100 - (percent * 100),
//             ],
//           },
//         ],
//       },
//       options: {
//         rotation: 270, // start angle in degrees
//         circumference: 180, // sweep angle in degrees
//       },
//     };

//     return <ChartJS config={config} />;
//   };
