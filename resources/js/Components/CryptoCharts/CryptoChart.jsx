import React from "react";
// import { Chart as ChartJS } from "chart.js/auto";
// import { Bar, Line } from "react-chartjs-2";
import ReactApexChart from "react-apexcharts";

const CryptoChart = ({ data }) => {

    
    const chartData = {
          
        series: [{
          data:  data?.map((item) => item.cotation),
          name: "",
        }],
        options: {
          chart: {
            height: 380,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              columnWidth: '70%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          title: {
            text: 'Cotations Au Lancement',
            align: 'left'
          },
          xaxis: {
          categories: data?.map((item)=>item?.name),
            labels: {
              style: {
                // colors: colors,
                fontSize: '15px'
              }
            }
          }
        },
      
      
      };

   return <ReactApexChart options={chartData?.options} series={chartData?.series} type="bar" height={380} />

};

export default CryptoChart;
