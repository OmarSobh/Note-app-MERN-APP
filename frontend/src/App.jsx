import './App.css';
import React from 'react'
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { LandingPage } from './screens/LandingPage/LandingPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from './screens/MyNotes/MyNotes';
export const App = () => {
  return (
    <BrowserRouter>

      <Header></Header>

      <Routes>
        <Route path='/' Component={LandingPage} exact/>
        <Route  path='/mynotes' Component={MyNotes}/>
      </Routes>

      <Footer></Footer>

    </BrowserRouter>
  )
}

export default App;
