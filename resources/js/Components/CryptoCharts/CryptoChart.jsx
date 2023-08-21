import React  from 'react';
import {Chart as ChartJS} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const CryptoChart = ({ data }) => {

    
    const chartData = {
        labels: data.map((item)=>item.name),
        datasets: [
            {
                label: 'Cotation',
                data: data.map((item)=>item.cotation),
                borderColor: 'blue',
                backgroundColor: ['green','blue','red',"yellow"],
                fill: false,
                tension: 0.1

            },
        ],
      
    };

   
    return <><Line data={chartData} /></>;

    // const chartRef = useRef();

    // useEffect(() => {
    //     if (data && data.length > 0) {
    //         const ctx = chartRef.current.getContext('2d');

    //         new ChartJS(ctx, {
    //             type: 'line',
    //             data: {
    //                 labels: data.map(item => item.name),
    //                 datasets: [
    //                     {
    //                         label: 'Cotation',
    //                         data: data.map(item => item.cotation),
    //                         borderColor: 'blue',
    //                         fill: false,
    //                     },
    //                 ],
    //             },
    //         });
    //     }
    // }, [data]);

    // return <canvas ref={chartRef} />;

}

export default CryptoChart;
