import Card from '../../Layout/UI/Card'
import CountUp from 'react-countup';

const SummaryItem = ({ title, total, penambahan }) => {
  return (
    <Card>
      <p className="text-md text-green-600 dark:text-green-200 font-bold mb-1">{title}</p>
      <p className="text-xl font-bold mb-1">
        <CountUp start={0} end={total} separator="," duration={1} />
      </p>
      <p className="text-sm font-medium">
        {penambahan >= 0 ? '+' : '-'} <CountUp start={0} end={penambahan} separator="," duration={1} />
      </p>
    </Card>
  )
}

export default SummaryItem
