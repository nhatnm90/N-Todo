import React from 'react'

const Header = () => {
  return (
    // space-y-2: để những phần tử con cách nhau ra
    <div className='space-y-2 text-center'>
      {/* text-transparent */}
      <h1 className='text-4xl font-bold text-transparent bg-primary bg-clip-text'>TodoX</h1>
      <p className='text-muted-foreground'>Care - Control - Concentrate</p>
    </div>
  )
}

export default Header
