export function stripHtml(value) {
  if (!value) return 'Not available'
  return value.replace(/<[^>]*>/g, '').trim()
}

export function formatDate(value) {
  if (!value) return 'Not available'
  const dateValue = typeof value === 'number' ? value * 1000 : value
  const date = new Date(dateValue)
  return Number.isNaN(date.getTime()) ? 'Not available' : date.toLocaleString()
}

export function showValue(value) {
  return value ?? 'Not available'
}
