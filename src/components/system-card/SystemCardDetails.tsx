import type { SystemWithMeta } from '../../types'
import { titleCase } from '../../utils/strings'
import styles from './SystemCardDetails.module.css'

type SystemCardDetailsProps = {
  system: SystemWithMeta
  systemsMap: Map<string, SystemWithMeta>
}

export const SystemCardDetails = ({ system, systemsMap }: SystemCardDetailsProps) => (
  <>
    <div className={styles.uses}>
      {system.uses.map((use) => (
        <span key={use} className={styles.tag}>
          {titleCase(use)}
        </span>
      ))}
    </div>
    <div>
      <p className={styles.label}>Data categories</p>
      {system.categories.length === 0 ? (
        <p className={styles.empty}>No categories declared</p>
      ) : (
        <div className={styles.tags}>
          {system.categories.map((category) => (
            <span key={category} className={styles.pill} title={category}>
              {titleCase(category)}
            </span>
          ))}
        </div>
      )}
    </div>

    <div>
      <p className={styles.label}>Dependencies</p>
      {system.system_dependencies.length === 0 ? (
        <p className={styles.empty}>No dependencies</p>
      ) : (
        <ul className={styles.dependencyList}>
          {system.system_dependencies.map((dependency) => {
            const dependencyName = systemsMap.get(dependency)?.name ?? dependency
            return (
              <li key={dependency} className={styles.dependencyItem}>
                <span className={styles.arrow}>→</span>
                {dependencyName}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  </>
)
