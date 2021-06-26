import { useState } from 'react'
import Card from '../../Layout/UI/Card'
import DailyChart from './DailyChart'

const Daily = ({ province, dailyData }) => {
  const [type, setType] = useState('total')
  const handleTypeChange = (event) => {
    const { value } = event.target
    setType(value)
  }

  return (
    <Card>
      <div className="my-3 flex flex-col">
        <h2 className="text-2xl">Data {type === 'total' ? 'Akumulasi' : 'Per Hari'}</h2>
        <p className="text-xl">{province ? 'Provinsi ' + province : 'Seluruh Indonesia'}</p>
        <div className="flex md:justify-end justify-center text-sm mt-3">
          <div className="mr-2 cursor-pointer">
            <input onChange={handleTypeChange} type="radio" id="akumulasi" name="chartType" value="total" defaultChecked />
            <label htmlFor="akumulasi"> Akumulasi</label>
          </div>
          <div className="mr-2 cursor-pointer">
            <input onChange={handleTypeChange} type="radio" id="harian" name="chartType" value="penambahan" />
            <label htmlFor="harian"> Harian</label>
          </div>
        </div>
        <div className="text-center text-xs p-2 md:text-left">
          <p>Jumlah kasus yang tidak memiliki tanggal lapor</p>
            <span>
              Positif : {dailyData?.without_date?.jumlah_positif || 0}
              &nbsp;| Sembuh : {dailyData?.without_date?.jumlah_sembuh || 0}
              &nbsp;| Meninggal : {dailyData?.without_date?.jumlah_meninggal || 0}
            </span>
        </div>
      </div>
      <DailyChart dailyData={dailyData} type={type} />
    </Card>
  )
}

export default Daily
