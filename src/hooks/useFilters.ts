import { LayoutMode } from '../types'
import type { SystemWithMeta, LayoutMode as LayoutModeType } from '../types'

type FiltersState = {
  filteredKeys: Set<string>
  groups: Map<string, SystemWithMeta[]>
  groupOrder: string[]
}

export const useFilters = (
  systems: SystemWithMeta[],
  allUses: string[],
  selectedUses: string[],
  selectedCategories: string[],
  layoutMode: LayoutModeType,
): FiltersState => {

  const filteredSystems = systems.filter((system) => {
    const useMatch =
      selectedUses.length === 0 || system.uses.some((use) => selectedUses.includes(use))
    const categoryMatch =
      selectedCategories.length === 0 ||
      system.categories.some((category) => selectedCategories.includes(category))
    return useMatch && categoryMatch
  })

  const filteredKeys = new Set(filteredSystems.map((system) => system.fides_key))

  const groups = new Map<string, SystemWithMeta[]>()
  systems.forEach((system) => {
    if (layoutMode === LayoutMode.SystemType) {
      const key = system.system_type
      groups.set(key, [...(groups.get(key) ?? []), system])
      return
    }

    system.uses.forEach((use) => {
      groups.set(use, [...(groups.get(use) ?? []), system])
    })
  })

  const groupOrder =
    layoutMode === LayoutMode.SystemType
      ? Array.from(groups.keys()).sort((a, b) => a.localeCompare(b))
      : allUses.filter((use) => groups.has(use))

  return {
    filteredKeys,
    groups,
    groupOrder,
  }
}
