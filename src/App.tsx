import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Category from './Pages/Category'
import Orders from './Pages/Orders'
import Items from './Pages/Items'
import Stock from './Pages/Stock'
import Login from './Pages/Login'
import User from './Pages/User'



function App() {


  return (
    <>
      <div>



        <BrowserRouter>
          <Routes>


            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/items" element={<Items />} />
            <Route path="/stocks" element={<Stock />} />
            <Route path="/user" element={<User />} />
            <Route path="/" element={<Login />} />



          </Routes>

        </BrowserRouter>







      </div >


    </>
  )
}

export default App
