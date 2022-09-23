import './App.css';
import React from 'react';
import NavigationBar from './templates/navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './templates/home';
import AddBook from './templates/admin'


function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/addBook' element={<AddBook/>}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
