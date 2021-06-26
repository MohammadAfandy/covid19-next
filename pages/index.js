import Dashboard from '../components/Dashboard/Dashboard'
import Meta from '../components/Layout/UI/Meta'

import {
  fetchProvinces,
} from '../utils/services'

export default function Home({ provincesList }) {
  return (
    <div>
      <Meta title="Dashboard" />
      <title>COVID19 INDONESIA | HOME</title>
      <meta name="description" content="COVID19 Statistic in Indonesia" />
      <link rel="icon" href="/favicon.ico" />
      <Dashboard provincesList={provincesList} />
    </div>
  )
}

export const getStaticProps = async (context) => {
  const provincesList = await fetchProvinces()
  return {
    props: {
      provincesList,
    }
  }
}
