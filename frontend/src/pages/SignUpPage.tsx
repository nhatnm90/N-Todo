import { SignupForm } from '@/components/auth/signup-form.tsx'

const SignUpPage = () => {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-4xl'>
        <div
          className='absolute inset-0 z-0'
          style={{
            backgroundImage: `radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)`,
            backgroundSize: '100% 100%'
            // background: `linear-gradient(225deg, #FFB3D9 0%, #FFD1DC 20%, #FFF0F5 40%, #E6F3FF 60%, #D1E7FF 80%, #C7E9F1 100%)`
          }}
        >
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
