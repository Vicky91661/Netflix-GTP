import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'

function Body() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/browse' element={<Browse/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Body