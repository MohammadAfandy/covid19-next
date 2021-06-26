import Card from '../../Layout/UI/Card'
import CountUp from 'react-countup';

const SummaryPemeriksaan = ({ data }) => {
  const {
    key,
    total_pcr_tcm = 0,
    penambahan_pcr_tcm = 0,
    total_antigen = 0,
    penambahan_antigen = 0,
  } = data
  const titleMapping = {
    spesimen: 'Total Spesimen Diperiksa',
    orang: 'Total Orang Diperiksa',
  }
  const allTotal = total_pcr_tcm + total_antigen
  const allPenambahan = penambahan_pcr_tcm + penambahan_antigen
  return (
    <Card className="py-5">
      <p className="text-2xl text-green-600 dark:text-green-200 font-bold mb-5">{titleMapping[key]}</p>
      <div className="pb-5 border-b border-gray-500">
        <p className="text-4xl font-bold mb-1">
          <CountUp start={0} end={allTotal} separator="," duration={1} />
        </p>
        <p className="text-xl font-medium">
          {allPenambahan >= 0 ? '+' : '-'} <CountUp start={0} end={allPenambahan} separator="," duration={1} />
        </p>
      </div>
      <div className="flex justify-around">
        <div className="w-full border-r border-gray-500 pt-2">
          <p className="text-xl text-green-600 dark:text-green-200 font-bold mb-1">PCR + TCM</p>
          <p className="text-2xl font-bold mb-1">
            <CountUp start={0} end={total_pcr_tcm} separator="," duration={1} />
          </p>
          <p className="text-lg font-medium">
            {penambahan_pcr_tcm >= 0 ? '+' : '-'} <CountUp start={0} end={penambahan_pcr_tcm} separator="," duration={1} />
          </p>
        </div>
        <div className="w-full pt-2">
          <p className="text-xl text-green-600 dark:text-green-200 font-bold mb-1">Antigen</p>
          <p className="text-2xl font-bold mb-1">
            <CountUp start={0} end={total_antigen} separator="," duration={1} />
          </p>
          <p className="text-lg font-medium">
            {penambahan_antigen >= 0 ? '+' : '-'} <CountUp start={0} end={penambahan_antigen} separator="," duration={1} />
          </p>
        </div>
      </div>
      {/* <p className="text-sm font-medium">
        {penambahan >= 0 ? '+' : '-'} <CountUp start={0} end={penambahan} separator="," duration={1} />
      </p> */}
    </Card>
  )
}

export default SummaryPemeriksaan
