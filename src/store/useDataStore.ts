import { create } from 'zustand'
import type { SystemDefinition, SystemWithMeta } from '../types/types'
import { dedupeSystems } from '../utils/dedupeSystems'
import { addCategoriesAndUses } from '../utils/addCategoriesAndUses'

type DataStatus = 'idle' | 'loading' | 'ready' | 'error'

type DataState = {
  systems: SystemDefinition[]
  systemsWithMeta: SystemWithMeta[]
  allUses: string[]
  allCategories: string[]
  status: DataStatus
  load: () => Promise<void>
  reset: () => void
}

export const useDataStore = create<DataState>((set, get) => ({
  systems: [],
  systemsWithMeta: [],
  allUses: [],
  allCategories: [],
  status: 'idle',
  load: async () => {
    const { status } = get()
    if (status === 'loading' || status === 'ready') return
    set({ status: 'loading' })
    try {
      const response = await fetch('/sample_data.json')
      if (!response.ok) {
        set({ status: 'error' })
        return
      }
      const data = (await response.json()) as SystemDefinition[]
      if (!Array.isArray(data)) {
        set({ status: 'error' })
        return
      }
      const systems = dedupeSystems(data)
      const meta = addCategoriesAndUses(systems)
      set({ systems, ...meta, status: 'ready' })
    } catch {
      set({ status: 'error' })
    }
  },
  reset: () =>
    set({
      systems: [],
      systemsWithMeta: [],
      allUses: [],
      allCategories: [],
      status: 'idle'
    }),
}))
