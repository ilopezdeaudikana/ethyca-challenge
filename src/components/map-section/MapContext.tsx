import { createContext, useContext } from 'react'
import type { SystemWithMeta } from '../../types/types'

type MapContextValue = {
  systemsMap: Map<string, SystemWithMeta>
  highlightedKeys: Set<string>
  connectedKeys: Set<string>
  filteredKeys: Set<string>
  hasFilters: boolean
  selectSystem: (key: string) => void
  registerCardRef: (key: string, node: HTMLElement | null) => void
}

const MapContext = createContext<MapContextValue | null>(null)

export const MapProvider = MapContext.Provider

export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMapContext must be used within MapProvider')
  }
  return context
}
