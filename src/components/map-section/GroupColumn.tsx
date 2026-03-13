import { LayoutMode } from '../../types'
import type { SystemWithMeta } from '../../types'
import { titleCase } from '../../utils/strings'
import { SystemCard } from '../system-card/SystemCard'
import styles from './MapSection.module.css'
import { useUiStore } from '../../store/useUiStore'

type GroupColumnProps = {
  groupKey: string
  systems: SystemWithMeta[]
}

export const GroupColumn = ({ groupKey, systems }: GroupColumnProps) => {
  const layoutMode = useUiStore((state) => state.layoutMode)

  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        <h2>{layoutMode === LayoutMode.SystemType ? groupKey : titleCase(groupKey)}</h2>
      </div>
      <div className={styles.groupGrid}>
        {systems.map(system => (
          <SystemCard key={`${system.fides_key}-${groupKey}`} system={system}  />
        ))}
      </div>
    </div>
  )
}
