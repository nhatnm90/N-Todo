import { cn } from '@/lib/utils.ts'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { useNavigate } from 'react-router'

// Define zod schema
const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(3, 'Username has at least 3 characters'),
  email: z.email('Invalid email '),
  password: z.string().min(6, 'Password has at least 6 characters')
})

// Define type for form by schema
type SignUpFormValues = z.infer<typeof signUpSchema>

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema)
  })
  const { signUp, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const onSubmit = async (data: SignUpFormValues) => {
    // call api from BE to sign up
    const { firstName, lastName, username, email, password } = data
    await signUp(username, password, email, firstName, lastName)
    navigate('/signin')
  }

  return (
    <div className={cn('flex flex-col gap-6 min-h-screen items-center justify-center px-4', className)} {...props}>
      <Card className='overflow-hidden p-0 border-border'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              {/* header - logo */}
              <div className='flex flex-col items-center text-center gap-2'>
                <a href='/' className='mx-auto block w-fit text-center'>
                  <img className='h-20 w-auto' src='/Logo.png' alt='logo' />
                </a>

                <h1 className='text-2xl font-bold'>Sign Up</h1>
                <p className='text-sm text-muted-foreground text-balance'>
                  Welcome to Up-Sync, please create an account to get started
                </p>
              </div>

              {/* họ & tên */}
              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-2'>
                  <Label htmlFor='firstname' className='block text-sm'>
                    First name
                  </Label>
                  <Input isSecondary type='text' id='firstname' {...register('firstName')} />
                  {errors.firstName && <p className='text-destructive text-sm'>{errors.firstName.message}</p>}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastname' className='block text-sm'>
                    Last name
                  </Label>
                  <Input isSecondary type='text' id='lastname' {...register('lastName')} />

                  {errors.lastName && <p className='text-destructive text-sm'>{errors.lastName.message}</p>}
                </div>
              </div>

              {/* username */}
              <div className='flex flex-col gap-3'>
                <Label htmlFor='username' className='block text-sm'>
                  Username
                </Label>
                <Input isSecondary type='text' id='username' placeholder='' {...register('username')} />
                {errors.username && <p className='text-destructive text-sm'>{errors.username.message}</p>}
              </div>

              {/* email */}
              <div className='flex flex-col gap-3'>
                <Label htmlFor='email' className='block text-sm'>
                  Email
                </Label>
                <Input isSecondary type='email' id='email' placeholder='' {...register('email')} />
                {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
              </div>

              {/* password */}
              <div className='flex flex-col gap-3'>
                <Label htmlFor='password' className='block text-sm'>
                  Password
                </Label>
                <Input isSecondary type='password' id='password' {...register('password')} />
                {errors.password && <p className='text-destructive text-sm'>{errors.password.message}</p>}
              </div>

              {/* nút đăng ký */}
              <Button variant='gradientSecondary' type='submit' className='w-full' disabled={isSubmitting}>
                {isLoading ? 'Processing ...' : 'Create new account'}
              </Button>

              <div className='text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offetset-4'>
                Already sign up?{' '}
                <a href='/signin' className='underline underline-offset-4'>
                  Sign In
                </a>
              </div>
            </div>
          </form>
          <div className='bg-muted hover:bg-teal-100 relative hidden md:block'>
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
