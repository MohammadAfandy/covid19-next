import { format } from 'date-fns'
import { Line } from 'react-chartjs-2'
import Chart from '../../Layout/UI/Chart'

const DailyVaccineChart = ({ type, dailyData, category }) => {
  const { data = [] } = dailyData
  const mapping = {
    pemeriksaan: [
      {
        key: 'pcr_tcm',
        label: 'PCR + TCM',
      },
      {
        key: 'antigen',
        label: 'Antigen',
      }
    ],
    vaksinasi: [
      {
        key: 'vaksinasi_1',
        label: 'Vaksinasi ke-1',
      },
      {
        key: 'vaksinasi_2',
        label: 'Vaksinasi ke-2',
      }
    ],
  }
  let selected
  let finalDailyData = data
  if (category.includes('pemeriksaan')) {
    selected = mapping.pemeriksaan
    if (type === 'penambahan') {
      finalDailyData = data.slice(1)
    }
  } else {
    selected = mapping.vaksinasi
    finalDailyData = data.filter((v) => false === (v.total.vaksinasi_1 === 0 && v.total.vaksinasi_2 === 0))
  }
  return (
    <Chart
      ChartType={Line}
      height={200}
      data = {{
        labels: finalDailyData.map(({ timestamp }) => format(new Date(timestamp), 'dd MMM yyyy')),
        datasets: [{
          data: finalDailyData.map(({ [type]: data }) => data[selected[0].key]),
          label: selected[0].label,
          borderColor:  'rgb(62, 107, 240)',
          backgroundColor: 'rgba(62, 107, 240, 0.2)',
          borderWidth: 1,
          fill: true,
        }, {
          data: finalDailyData.map(({ [type]: data }) => data[selected[1].key]),
          label: selected[1].label,
          borderColor: 'rgba(255, 0, 0)',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderWidth: 1,
          fill: true,
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

export default DailyVaccineChart
