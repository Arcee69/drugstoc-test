import { Outlet } from 'react-router-dom'

const PageLayout = () => {
  return (
    <div className='w-full flex bg-dark flex-col h-screen overflow-x-hidden'>
      <div className='w-full mt-[108px]'> 
          <Outlet />
      </div>
    </div>
  )
}

export default PageLayout