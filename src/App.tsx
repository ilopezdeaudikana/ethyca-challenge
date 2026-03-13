import { useRef } from 'react'
import styles from './App.module.css'
import { MapSection } from './components/map-section/MapSection'
import { TopBar } from './components/top-bar/TopBar'

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())

  const handleDependencyClick = (key: string) => {
    const node = cardRefs.current.get(key)
    if (!node) return
    node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <TopBar
          onDependencyClick={handleDependencyClick}
        />

        <MapSection
          cardRefs={cardRefs}
          containerRef={containerRef}
        />
      </div>
    </div>
  )
}

export default App
