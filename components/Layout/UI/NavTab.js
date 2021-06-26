const NavTab = ({ className, listTab, selectedTab, onChangeTab }) => {
  const handleTabClick = (tab) => {
    onChangeTab(tab)
  }
  return (
    <ul className={`flex border-gray-500 dark:bg-gray-800 border-b ${className}`}>
      {listTab.map((tab, key) => (
        <li
          key={key}
          className={`border-gray-500 bg-indigo-50 dark:bg-gray-800 py-2 px-4 cursor-pointer ${selectedTab === tab ? 'border-l border-r border-t rounded-t -mb-px' : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  )
}

export default NavTab
