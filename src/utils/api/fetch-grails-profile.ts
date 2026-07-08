import type { GrailsProfileResponse } from '../../types/grails'
import { GRAILS_API_URL } from '../../constants'

export const fetchGrailsProfile = async (addressOrName: string): Promise<GrailsProfileResponse | null> => {
  try {
    const url = `${GRAILS_API_URL}/profiles/${encodeURIComponent(addressOrName)}`
    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as GrailsProfileResponse
    return data
  } catch (err: unknown) {
    console.error(err)
    return null
  }
}
