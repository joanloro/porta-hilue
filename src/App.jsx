import NavBar from './Components/NavBar/NavBar.jsx'
import Portada from './Sections/Portada/Portada.jsx'
import AboutMe from './Sections/AboutMe/AboutMe.jsx'
import Muestras from './Sections/Muestras/Muestras.jsx'
import Book from './Sections/Book/Book.jsx'
import Contacto from './Sections/Contacto/Contacto.jsx'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Portada />
        <AboutMe />
        <Muestras />
        <Book />
        <Contacto />
      </main>
    </>
  )
}

export default App
