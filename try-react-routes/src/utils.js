export function stripHtml(value) {
  if (!value) return 'Not available'
  const text = value.replace(/<[^>]*>/g, '').trim()
  return text || 'Not available'
}

export function formatDate(value) {
  if (!value) return 'Not available'
  const dateValue = typeof value === 'number' ? value * 1000 : value
  const date = new Date(dateValue)
  return Number.isNaN(date.getTime()) ? 'Not available' : date.toLocaleString()
}

export function showValue(value) {
  if (value === null || value === undefined) return 'Not available'
  if (typeof value === 'string' && !value.trim()) return 'Not available'
  return value
}
