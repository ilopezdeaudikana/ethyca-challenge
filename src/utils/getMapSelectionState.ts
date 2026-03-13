import type { SystemWithMeta } from "../types/types"

export const getMapSelectionState = (
  activeSystem: string | null,
  systemsMap: Map<string, SystemWithMeta>
) => {
  const activeRecord = activeSystem ? systemsMap.get(activeSystem) : null
  
  const connectedKeys = new Set(activeRecord?.system_dependencies ?? [])

  const selectionKeys = activeSystem 
    ? new Set([activeSystem, ...connectedKeys]) 
    : new Set<string>();

  return { connectedKeys, selectionKeys }
};

