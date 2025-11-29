import UserSection from '@/components/auth/user-section.tsx'

const Header = () => {
  return (
    <div className='grid grid-cols-2 '>
      <div className='space-y-2 text-left'>
        {/* text-transparent */}
        <h1 className='text-2xl font-bold text-transparent bg-primary bg-clip-text md:text-4xl'>N Todo</h1>
        <p className='text-xs text-muted-foreground md:text-sm'>Care - Control - Concentrate</p>
      </div>
      <div className='space-y-2 text-right'>
        <UserSection />
      </div>
    </div>
  )
}

export default Header
