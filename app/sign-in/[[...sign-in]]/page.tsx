import { SignIn } from '@clerk/nextjs'

const Page = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <SignIn></SignIn>
    </div>
  )
}

export default Page