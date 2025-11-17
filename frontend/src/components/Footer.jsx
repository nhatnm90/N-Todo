const Footer = ({ completedTask = 0, activeTask = 0 }) => {
  return (
    <>
      {' '}
      {(completedTask > 0 || activeTask > 0) && (
        <div className='text-center'>
          <p className='text-muted-foreground'>
            {completedTask > 0 ? (
              <>
                Congrats! You have completed {completedTask} task(s)
                {activeTask > 0 && `, only ${activeTask} remaining.`}
              </>
            ) : (
              `Try your best to complete ${activeTask} tasks.`
            )}
          </p>
        </div>
      )}
    </>
  )
}

export default Footer
