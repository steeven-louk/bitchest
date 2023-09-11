import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

const CryptoChart = ({ data, width }) => {
    const chartData = {
        labels: data.map((item) => item.name),
        datasets: [
            {
                label: "Cotation",
                data: data.map((item) => item.cotation),
                borderColor: "blue",
                backgroundColor: [
                    "orange",
                    "blue",
                    "grey",
                    "blue",
                    "black",
                    "green",
                ],
                fill: false,
                // tension: 0.1
            },
        ],
        options: {
            animation: true,
        },
    };

    return <Bar data={chartData} width={width} />;
};

export default CryptoChart;
