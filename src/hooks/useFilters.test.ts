import { renderHook, waitFor } from '@testing-library/react'
import { useFilters } from './useFilters'
import { useSystemsData } from './useSystemsData'
import { LayoutMode } from '../types'
import { useDataStore } from '../store/useDataStore'

describe('useFilters', () => {
  beforeEach(() => {
    useDataStore.getState().reset()
  })

  it('filters systems without changing group layout', async () => {
    const { result: data } = renderHook(() => useSystemsData())
    await waitFor(() => {
      expect(data.current.systemsWithMeta.length).toBeGreaterThan(0)
    })
    const { systemsWithMeta, allUses } = data.current

    const { result } = renderHook(() =>
      useFilters(systemsWithMeta, allUses, [allUses[0]], [], LayoutMode.SystemType),
    )

    const totalSystems = systemsWithMeta.length
    const countInGroups = () =>
      Array.from(result.current.groups.values()).reduce((sum, group) => sum + group.length, 0)

    expect(countInGroups()).toBe(totalSystems)

    const expectedFiltered = systemsWithMeta.filter((system) =>
      system.uses.includes(allUses[0]),
    )
    expect(result.current.filteredKeys.size).toBe(expectedFiltered.length)
    expect(countInGroups()).toBe(totalSystems)
  })

  it('returns filtered keys for selected categories', async () => {
    const { result: data } = renderHook(() => useSystemsData())
    await waitFor(() => {
      expect(data.current.systemsWithMeta.length).toBeGreaterThan(0)
    })
    const { systemsWithMeta, allUses, allCategories } = data.current

    const { result } = renderHook(() =>
      useFilters(systemsWithMeta, allUses, [], [allCategories[0]], LayoutMode.SystemType),
    )
    const filteredKeys = result.current.filteredKeys
    const expectedFiltered = systemsWithMeta.filter((system) =>
      system.categories.includes(allCategories[0]),
    )
    expectedFiltered.forEach((system) => {
      expect(filteredKeys.has(system.fides_key)).toBe(true)
    })
  })
})
