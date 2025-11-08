import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import AboutMe from './Sections/AboutMe/AboutMe.jsx'
import Book from './Sections/Book/Book.jsx'
import Muestras from './Sections/Muestras/Muestras.jsx'
import Contacto from './Sections/Contacto/Contacto.jsx'
import Home from './Sections/home/home.jsx'

function App() {
  return (
    <div>
      <NavBar />
      <Home />
      <AboutMe />
      <Muestras />
      <Book />
      <Contacto />
    </div>
  );
}


export default App
