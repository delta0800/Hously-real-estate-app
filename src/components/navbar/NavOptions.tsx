import Link from 'next/link'
import UserImage from '../shared/UserImage'
import { UserObj } from '@/types/types'

const NavOptions = ({
  session,
  toggleNav,
  user,
}: {
  session: boolean
  toggleNav: () => void
  user: UserObj
}) => {
  return (
    <>
      {session ? (
        <div className="flex items-center gap-x-2">
          <Link
            href="/create-property"
            className="hidden cursor-pointer rounded-full bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-neutral-600 lg:block"
          >
            <span>List your property</span>
          </Link>
          <button
            className="flex-0 hidden cursor-pointer rounded-full lg:flex"
            onClick={toggleNav}
          >
            <UserImage name={user.fullName} imageUrl={user.profilePicture} />
          </button>
        </div>
      ) : (
        <div className="hidden w-[238px] gap-x-2 lg:flex lg:items-center lg:gap-x-6">
          <Link
            href="/sign-in"
            className="cursor-pointer rounded-full border border-grey px-6 py-[calc(0.75rem-1px)] font-medium text-black hover:border-black/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-neutral-600 lg:ml-auto lg:border-none lg:p-0 lg:hover:underline"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="cursor-pointer rounded-full bg-black px-6 py-3 font-medium text-white hover:bg-neutral-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-neutral-600"
          >
            Sign up
          </Link>
        </div>
      )}
    </>
  )
}

export default NavOptions
