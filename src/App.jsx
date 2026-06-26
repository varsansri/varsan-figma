import { useState } from 'react'
import './App.css'
import FigmaDashboard from './Components/FigmaDashboard'
import CakeryPlatform from './Components/CakeryPlatform'
import MobileMockup from './Components/MobileMockup'

function App() {
  const [activeTab, setActiveTab] = useState('mobile')

  if (activeTab === 'platform') {
    return <CakeryPlatform />
  }

  if (activeTab === 'mobile') {
    return <MobileMockup />
  }

  return (
    <div className="app-container">
      <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 38 57" fill="none">
              <path d="M19 28.5C19 25.98 20.0009 23.655 21.7002 21.9558C23.3995 20.2566 25.7259 19.25 28.25 19.25C30.7741 19.25 33.1005 20.2566 34.7998 21.9558C36.4991 23.655 37.5 25.98 37.5 28.5C37.5 31.02 36.4991 33.345 34.7998 35.0442C33.1005 36.7434 30.7741 37.75 28.25 37.75C25.7259 37.75 23.3995 36.7434 21.7002 35.0442C20.0009 33.345 19 31.02 19 28.5Z" fill="#1ABCFE"/>
              <path d="M0 47.5C0 44.98 1.00089 42.655 2.70018 40.9558C4.39946 39.2566 6.7259 38.25 9.25 38.25H19V47.5C19 50.02 17.9991 52.345 16.2998 54.0442C14.6005 55.7434 12.2741 56.75 9.75 56.75C7.2259 56.75 4.90054 55.7434 3.20018 54.0442C1.49982 52.345 0.5 50.02 0.5 47.5H0Z" fill="#0ACF83"/>
              <path d="M19 0V19H28.5C31.0201 19 33.3464 17.9991 35.0458 16.2998C36.7451 14.6005 37.75 12.2759 37.75 9.75C37.75 7.2241 36.7451 4.89946 35.0458 3.20018C33.3464 1.50089 31.0201 0.5 28.5 0.5H19V0Z" fill="#FF7262"/>
              <path d="M0 9.75C0 12.2741 1.00089 14.5995 2.70018 16.2998C4.39946 18.0001 6.7259 19 9.25 19H19V0H9.25C6.7259 0 4.39946 1.00089 2.70018 2.70018C1.00089 4.39946 0 6.7241 0 9.25V9.75Z" fill="#F24E1E"/>
              <path d="M0 28.5C0 31.0201 1.00089 33.3464 2.70018 35.0458C4.39946 36.7451 6.7259 37.75 9.25 37.75C11.7741 37.75 14.1005 36.7451 15.7998 35.0458C17.4991 33.3464 18.5 31.0201 18.5 28.5C18.5 25.9799 17.4991 23.6536 15.7998 21.9542C14.1005 20.2549 11.7741 19.25 9.25 19.25C6.7259 19.25 4.39946 20.2549 2.70018 21.9542C1.00089 23.6536 0 25.9799 0 28.5Z" fill="#A259FF"/>
            </svg>
            <h1 className="text-xl font-semibold tracking-tight">Varsan Figma</h1>
          </div>
          <nav className="flex gap-1">
            {['mobile', 'platform', 'dashboard', 'files', 'projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <FigmaDashboard activeTab={activeTab} />
      </main>
    </div>
  )
}

export default App
