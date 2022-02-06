import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Models from './components/Models/Models';
import Vehicles from './components/Vehicles/Vehicles';
import Checkout from './components/Checkout/Checkout';
import './App.css';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/models'} element={<Models />}></Route>
          <Route path={'/vehicles'} element={<Vehicles />}></Route>
          <Route path={'/checkout'} element={<Checkout />}></Route>
          <Route path={'/'} element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
