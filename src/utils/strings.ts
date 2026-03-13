export const leafCategory = (category: string) => {
  const parts = category.split('.')
  return parts[parts.length - 1] ?? category
}

export const titleCase = (value: string) =>
  value
    .split('.')
    .join(' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
