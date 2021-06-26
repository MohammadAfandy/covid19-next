import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import NextNprogress from 'nextjs-progressbar'
import HeaderItem from './HeaderItem'
import {
  Activity,
  BarChart,
  Moon,
  PieChart,
  Sun,
} from 'react-feather';

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const switchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <header className="h-auto p-5">
      <NextNprogress
        color="rgb(59, 130, 246)"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow
        options={{ showSpinner: false }}
      />
      <div className="grid md:grid-cols-3 grid-cols-2">
        <h2 className="md:block hidden text-2xl font-medium">COVID 19</h2>
        <div className="flex justify-center">
          <HeaderItem
            href="/"
            Icon={PieChart}
            title="Dashboard"
          />
          <HeaderItem
            href="/statistic"
            Icon={BarChart}
            title="Statistik"
          />
          <HeaderItem
            href="/vaccine"
            Icon={Activity}
            title="Vaksinasi"
          />
        </div>
        <div className="flex flex-row-reverse">
          {theme === 'light' ? (
            <Moon onClick={switchTheme} className="cursor-pointer" />
          ) : (
            <Sun onClick={switchTheme} className="cursor-pointer" />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
