import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

const Layout = (props) => {
  return (
    <div>
        <Navbar />
        <main>
        {props.children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout
