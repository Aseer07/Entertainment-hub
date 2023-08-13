//import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Header from "./components/Header"
import SimpleBottomNavigation from './components/MainNav'
import { Container } from '@material-ui/core'
import Trending from './Pages/Trending/Trending';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';
import Movies from './Pages/Movies/Movies';

const App = () => {
  return (
    <Router>
    <Header />
    <div className='app'>
      <Container>
        <Routes>
          <Route path='/' element={<Trending />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/series' element={<Series />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation />
    </Router>
  )
}

export default App