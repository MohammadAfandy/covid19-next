const Card = ({ className, children }) => {
  return (
    <div className={`bg-indigo-50 border-2 border-gray-500 shadow-lg dark:bg-gray-800 rounded-xl py-2 text-center transition duration-300 ease-in-out hover:shadow-innerlight dark:hover:shadow-innerdark ${className}`}>
      { children }
    </div>
  )
}

export default Card
