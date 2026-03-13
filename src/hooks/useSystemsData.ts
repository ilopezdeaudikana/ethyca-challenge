import { useEffect } from 'react'
import { useDataStore } from '../store/useDataStore'

export const useSystemsData = () => {
  const systems = useDataStore((state) => state.systems)
  const systemsWithMeta = useDataStore((state) => state.systemsWithMeta)
  const allUses = useDataStore((state) => state.allUses)
  const allCategories = useDataStore((state) => state.allCategories)
  const status = useDataStore((state) => state.status)
  const load = useDataStore((state) => state.load)

  useEffect(() => {
    if (status === 'idle') {
      load()
    }
  }, [status, load])

  return { systems, systemsWithMeta, allUses, allCategories, status }
}
