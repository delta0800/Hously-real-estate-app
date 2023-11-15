import PropertiesPage from '@/components/custom/PropertiesPage'
import { getProperties } from 'utils/getProperties'
import { getUser } from 'utils/getUser'

const Home = async () => {
  const properties = await getProperties()
  const currentUser = await getUser()

  return (
    <div className="mx-auto min-h-screen max-w-[1600px]">
      <PropertiesPage
        properties={properties}
        savedProperties={currentUser?.savedProperties}
      />
    </div>
  )
}

export default Home
