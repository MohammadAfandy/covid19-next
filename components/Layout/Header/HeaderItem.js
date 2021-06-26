import Link from 'next/link'
import { useRouter } from 'next/router'

const HeaderItem = ({ href, Icon, title }) => {
  const router = useRouter()
  const activeClass = router.pathname === href ? 'border-blue-500' : 'border-b-transparent hover:border-blue-300'
  return (
    <Link href={href} passHref>
      <div className={`flex items-center cursor-pointer border-b-4 mx-1 px-4 pb-2 transition-colors duration-300 ease-in-out ${activeClass}`} title={title}>
        <Icon className="mr-2" />
        <p className="sm:block hidden text-md font-medium">{title}</p>
      </div>
    </Link>
  )
}

export default HeaderItem
