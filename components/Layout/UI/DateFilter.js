import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const DateFilter = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const CustomInputDate = forwardRef(({ value, onClick }, ref) => (
    <button
      ref={ref}
      className="bg-indigo-50 border-2 rounded-xl border-gray-500 shadow-lg dark:bg-gray-800 p-2 tracking-wide w-full mb-2"
      onClick={onClick}
    >
      {value}
    </button>
  ))
  CustomInputDate.displayName = 'CustomInputDate'

  const curYear = new Date().getFullYear()
  const years = Array(curYear - 2020 + 1).fill().map((_, idx) => 2020 + idx)
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const customHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div
      style={{
        margin: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button className="mr-2" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </button>

      <select
        className="text-gray-900 bg-white mr-2"
        value={months[date.getMonth()]}
        onChange={({ target: { value } }) =>
          changeMonth(months.indexOf(value))
        }
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        className="text-gray-900 bg-white mr-2"
        value={date.getFullYear()}
        onChange={({ target: { value } }) => changeYear(value)}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </button>
    </div>
  )
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="mr-4">
        <DatePicker
          dateFormat="dd/MM/yyyy"
          renderCustomHeader={customHeader}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          maxDate={endDate}
          customInput={<CustomInputDate />}
        />
      </div>
      <span className="mr-4"> s/d </span>
      <div>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          renderCustomHeader={customHeader}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={startDate}
          customInput={<CustomInputDate />}
        />
      </div>
    </div>
  )
}

export default DateFilter
