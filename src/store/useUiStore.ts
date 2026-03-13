import { create } from 'zustand'
import { LayoutMode } from '../types/types'

type DependencyEntry = {
  fides_key: string
  name: string
}

type FilterSlice = {
  selectedUses: string[]
  selectedCategories: string[]
  setSelectedUses: (values: string[]) => void
  setSelectedCategories: (values: string[]) => void
  resetFilters: () => void
}

type LayoutSlice = {
  layoutMode: LayoutMode
  setLayoutMode: (mode: LayoutMode) => void
}

type SelectionSlice = {
  activeSystem: string | null
  dependencies: DependencyEntry[]
  selectSystem: (key: string) => void
  setDependencies: (items: DependencyEntry[]) => void
  clearSelection: () => void
}

type UiState = FilterSlice & LayoutSlice & SelectionSlice

export const useUiStore = create<UiState>((set, get) => ({
  layoutMode: LayoutMode.SystemType,
  setLayoutMode: (mode) => set({ layoutMode: mode }),

  selectedUses: [],
  selectedCategories: [],
  setSelectedUses: (values) => set({ selectedUses: values }),
  setSelectedCategories: (values) => set({ selectedCategories: values }),
  resetFilters: () => set({ selectedUses: [], selectedCategories: [] }),

  activeSystem: null,
  dependencies: [],
  selectSystem: (key) => {
    const current = get().activeSystem
    set({
      activeSystem: current === key ? null : key,
    })
  },
  setDependencies: (items) => set({ dependencies: items }),
  clearSelection: () => set({ activeSystem: null, dependencies: [] }),
}))
