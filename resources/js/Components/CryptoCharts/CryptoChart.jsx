import React  from 'react';
import { Chart as ChartJS} from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

const CryptoChart = ({ data, width }) => {

    
    const chartData = {
        labels: data.map((item)=>item.name),
        datasets: [
            {
                label:'Cotation',
                data: data.map((item)=>item.cotation),
                borderColor: 'blue',
                backgroundColor: ['orange','blue','grey',"blue","black","green"],
                fill: false,
                // tension: 0.1

            },
        ],
        options:{
            animation: true,
        }
      
    };

   
    // return <><BarElement data={chartData} className='w-[100%]' /></>;
    return <Bar data={chartData} />;

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
