import { PropertyType, ServerObjType } from '@/types/types'

export const getProperties = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/properties`, {
    cache: 'no-cache',
  })

  if (!response.ok) {
    return []
  }

  return response.json()
}

export const getProperty = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/properties/${id}`,
    { cache: 'no-cache' },
  )
  if (!response.ok) {
    return []
  }
  return response.json()
}
