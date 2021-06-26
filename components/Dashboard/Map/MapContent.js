import React, { useMemo } from 'react';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { scaleLog } from 'd3-scale';
import { format } from 'date-fns'
import { useTheme } from 'next-themes'
import geoUrl from '../../../utils/provinces-topo.json'

const MapContent = ({ setTooltipContent, summary, provinces, province, handleMapClick }) => {
  const { theme } = useTheme()
  const positif = summary.map(({ province, total }) => ({ province, value: total.jumlah_positif }))

  const handleSelectProvince = (prov) => {
    const selected = provinces.find((v) => v.toLowerCase() === prov)
    if (!selected) return
    handleMapClick(selected)
  }

  const colorScale = useMemo(() => {
    const { min, max } = positif.filter((pos) => pos.province !== 'ALL').reduce((acc, curr) => {
      if (curr.value < acc.min || acc.min === 0) {
        acc.min = curr.value
      }
      if (curr.value > acc.max) {
        acc.max = curr.value
      }
      return acc;
    }, { min: 0, max: 0 })
    return scaleLog()
      .domain([min, max])
      .range(['#FFFFFF', '#FF0008'])
  }, [positif])

  return (
    <ComposableMap
      data-tip=""
      projectionConfig={{ }}
      height={420}
    >
      <ZoomableGroup zoom={6.5} center={[118, -3]} minZoom={6}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const selectedProvince = province.toLowerCase()
              const geoProvince = geo.properties.provinsi.toLowerCase()
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(positif.find((v) => v.province.toLowerCase() === geoProvince)?.value)}
                  stroke={theme === 'dark' ? 'rgb(255, 255, 255, 1)' : 'rgb(245, 158, 11)'}
                  strokeWidth={selectedProvince === geoProvince ? 0.3 : 0.02}
                  onMouseEnter={() => {
                    const contentData = summary.find((v) => v.province.toLowerCase() === geoProvince)
                    setTooltipContent(<div className="text-left">
                        <h2 className="text-lg">{contentData?.province}</h2>
                        <ul>
                          <li>Positif : {contentData?.total.jumlah_positif.toLocaleString()}</li>
                          <li>Dirawat : {contentData?.total.jumlah_dirawat.toLocaleString()}</li>
                          <li>Sembuh : {contentData?.total.jumlah_sembuh.toLocaleString()}</li>
                          <li>Meninggal : {contentData?.total.jumlah_meninggal.toLocaleString()}</li>
                        </ul>
                        <p>Last Update : {contentData ? format(new Date(contentData.timestamp), 'dd MMM yyyy') : ''}</p>
                      </div>
                    );
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  onClick={() => {
                    handleSelectProvince(geoProvince)
                  }}
                  style={{
                    default: {
                      outline: "none"
                    },
                    hover: {
                      cursor: "pointer",
                      strokeWidth: 0.4,
                      outline: "none"
                    },
                    pressed: {
                      outline: "none"
                    }
                  }}
                />
              )
            }
          )}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}

export default MapContent
