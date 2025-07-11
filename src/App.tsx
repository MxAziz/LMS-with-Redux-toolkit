import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-7xl min-h-[85vh] mx-auto">

      <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App
