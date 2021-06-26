import { useState } from 'react'
import Card from '../../Layout/UI/Card'
import DailyVaccineChart from './DailyVaccineChart'

const DailyVaccine = ({ data }) => {
  const [category, setCategory] = useState('pemeriksaan_spesimen')
  const [type, setType] = useState('total')
  const handleTypeChange = (event) => {
    const { value } = event.target
    setType(value)
  }
  const handleCategoryChange = (event) => {
    const { value } = event.target
    setCategory(value)
  }

  const dailyData = data[category] ? data[category] : {}
  return (
    <Card>
      <div className="my-3 flex flex-col">
        <h2 className=" text-2xl">Data {type === 'total' ? 'Akumulasi' : 'Per Hari'}</h2>
        <div className="flex justify-center mt-3">
          <div className="mr-2 cursor-pointer">
            <input onChange={handleCategoryChange} type="radio" id="pemeriksaan_spesimen" name="chartCategory" value="pemeriksaan_spesimen" defaultChecked />
            <label htmlFor="pemeriksaan_spesimen"> Pemeriksaan Spesimen</label>
          </div>
          <div className="mr-2 cursor-pointer">
            <input onChange={handleCategoryChange} type="radio" id="pemeriksaan_orang" name="chartCategory" value="pemeriksaan_orang" />
            <label htmlFor="pemeriksaan_orang"> Pemeriksaan Orang</label>
          </div>
          <div className="mr-2 cursor-pointer">
            <input onChange={handleCategoryChange} type="radio" id="vaksinasi" name="chartCategory" value="vaksinasi" />
            <label htmlFor="vaksinasi"> Vaksinasi</label>
          </div>
        </div>
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
      </div>
      <DailyVaccineChart dailyData={dailyData} category={category} type={type} />
    </Card>
  )
}

export default DailyVaccine
