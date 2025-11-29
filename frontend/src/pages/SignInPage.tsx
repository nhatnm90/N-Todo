import { SignInForm } from '@/components/auth/signin-form.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const SignInPage = () => {
  const isSecondaryTheme = import.meta.env.VITE_THEME_TYPE !== 'primary'
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
        <div className='w-full max-w-sm md:max-w-4xl'>
          <div
            className='absolute inset-0 z-0'
            style={{
              backgroundImage: isSecondaryTheme
                ? `radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)`
                : `linear-gradient(225deg, #FFB3D9 0%, #FFD1DC 20%, #FFF0F5 40%, #E6F3FF 60%, #D1E7FF 80%, #C7E9F1 100%)`
            }}
          >
            <SignInForm />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default SignInPage
