import { useState } from 'react'
import Card from '../../Layout/UI/Card'
import MapContent from './MapContent'
import ReactTooltip from 'react-tooltip';
import { useEffect } from 'react';

const Map = ({ summary, provinces, province, handleChangeProvince }) => {
  const [isTooltipVisible, setTooltipVisibility] = useState(false)   
  const [content, setContent] = useState('')
  useEffect(() => {
    setTooltipVisibility(true)
  }, [])

  return (
    <Card className="py-0">
      {isTooltipVisible && <ReactTooltip type="info">{content}</ReactTooltip>}
      <MapContent
        setTooltipContent={setContent}
        handleMapClick={handleChangeProvince}
        summary={summary}
        provinces={provinces}
        province={province}
      />
    </Card>
  )
}

export default Map
