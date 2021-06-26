import { Chart as ReactChart } from 'react-chartjs-2'
import { useTheme } from 'next-themes'

const Chart = ({ ChartType, height = 300, data, options, plugins = [], isPercent = false }) => {
  const { theme } = useTheme()

  // disable currently active plugins except the default and plugins from arguments
  const pluginIds = plugins.map((v) => v.id)
  pluginIds.push('filler', 'legend', 'title')
  const currentlyActivePlugins = ReactChart.plugins.getAll()
  const paramDisablePlugin = currentlyActivePlugins.reduce((acc, curr) => {
    if (pluginIds.includes(curr.id)) {
      return acc
    }
    return { ...acc, [curr.id]: false }
  }, {})

  for (let plugin of plugins) {
    ReactChart.plugins.register(plugin)
  }

  return (
    <ChartType
      height={height}
      data = {data}
      options={{
        plugins: paramDisablePlugin,
        maintainAspectRatio: false,
        legend: {
          display: true,
          labels: {
            fontColor: theme === 'dark' ? '#fff' : '#000',
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              let label = data.datasets[tooltipItem.datasetIndex].label || '';
              return `${label} : ${Number(tooltipItem.value).toLocaleString()} ${isPercent ? '%' : ''}`;
            }
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: theme === 'dark' ? '#fff' : '#000',
                callback: (label) => isNaN(label) ? label : label.toLocaleString(),
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
        ...options,
      }}
    />
  )
}

export default Chart
