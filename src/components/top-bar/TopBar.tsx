import { useEffect, useState } from 'react'
import { MobileToggles } from './MobileToggles'
import styles from './TopBar.module.css'
import filterStyles from './FilterControls.module.css'
import { FilterControls } from './FilterControls'
import { DependencyPanel } from '../dependency-panel/DependencyPanel'
import { useUiStore } from '../../store/useUiStore'

type TopBarProps = {
  onDependencyClick: (value: string) => void
}

export const TopBar = ({ onDependencyClick }: TopBarProps) => {
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [depsOpen, setDepsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const activeSystem = useUiStore((state) => state.activeSystem)
  const dependencies = useUiStore((state) => state.dependencies)
  const onClearSelection = useUiStore((state) => state.clearSelection)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 65rem)')
    const apply = () => setIsMobile(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setFiltersOpen(true)
      setDepsOpen(activeSystem != null && dependencies.length > 0)
    } else {
      setFiltersOpen(false)
      setDepsOpen(false)
    }
  }, [isMobile, activeSystem, dependencies.length])

  return (
    <header className={styles.topBar}>
      <MobileToggles
        onToggleFilters={() => setFiltersOpen((prev) => !prev)}
        onToggleDependencies={() => setDepsOpen((prev) => !prev)}
        dependenciesDisabled={!activeSystem || dependencies.length === 0}
        onClearSelection={onClearSelection}
      />

      <div
        className={`${styles.filtersSlot} ${filterStyles.filters} ${
          (!isMobile || filtersOpen) ? filterStyles.filtersOpen : filterStyles.filtersClosed
        }`}
      >
        <FilterControls
        />
      </div>

      {activeSystem && (
        <div
          className={`${styles.depsPanel} ${!isMobile || depsOpen ? styles.depsOpen : styles.depsClosed}`}
        >
          <DependencyPanel dependencies={dependencies} onDependencyClick={onDependencyClick} />
        </div>
      )}
    </header>
  )
}
