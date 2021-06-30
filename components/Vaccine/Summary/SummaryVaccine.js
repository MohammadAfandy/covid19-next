import Card from '../../Layout/UI/Card'
import CountUp from 'react-countup';

const SummaryVaccine = ({ data }) => {
  const { key, total = 0, penambahan = 0 } = data
  const titleMapping = {
    vaksinasi_1: 'Vaksinasi Ke-1',
    vaksinasi_2: 'Vaksinasi Ke-2',
  }
  return (
    <Card className="py-5">
      <p className="text-xl text-green-600 dark:text-green-200 font-bold mb-5">{titleMapping[key]}</p>
      <p className="text-2xl font-bold mb-1">
        <CountUp start={0} end={total} separator="," duration={1} />
      </p>
      <p className="text-lg font-medium">
        {penambahan >= 0 ? '+' : '-'} <CountUp start={0} end={penambahan} separator="," duration={1} />
      </p>
    </Card>
  )
}

export default SummaryVaccine
