import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

export default function ExpenseChart({ expenseData }) {
    const chartLabels = [];
    const chartData = [];

    expenseData.forEach(expense => {
        chartLabels.push(expense.name);
        chartData.push(Number(expense.amount));  
      });

    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Amount',
                data: chartData,
                borderColor: '#5367FF',
                backgroundColor: 'white',
            }
        ]
    };

    return (
        <div className='chart'>
            <Line data={data}/>
        </div>
    );
}
