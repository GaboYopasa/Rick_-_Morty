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

const URL_BASE = 'https://be-a-rym.up.railway.app/api/character';
const APY_KEY = '7c4242104a73.0ac1402f68f536a7a8dc';

const EMAIL = 'gyopasaa@gmail.com';
const PASSWORD = 'gabo1234';

function App() {
   const location = useLocation();
   const navigate = useNavigate();

   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      if(userData.email === EMAIL && userData.password === PASSWORD){
         setAccess(true);
         navigate('/home');
      }
   }

   useEffect(() => {
      !access && navigate('/')
   }, [access])

   const onSearch = (id) => {
      axios(`${URL_BASE}/${id}?key=${APY_KEY}`)
         .then(({ data }) => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               window.alert('¡No hay personajes con este ID!');
            }
         });
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
            <Route path='/home' element={ <Cards characters={characters} onClose={onClose}/> } />
            <Route path='/about' element={<About/>} />
            <Route path='/detail/:id' element={<Detail/>} />
            <Route path='/favorites' element={<Favorites/>} />
         </Routes>
         
      </div>
   );
}

export default App;
