import { format } from 'date-fns'
import { Line } from 'react-chartjs-2'
import Chart from '../../Layout/UI/Chart'

const DailyChart = ({ type, dailyData }) => {
  return (
    <Chart
      ChartType={Line}
      height={200}
      data = {{
        labels: dailyData.data?.map(({ timestamp }) => format(new Date(timestamp), 'dd MMM yyyy')),
        datasets: [{
          data: dailyData.data?.map(({ [type]: data }) => data.jumlah_positif),
          label: 'Positif',
          borderColor: 'rgb(62, 107, 240)',
          backgroundColor: 'rgba(62, 107, 240, 0.2)',
          borderWidth: 1,
          fill: true,
        }, {
          data: dailyData.data?.map(({ [type]: data }) => data.jumlah_sembuh),
          label: 'Sembuh',
          borderColor: 'rgb(0, 255, 0)',
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          borderWidth: 1,
          fill: true,
        }, {
          data: dailyData.data?.map(({ [type]: data }) => data.jumlah_meninggal),
          label: 'Meninggal',
          borderColor: 'rgba(255, 0, 0)',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderWidth: 1,
          fill: true,
        }, {
          data: dailyData.data?.map(({ [type]: data }) => data.jumlah_dirawat),
          label: 'Dirawat',
          borderColor: 'rgb(248, 148, 6)',
          backgroundColor: 'rgba(248, 148, 6, 0.1)',
          borderWidth: 1,
          fill: true,
          hidden: true,
        }],
      }}
      options={{
        elements: {
          point: {
            radius: 1,
          }
        }
      }}
    />
  )
}

export default DailyChart
