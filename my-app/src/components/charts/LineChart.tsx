import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const LChart = ({data}:any) => {    
    return (
        <Line data={data} />
    )
}
