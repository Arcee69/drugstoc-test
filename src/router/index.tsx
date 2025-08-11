import { Route, Routes } from 'react-router-dom'
import PageLayout from '../layout/PageLayout'
import Home from '../pages/Home'
import Details from '../pages/Home/component/Details'

const Routers = () => {
  return (
    <Routes>
        <Route element={<PageLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/details' element={<Details />} />
        </Route>
    </Routes>
  )
}

export default Routers