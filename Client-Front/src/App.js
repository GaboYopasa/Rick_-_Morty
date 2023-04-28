import './App.css';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav';
import About from './components/About';
import Detail from './components/Detail';
import Form from './components/Form';
import Favorites from './components/Favorites';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// const URL_BASE = `http://localhost:3001/rickandmorty/character`;
// const APY_KEY = '7c4242104a73.0ac1402f68f536a7a8dc';

const EMAIL = 'gyopasaa@gmail.com';
const PASSWORD = 'gabo1234';
const URL = 'http://localhost:3001/rickandmorty/login/';

function App() {
   const location = useLocation();
   const navigate = useNavigate();

   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = async (userData) => {

      try {
         const { email, password } = userData;
         const { data } = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;

            setAccess(access);
            access && navigate('/home');
         
      } catch (error) {
         console.log(error.message)
      }
   }


   useEffect(() => {
      !access && navigate('/')
   }, [access])

   const onSearch = async (id) => {

      try {

         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         }
         
      } catch (error) {
         alert('¡No hay personajes con este ID!')
      }
   }

   const onClose = (id) => {
      const charactersFiltred = characters.filter(character =>
         character.id !== id)
      setCharacters(charactersFiltred)
   }


   return (
      <div className='App'>
         {
            location.pathname !== '/' && <Nav onSearch={onSearch} access={access} setAccess={setAccess} />
         }
         <Routes>
            <Route path='/' element={<Form login={login} />} />
            <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
            <Route path='/about' element={<About />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/favorites' element={<Favorites />} />
         </Routes>

      </div>
   );
}

export default App;
