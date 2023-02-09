import React, { useState } from 'react'
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './component/Home';
import About from './component/About';
import Navbar from './component/Navbar';
import NotePage from './component/NotePage';
import Login from './component/Login';
import SignUp from './component/SignUp';
import { Provider } from 'react-redux';
import store from './redux/store';
import ShareNotePage from './component/ShareNotePage';

function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Provider store={store}><Navbar/></Provider>}>
          <Route path="/" element={<Provider store={store}><Home/></Provider>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/Notes" element={<Provider store={store}><NotePage/></Provider>}/>
          <Route path="/shareNotes" element={<Provider store={store}><ShareNotePage/></Provider>}/>
          <Route path="/Login" element={<Provider store={store}><Login/></Provider>}/>
          <Route path="Signup" element={<Provider store={store}><SignUp/></Provider>}/>
        </Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
