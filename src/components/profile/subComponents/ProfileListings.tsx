import PropertyCard from '@/components/custom/PropertyCard'
import SeeMoreBtn from '@/components/custom/SeeMoreBtn'
import PropertiesContainer from '@/components/layouts/PropertiesContainer'
import { PropertyType } from '@/types/types'
import { useShowMore } from 'hooks/useShowMore'
import React from 'react'
import { isAdded } from 'utils/isAdded'

const ProfileListings = ({
  properties,
  savedProperties,
}: {
  properties: PropertyType[]
  savedProperties: string[]
}) => {
  const itemsLength = properties.length
  const { handleItems, itemsToSee } = useShowMore(itemsLength)
  return (
    <>
      <PropertiesContainer>
        {properties.slice(0, itemsToSee).map((property, i) => (
          <PropertyCard
            key={i}
            property={property}
            isSaved={isAdded(property._id, savedProperties)}
          />
        ))}
      </PropertiesContainer>

      {properties.length > 3 && (
        <SeeMoreBtn
          label={
            properties.length <= itemsToSee
              ? 'Hide all properties'
              : 'View more properties'
          }
          onClick={handleItems}
          className="mx-4 md:mx-6"
        />
      )}
    </>
  )
}

export default ProfileListings
