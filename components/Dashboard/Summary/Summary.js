import SummaryItem from './SummaryItem'

const Summary = ({ summaryData, selectedData }) => {
  return (
    <>
      {summaryData.map((summary) => (
        <SummaryItem
          key={summary.key}
          title={summary.title}
          total={selectedData.total[summary.key]}
          penambahan={selectedData.penambahan[summary.key]}
        />
      ))}
    </>
  )
}

export default Summary
