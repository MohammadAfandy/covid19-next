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
    <>
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
    </>
  )
}

export default SymptompChart
