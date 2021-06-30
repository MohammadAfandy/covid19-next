const Select = ({ className, emptyValue, defaultValue, optionList, handleChange }) => {
  return (
    <select
      value={defaultValue}
      onChange={(e) => handleChange(e.target.value)}
      className={`bg-indigo-50 border-2 rounded-xl border-gray-500 shadow-lg dark:bg-gray-800 p-2 tracking-wide mb-2 w-full text-center ${className}`}
    >
      {emptyValue ? <option value="">{emptyValue}</option> : ''}
      {optionList.map(({ key, value }) => (
        <option key={key} value={key}>{value}</option>
      ))}
    </select>
  )
}

export default Select
