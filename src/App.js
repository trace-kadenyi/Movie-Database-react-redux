import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './Components/Movies/Movies';
import Header from './Components/Header';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Movies />} />
    </Routes>
  </Router>
);

export default App;
