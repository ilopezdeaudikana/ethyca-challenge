import type { RefObject } from 'react'
import { useEffect } from 'react'
import styles from './MapSection.module.css'
import { GroupColumn } from './GroupColumn'
import { useFilters } from '../../hooks/useFilters'
import { useSystemsData } from '../../hooks/useSystemsData'
import { useUiStore } from '../../store/useUiStore'
import { getDependencies } from '../../utils/getDependencies'
import { MapProvider } from './MapContext'
import { getMapSelectionState } from '../../utils/getMapSelectionState'

type MapSectionProps = {
  cardRefs: RefObject<Map<string, HTMLElement>>
  containerRef: RefObject<HTMLDivElement | null>
}

export const MapSection = ({
  cardRefs,
  containerRef,
}: MapSectionProps) => {
  const {
    layoutMode,
    selectedUses,
    selectedCategories,
    activeSystem,
    dependencies,
    resetFilters,
    selectSystem,
    setDependencies,
  } = useUiStore()

  const { systemsWithMeta, allUses } = useSystemsData()
  const { filteredKeys, groups, groupOrder } = useFilters(
    systemsWithMeta,
    allUses,
    selectedUses,
    selectedCategories,
    layoutMode,
  )

  const systemsMap = new Map(systemsWithMeta.map((system) => [system.fides_key, system]))

  const { connectedKeys, selectionKeys } = getMapSelectionState(activeSystem, systemsMap);
  const highlightedKeys = activeSystem ? selectionKeys : filteredKeys
  const hasFilters = selectedUses.length > 0 || selectedCategories.length > 0

  const activeDependencies = getDependencies(activeSystem, systemsMap)

  useEffect(() => {
    const sameLength = activeDependencies.length === dependencies.length
    const sameKeys =
      sameLength &&
      activeDependencies.every((dep, index) => dep.fides_key === dependencies[index]?.fides_key)
    if (!sameKeys) {
      setDependencies(activeDependencies)
    }
  }, [activeDependencies, dependencies, setDependencies])

  const handleSelectSystem = (key: string) => {
    const isActive = activeSystem === key
    if (!isActive && hasFilters && !filteredKeys.has(key)) {
      resetFilters()
    }
    selectSystem(key)
  }

  const registerCardRef = (key: string, node: HTMLElement | null) => {
    if (!node) {
      cardRefs.current.delete(key)
      return
    }
    cardRefs.current.set(key, node)
  }

  return (
    <MapProvider
      value={{
        systemsMap,
        highlightedKeys,
        connectedKeys,
        filteredKeys,
        hasFilters,
        selectSystem: handleSelectSystem,
        registerCardRef,
      }}
    >
      <section className={styles.map} ref={containerRef}>
        {groupOrder.map((groupKey) => {
          const systems = groups.get(groupKey) ?? []
          return <GroupColumn key={groupKey} groupKey={groupKey} systems={systems} />
        })}
      </section>
    </MapProvider>
  )
}
