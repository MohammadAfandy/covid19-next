import Card from '../Layout/UI/Card'
import { round } from '../../utils/helpers'

const Container = ({ title, data, listTab, Component }) => {

  return (
    <Card className="relative pt-4 py-16 min-h-[600px]">
      <div>
        <div className="my-3 flex flex-col">
          <h2 className=" text-2xl">{title}</h2>
        </div>
        <div className="flex flex-col justify-center">
          <Component listTab={listTab} data={data} />
        </div>
      </div>
      <div className="absolute bottom-0 border-t w-full">
        <p>
          <span>Total Data : </span>
          <span className="font-bold">{data?.current_data?.toLocaleString()}</span>
        </p>
        <p>
          <span className="font-bold">{round(data?.missing_data, 2)}% </span>
          <span>Tidak memiliki data Umur</span>
        </p>
      </div>
    </Card>
  )
}

export default Container
