import './App.css';
import React from 'react'
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { LandingPage } from './screens/LandingPage/LandingPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginPage/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
export const App = () => {
  return (
    <BrowserRouter>

      <Header></Header>

      <Routes>
        <Route path='/' Component={LandingPage} exact/>
        <Route path='/login' Component={LoginScreen} exact/>
        <Route path='/register' Component={RegisterScreen} exact/>
        <Route  path='/mynotes' Component={MyNotes}/>
      </Routes>

      <Footer></Footer>

    </BrowserRouter>
  )
}

export default App;
