import { useState } from 'react'
import Card from '../Layout/UI/Card'
import NavTab from '../Layout/UI/NavTab'
import Chart from '../Layout/UI/Chart'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTheme } from 'next-themes'
import { round, generateRGBAMultiple } from '../../utils/helpers'

const SymptompChart = ({ listTab, data }) => {
  const { theme } = useTheme()
  const [selectedTab, setSelectedTab] = useState(listTab[0])
  const onChangeTab = (tab) => {
    setSelectedTab(tab)
  }
  const mapping = {
    kasus: 'Positif',
    perawatan: 'Dirawat',
    sembuh: 'Sembuh',
    meninggal: 'Meninggal',
  }
  let labels = new Set()
  let dataset = {}
  Object.entries(mapping).forEach(([key, value]) => {
    if (data[key]) {
      for (let temp of data[key]) {
        labels.add(temp.key)
        dataset[value] = data[key].map((v) => round(v.doc_count, 1))
      }
    }
  })
  const bgBorderColors = generateRGBAMultiple(dataset[selectedTab] ? dataset[selectedTab].length : 0)
  labels = [...labels]
  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Percentage',
      data: dataset[selectedTab],
      backgroundColor: bgBorderColors.map((v) => v.rgba),
      borderColor: bgBorderColors.map((v) => v.rgb),
      borderWidth: 1,
      datalabels: {
        align: 'end',
        anchor: 'end',
        color: theme === 'dark' ? '#fff' : '#000',
        formatter: (value) => value + ' %',
      }
    }]
  }
  return (
    <Card className="relative h-full pt-4 py-16">
      <div className="my-3 flex flex-col">
        <h2 className=" text-2xl">Berdasarkan Gejala</h2>
      </div>
      <NavTab className="mx-1 mb-5" listTab={listTab} selectedTab={selectedTab} onChangeTab={onChangeTab} />
      <Chart
        ChartType={Bar}
        data = {chartData}
        plugins={[ChartDataLabels]}
        isPercent
        options={{
          legend: {
            display: false,
          },
          layout: {
            padding: {
              top: 30,
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
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
          <span className="font-bold">{data.current_data?.toLocaleString()}</span>
        </p>
        <p>
          <span className="font-bold">{round(data.missing_data, 2)}% </span>
          <span>Tidak memiliki data Gejala</span>
        </p>
      </div>
    </Card>
  )
}

export default SymptompChart
