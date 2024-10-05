import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Category from './Pages/Category'
import Orders from './Pages/Orders'

function App() {
  

  return (
    <>
      <div>
          <BrowserRouter>
               <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/categories" element={<Category/>}/>
                <Route path="/orders" element={<Orders/>}/>
                
               </Routes>
          </BrowserRouter>
      </div>
    </>
  )
}

export default App
