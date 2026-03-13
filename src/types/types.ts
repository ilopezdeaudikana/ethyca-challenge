export type PrivacyDeclaration = {
  data_categories: string[]
  data_subjects: string[]
  data_use: string
  name: string
}

export type SystemDefinition = {
  description: string
  fides_key: string
  name: string
  privacy_declarations: PrivacyDeclaration[]
  system_dependencies: string[]
  system_type: string
}

export type SystemWithMeta = SystemDefinition & {
  categories: string[]
  uses: string[]
}

export const LayoutMode = {
  SystemType: 'system_type',
  DataUse: 'data_use',
} as const

export type LayoutMode = (typeof LayoutMode)[keyof typeof LayoutMode]

