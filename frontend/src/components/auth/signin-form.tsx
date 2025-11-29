import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { boolean, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { useNavigate } from 'react-router'
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { useGoogleOneTapLogin } from '@react-oauth/google'
import api from '@/lib/axios.ts'

const signInSchema = z.object({
  username: z.string().min(3, 'Username has at least 3 characters'),
  password: z.string().min(6, 'Password has at least 6 characters')
})
const isSecondaryTheme = import.meta.env.VITE_THEME_TYPE !== 'primary'

type SignInFormValues = z.infer<typeof signInSchema>

export function SignInForm({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema)
  })
  const { signIn, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const onSubmit = async (data: SignInFormValues) => {
    const { username, password } = data
    await signIn(username, password)
    navigate('/ntodo')
  }

  const handleGoogleSignIn = async (credentialResponse: any) => {
    await api.post('/auth/signinwithexternal', { credentialResponse, type: 'GOOGLE' })
    navigate('/ntodo')
  }

  return (
    <div className={cn('flex flex-col gap-6 min-h-screen items-center justify-center px-4', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              {/* header - logo */}
              <div className='flex flex-col items-center text-center gap-2'>
                <a href='/' className='mx-auto block w-fit text-center'>
                  <img className='h-20 w-auto' src='/Logo.png' alt='logo' />
                </a>

                <h1 className='text-2xl font-bold'>Welcome back</h1>
                <p className='text-sm text-muted-foreground text-balance'>Sign in to Up-Sync</p>
              </div>
              {/* username */}
              <div className='flex flex-col gap-3'>
                <Label htmlFor='username' className='block text-sm'>
                  Username
                </Label>
                <Input
                  isSecondary={isSecondaryTheme}
                  type='text'
                  id='username'
                  placeholder=''
                  {...register('username')}
                />
                {errors.username && <p className='text-destructive text-sm'>{errors.username.message}</p>}
              </div>
              {/* password */}
              <div className='flex flex-col gap-3'>
                <Label htmlFor='password' className='block text-sm'>
                  Password
                </Label>
                <Input isSecondary={isSecondaryTheme} type='password' id='password' {...register('password')} />
                {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
              </div>
              {/* nút đăng nhập */}
              <Button
                variant={isSecondaryTheme ? 'gradientSecondary' : 'gradient'}
                type='submit'
                className='w-full'
                disabled={isSubmitting}
              >
                Sign In
              </Button>
              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                Or continue with
              </FieldSeparator>
              {/* <div className='flex flex-col gap-3'>
                <Button
                  variant={isSecondaryTheme ? 'outlineSecondary' : 'outline'}
                  type='button'
                  className='hover:text-rose-500'
                  onClick={handleGoogleSignIn}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                      fill='currentColor'
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className='flex flex-col gap-3'>
                <Button
                  variant={isSecondaryTheme ? 'outlineSecondary' : 'outline'}
                  type='button'
                  className='hover:text-violet-800'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'
                      fill='currentColor'
                    />
                  </svg>
                  Login with Apple
                </Button>
              </div> */}
              <div className='flex flex-col gap-3'>
                <GoogleLogin
                  text='signin_with'
                  onSuccess={(credentialResponse) => {
                    handleGoogleSignIn(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                />
              </div>
              <div className='text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offetset-4'>
                Still not have an account yet?{' '}
                <a href='/signup' className='underline underline-offset-4'>
                  Sign Up
                </a>
              </div>
            </div>
          </form>
          <div
            className={cn(
              'bg-muted relative hidden md:block',
              isSecondaryTheme ? 'hover:bg-teal-100' : 'hover:bg-violet-100'
            )}
          >
            <img src='UpSync_Logo.png' alt='Image' className='absolute top-1/2 -translate-y-1/2 object-cover' />
          </div>
        </CardContent>
      </Card>
      <div className='text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offetset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  )
}
