import { useState } from 'react'
import type { SystemWithMeta } from '../../types/types'
import styles from './SystemCard.module.css'
import { SystemCardDetails } from './SystemCardDetails'
import { useUiStore } from '../../store/useUiStore'
import { useMapContext } from '../map-section/MapContext'

export type SystemCardProps = {
  system: SystemWithMeta
}

export const SystemCard = ({ system }: SystemCardProps) => {
  const {
    highlightedKeys,
    connectedKeys,
    filteredKeys,
    hasFilters,
    selectSystem,
    registerCardRef,
    systemsMap,
  } = useMapContext()
  const { activeSystem } = useUiStore()
  const [expanded, setExpanded] = useState(false)

  const { fides_key: fidesKey, description, name } = system
  const isActive = activeSystem === fidesKey
  const isConnected = connectedKeys.has(fidesKey)
  const dimmed = highlightedKeys.size > 0 && !highlightedKeys.has(fidesKey)
  const isFiltered = hasFilters && filteredKeys.has(fidesKey)

  const getCardClassName = () => {
    const classes = [styles.systemCard]

    if (expanded) classes.push(styles.expanded)
    if (dimmed) classes.push(styles.dimmed)
    if (isFiltered) classes.push(styles.filtered)
    if (isConnected) classes.push(styles.connected)
    if (isActive) classes.push(styles.active)

    return classes.filter(Boolean).join(' ')
  }

  return (
    <article
      className={getCardClassName()}
      data-active={isActive}
      ref={(node) => registerCardRef(fidesKey, node)}
      onClick={() => selectSystem(fidesKey)}
    >
      <header className={styles.header}>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.systemKey}>{fidesKey}</p>
        </div>
      </header>
      <p className={styles.description} title={!expanded ? description : undefined}>
        {description}
      </p>

      <div className={styles.drawer}>
        <button
          type="button"
          className={styles.drawerToggle}
          onClick={(event) => {
            event.stopPropagation()
            if (!isActive) {
              selectSystem(fidesKey)
            }
            setExpanded((prev) => !prev)
          }}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      </div>

      {expanded && <SystemCardDetails system={system} systemsMap={systemsMap} />}
    </article>
  )
}
