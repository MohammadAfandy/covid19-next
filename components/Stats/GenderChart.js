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
    <>
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
    </>
  )
}

export default GenderChart
