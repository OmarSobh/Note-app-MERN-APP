import './App.css';
import React, { useState } from 'react'
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { LandingPage } from './screens/LandingPage/LandingPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginPage/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/CreateNote/SingleNote';
import Profile from './screens/ProfileScreen/ProfileScreen';
export const App = () => {
  const [search,setSearch]=useState("");
  console.log(search)
  return (
    <BrowserRouter>

      <Header setSearch={setSearch}></Header>

      <Routes>
        <Route path='/' Component={LandingPage} exact/>
        <Route path='/login' Component={LoginScreen} />
        <Route path='/profile' Component={Profile} />
        <Route path='/register' Component={RegisterScreen} />
        <Route  path='/mynotes' Component={()=><MyNotes search={search}/>} />
        <Route  path='/note/:id' Component={SingleNote} />
        <Route  path='/createnote' Component={CreateNote} />

      </Routes>

      <Footer></Footer>

    </BrowserRouter>
  )
}

export default App;
