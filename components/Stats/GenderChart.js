import Card from '../Layout/UI/Card'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTheme } from 'next-themes'
import Chart from '../Layout/UI/Chart'
import { round } from '../../utils/helpers'

const GenderChart = ({ data }) => {
  const { theme } = useTheme()
  const mapping = {
    kasus: 'Positif',
    perawatan: 'Dirawat',
    sembuh: 'Sembuh',
    meninggal: 'Meninggal',
  }
  const labels = Object.values(mapping)

  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Laki-Laki',
      data: Object.entries(mapping).map(([key]) => {
        if (!data[key]) return 0
        return round(data[key].find((dat) => dat.key === 'LAKI-LAKI').doc_count, 1)
      }),
      borderColor: 'rgba(255, 0, 64, 1)',
      backgroundColor: 'rgba(255, 0, 64, 0.2)',
      borderWidth: 1,
      datalabels: {
        color: theme === 'dark' ? '#fff' : '#000',
        formatter: (value) => value + ' %',
      }
    }, {
      label: 'Perempuan',
      data: Object.entries(mapping).map(([key]) => {
        if (!data[key]) return 0
        return round(data[key].find((dat) => dat.key === 'PEREMPUAN').doc_count, 1)
      }),
      borderColor: 'rgba(0, 255, 42, 1)',
      backgroundColor: 'rgba(0, 255, 42, 0.2)',
      borderWidth: 1,
      datalabels: {
        color: theme === 'dark' ? '#fff' : '#000',
        formatter: (value) => value + ' %',
      }
    }]
  }
  return (
    <Card className="relative h-full pt-4 py-16">
      <div className="my-3 flex flex-col">
        <h2 className=" text-2xl">Berdasarkan Jenis Kelamin</h2>
      </div>
      <Chart
        ChartType={Bar}
        data = {chartData}
        plugins={[ChartDataLabels]}
        isPercent
        options={{
          scales: {
            yAxes: [
              {
                stacked: true,
                ticks: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                stacked: true,
                ticks: {
                  fontColor: theme === 'dark' ? '#fff' : '#000',
                }
              }
            ]
          },
        }}
      />
      <div className="absolute bottom-2 border-t w-full">
        <p>
          <span>Total Data : </span>
          <span className="font-bold">{data?.current_data?.toLocaleString()}</span>
        </p>
        <p>
          <span className="font-bold">{round(data?.missing_data, 2)}% </span>
          <span>Tidak memiliki data Jenis Kelamin</span>
        </p>
      </div>
    </Card>
  )
}

export default GenderChart
