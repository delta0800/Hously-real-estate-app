import { CityObjType, CountryObjType } from '@/types/types'
import { useState, useEffect, useCallback } from 'react'

const sortNames = (a: string, b: string) => {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  // names must be equal
  return 0
}

export const useLocations = () => {
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')

  const fetchCities = useCallback(
    async (signal: AbortSignal) => {
      try {
        const cityResponse = await fetch(
          `https://secure.geonames.org/searchJSON?country=${selectedCountry}&username=${process.env.NEXT_PUBLIC_GOENAMES_API_KEY}`,
          { signal },
        )
        const cityData = await cityResponse.json()
        return cityData
      } catch (error) {
        // Check if the error is due to abortion
        const cascadeError = error as Error
        if (cascadeError.name === 'AbortError') {
          return { aborted: true }
        }
        throw new Error('something went wrong trying to fetch locations')
      }
    },
    [selectedCountry],
  )

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    fetchCities(signal).then((cityData) => {
      if (!cityData.aborted) {
        const cities = cityData.geonames
          .map((c: any) => ({
            cityName: c.name,
            cityRegion: c.adminName1,
          }))
          .sort((a: CityObjType, b: CityObjType) =>
            sortNames(a.cityName, b.cityName),
          )
        setCities(cities)
      }
    })

    return () => {
      // Cleanup the controller when the component is unmounted
      controller.abort()
    }
  }, [selectedCountry, fetchCities])

  const fetchCountries = async (signal: AbortSignal) => {
    try {
      const response = await fetch(
        `https://secure.geonames.org/countryInfoJSON?username=${process.env.NEXT_PUBLIC_GOENAMES_API_KEY}`,
        { signal },
      )
      const data = await response.json()
      return data
    } catch (error) {
      // Check if the error is due to abortion
      const cascadeError = error as Error
      if (cascadeError.name === 'AbortError') {
        return { aborted: true }
      }
      throw new Error('something went wrong trying to fetch locations')
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    // Get list of countries
    fetchCountries(signal).then((data) => {
      if (!data.aborted) {
        const countries = data.geonames
          .map((c: any) => ({
            countryName: c.countryName,
            countryCode: c.countryCode,
            continent: c.continentName,
          }))
          .sort((a: CountryObjType, b: CountryObjType) =>
            sortNames(a.countryName, b.countryName),
          )
        setCountries(countries)
      }
    })

    return () => {
      controller.abort() // Cleanup the controller when the component is unmounted
    }
  }, [])

  return {
    countries,
    cities,
    setSelectedCountry,
  }
}
