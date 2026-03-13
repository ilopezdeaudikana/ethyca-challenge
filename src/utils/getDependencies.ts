import type { SystemWithMeta } from '../types'

export const getDependencies = (
  activeSystem: string | null,
  systemsMap: Map<string, SystemWithMeta>,
) => {
  if (!activeSystem) return []
  const active = systemsMap.get(activeSystem)
  if (!active) return []
  return active.system_dependencies.map((key) => ({
    fides_key: key,
    name: systemsMap.get(key)?.name ?? key,
  }))
}
