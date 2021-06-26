import Head from 'next/head'

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.png" />
      <title>COVID19-APP | {title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Home',
  keywords: 'covid, covid19, covid-19, corona, virus, covid indonesia, corona indonesia',
  description: 'Covid 19 in Indonesia'
}

export default Meta
