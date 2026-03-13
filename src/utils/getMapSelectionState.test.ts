import { describe, it, expect } from 'vitest'
import { getMapSelectionState } from './getMapSelectionState'
import type { SystemWithMeta } from '../types'
import sample from '../data/sample_data.json'

describe('getMapSelectionState', () => {

  const mockSystemsIndex = new Map<string, SystemWithMeta>([
    [
      'sys-1', 
      sample[0] as SystemWithMeta
    ],
    [
      'sys-2', 
      {...sample[1], system_dependencies: [] as any } as SystemWithMeta
    ],
  ])

  it('returns empty sets when no system is active', () => {
    const { connectedKeys, selectionKeys } = getMapSelectionState(null, mockSystemsIndex)

    expect(connectedKeys.size).toBe(0)
    expect(selectionKeys.size).toBe(0)
  })

  it('correctly identifies dependencies (connectedKeys)', () => {
    const { connectedKeys } = getMapSelectionState('sys-1', mockSystemsIndex)
    expect(connectedKeys.has('advertising_integration')).toBe(true)
    expect(connectedKeys.size).toBe(5)
  })

  it('combines the active system and dependencies into selectionKeys', () => {
    const { selectionKeys } = getMapSelectionState('sys-1', mockSystemsIndex)
    const system_dependencies = sample[0].system_dependencies
    for (let index = 0; index < system_dependencies.length; index++) {
      expect(selectionKeys.has(system_dependencies[index])).toBe(true)
    }
  
    expect(selectionKeys.size).toBe(system_dependencies.length + 1)
  })

  it('handles systems with no dependencies gracefully', () => {
    const { connectedKeys, selectionKeys } = getMapSelectionState('sys-2', mockSystemsIndex)

    expect(connectedKeys.size).toBe(0)
    expect(selectionKeys.has('sys-2')).toBe(true)
    expect(selectionKeys.size).toBe(1)
  })
})